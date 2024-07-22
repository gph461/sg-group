import { camelCase } from 'change-case';
import {
  ZodDiscriminatedUnion,
  ZodEnum,
  ZodFirstPartyTypeKind,
  ZodIntersection,
  ZodLiteral,
  ZodNativeEnum,
  ZodTypeAny,
  z,
} from 'zod';
import * as Schemas from '~libs/entities/zod';
import {
  ClassBuilder,
  ConstructorBuilder,
  ParameterBuilder,
} from '../builder/dart/class_builder';
import { correctParameterNameIfInvalid } from '../builder/dart/dart-parameter';
import { EnumBuilder, EnumValueBuilder } from '../builder/dart/enum_builder';
import { Files } from './dart_files';

const blacklistedEffectTypes = ['transform'];

function extractZodType(
  zodObject: ZodTypeAny,
  nullish?: boolean,
): {
  type: z.ZodTypeAny;
  nullish?: boolean;
} {
  if (zodObject instanceof z.ZodLazy) {
    return extractZodType(zodObject._def.getter(), nullish);
  } else if (zodObject instanceof z.ZodIntersection) {
    return extractZodType(zodObject._def.left, nullish);
  } else if (
    zodObject instanceof z.ZodNullable ||
    zodObject instanceof z.ZodOptional
  ) {
    return extractZodType(zodObject._def.innerType, true);
  } else if (
    zodObject instanceof z.ZodEffects &&
    blacklistedEffectTypes.includes(zodObject._def.effect?.type) !== true
  ) {
    return extractZodType(zodObject._def.schema, nullish);
  } else if (zodObject instanceof z.ZodDefault) {
    return extractZodType(zodObject._def.innerType, nullish);
  }
  return { type: zodObject, nullish };
}

function isNumString(zodObject: z.ZodUnion<[z.ZodTypeAny, ...z.ZodTypeAny[]]>) {
  const unions = zodObject._def;
  let isNumString = false;
  if (unions.options.length == 2) {
    isNumString = unions.options.find((e) => e instanceof z.ZodString) != null;
    isNumString =
      isNumString &&
      unions.options.find((e) => e instanceof z.ZodNumber) != null;
  }
  return isNumString;
}

function findTypeFromZod(zodObject: ZodTypeAny): string {
  const found = Object.entries(Schemas).find((e) => Object.is(e[1], zodObject));
  return found ? found[0] : 'dynamic';
}

function parseZodToDartType(
  parameterName: string,
  zodObject: z.ZodTypeAny | string,
  nullable?: boolean,
): string {
  if (typeof zodObject === 'string') {
    return `${zodObject}${nullable === true ? '?' : ''}`;
  } else {
    const type = zodObject?._def?.typeName;
    if (!type) return parseZodToDartType(parameterName, 'Object', nullable);
    let ret = '';
    switch (type) {
      case ZodFirstPartyTypeKind.ZodNull:
        ret = 'dynamic';
        break;
      case ZodFirstPartyTypeKind.ZodObject:
      case ZodFirstPartyTypeKind.ZodNativeEnum:
      case ZodFirstPartyTypeKind.ZodEnum:
      case ZodFirstPartyTypeKind.ZodEffects:
        ret = findTypeFromZod(zodObject);
        break;
      case ZodFirstPartyTypeKind.ZodDate:
      case ZodFirstPartyTypeKind.ZodString:
        ret = 'String';
        break;
      case ZodFirstPartyTypeKind.ZodBigInt:
      case ZodFirstPartyTypeKind.ZodNumber:
        ret = 'num';
        break;
      case ZodFirstPartyTypeKind.ZodBoolean:
        ret = 'bool';
        break;
      case ZodFirstPartyTypeKind.ZodRecord:
        const { type } = extractZodType(zodObject._def.valueType);
        if (type instanceof z.ZodObject) {
          ret = `Map<String, ${findTypeFromZod(type)}>`;
        } else {
          ret = `Map<String, ${parseZodToDartType(parameterName, type)}>`;
        }
        break;
      case ZodFirstPartyTypeKind.ZodArray:
        const zodArray = extractZodType(zodObject._def.type);
        const arrayType = parseZodToDartType(
          parameterName,
          zodArray.type,
          zodArray.nullish,
        );
        ret = `List<${arrayType}>`;
        break;
      case ZodFirstPartyTypeKind.ZodAny:
        ret = 'dynamic';
        break;
      case ZodFirstPartyTypeKind.ZodOptional:
      case ZodFirstPartyTypeKind.ZodNullable:
        return parseZodToDartType(
          parameterName,
          zodObject._def.innerType,
          true,
        );
      default:
        ret = 'Object';
        break;
    }
    return parseZodToDartType(parameterName, ret, nullable);
  }
}

function zodToDartParameter(
  parameterName: string,
  zodObject: z.ZodTypeAny,
): ParameterBuilder {
  const parameter = new ParameterBuilder();

  const { type, nullish } = extractZodType(zodObject as z.ZodTypeAny);

  if (!nullish) parameter.required();

  const paramResult = correctParameterNameIfInvalid(parameterName);

  const camelCased = camelCase(parameterName);
  if (camelCased !== parameterName) {
    parameter.jsonKey({ name: parameterName });
    parameter.name(camelCased);
  } else if (paramResult.isInvalid) {
    parameter.name(paramResult.newValue);
    parameter.jsonKey({ name: parameterName });
  } else {
    parameter.name(paramResult.newValue);
  }

  if (type instanceof z.ZodUnion && isNumString(type)) {
    parameter.jsonKey({ fromJson: 'handleNumString' });
  }

  const dartType = parseZodToDartType(parameter.getName(), type, nullish);
  return parameter.type(dartType);
}

export async function convertZod2Dart(dartFiles: Files) {
  const mergedSchemas = { ...Schemas };

  console.info(
    'Parsing Zod. Found %d models.',
    Object.keys(mergedSchemas).length,
  );

  Object.entries(mergedSchemas).forEach(([key, v]) => {
    console.info('Generating Dart class for %s', key);

    if (v instanceof ZodIntersection) {
      throw new Error('Intersection not supported, use merge instead.');
    } else if (v instanceof ZodEnum || v instanceof ZodNativeEnum) {
      const enums = Object.entries(v.enum);
      const validEnums = enums.some((e) => typeof e[1] === 'number')
        ? enums.slice(enums.length / 2, enums.length)
        : enums;

      const enumBuilder = new EnumBuilder()
        .name(key)
        .values(
          validEnums.map((e: any) =>
            new EnumValueBuilder()
              .name(correctParameterNameIfInvalid(e[0]).newValue)
              .value(e[1].toString()),
          ),
        );

      dartFiles['entity.enums.dart'] += enumBuilder.build();
    } else {
      const classBuilder = new ClassBuilder().className(key);

      dartFiles['entity.json.dart'] += classBuilder.jsonToFromFunction;

      if (v instanceof ZodDiscriminatedUnion) {
        const definition = v._def as any;

        const discriminatorValues = Array.from(definition.optionsMap.keys());

        // try to searh for the discriminator enum from discriminator literal
        const discriminatorEnumName = Object.entries(Schemas).find(
          ([_, v]) =>
            v instanceof ZodEnum &&
            Object.values(v.enum).every((e) => discriminatorValues.includes(e)),
        )?.[0] as string;

        if (!discriminatorEnumName) {
          throw new Error(
            'Discriminator enum not found for discriminated union',
          );
        }

        const discriminatorKey = definition.discriminator;

        classBuilder.discriminator(discriminatorKey).addConstructors(
          definition.options.map((o) =>
            new ConstructorBuilder()
              .discriminatorValue(o.shape.type._def.value)
              .className(key)
              .parameters(
                Object.entries(o.shape).reduce<ParameterBuilder[]>(
                  (pv, [fieldName, field]) => {
                    if (field instanceof ZodLiteral) {
                      pv.push(
                        new ParameterBuilder()
                          .required()
                          .name(fieldName)
                          .type(discriminatorEnumName),
                      );
                    } else {
                      pv.push(zodToDartParameter(fieldName, field as any));
                    }

                    return pv;
                  },
                  [],
                ),
              ),
          ),
        );
      } else {
        // normal object
        const schemaShape = (v as any).shape || (v._def as any).innerType.shape;

        classBuilder.addConstructor(
          new ConstructorBuilder()
            .className(key)
            .parameters(
              Object.entries(schemaShape).map(([fieldName, field]) =>
                zodToDartParameter(fieldName, field as z.ZodTypeAny),
              ),
            ),
        );
      }

      dartFiles['entity.dart'] += classBuilder.build();
    }
  });
}
