import { camelCase, capitalCase } from 'change-case';
import { DartBuilder } from './builder';

export class ParameterBuilder implements DartBuilder {
  private _name: string;
  private _type: string;
  private _required: boolean;
  private _jsonKey: { name: string } | { fromJson: string };

  public getName(): string {
    return this._name;
  }

  public name(name: string): this {
    this._name = name;
    return this;
  }

  public type(type: string): this {
    this._type = type;
    return this;
  }

  public required(): this {
    this._required = true;
    return this;
  }

  public jsonKey(value: typeof this._jsonKey) {
    this._jsonKey = value;
    return this;
  }

  public build(): string {
    const results: string[] = [];

    if (this._jsonKey) {
      const jsonKeyName = this._jsonKey['name'];
      const fromJson = this._jsonKey['fromJson'];
      results.push(
        `@JsonKey(${
          jsonKeyName ? `name: '${jsonKeyName}'` : `fromJson: ${fromJson}`
        })`,
      );
    }

    if (this._required) {
      results.push('required');
    }

    if (!this._type || !this._name) {
      throw new Error('Parameter does not have type or name!');
    }

    results.push(this._type, this._name);
    return results.join(' ');
  }
}

export class ConstructorBuilder implements DartBuilder {
  private _className: string;
  private _discriminatorValue: string;
  private _parameters: ParameterBuilder[] = [];

  public className(name: string): this {
    this._className = name;
    return this;
  }

  public parameter(parameter: ParameterBuilder): this {
    this._parameters.push(parameter);
    return this;
  }

  public parameters(parameters: ParameterBuilder[]): this {
    this._parameters = [...this._parameters, ...parameters];
    return this;
  }

  public discriminatorValue(value: string): this {
    this._discriminatorValue = value;
    return this;
  }

  build(): string {
    if (!this._className) {
      throw new Error('Constructor does not have name!');
    }

    if (!this._parameters.length) {
      throw new Error('Constructor does not have parameters!');
    }

    return `
    @JsonSerializable(explicitToJson: true)
    ${
      this._discriminatorValue
        ? `@FreezedUnionValue('${this._discriminatorValue}')`
        : ''
    }
    const factory ${this._className}${
      this._discriminatorValue ? `.${camelCase(this._discriminatorValue)}` : ''
    }({
          ${this._parameters
            .reduce<string[]>((pv, parameter) => [...pv, parameter.build()], [])
            .join(',\n')},
        }) = ${!this._discriminatorValue ? '_' : ''}${this._className}${
      this._discriminatorValue
        ? `${capitalCase(this._discriminatorValue).replaceAll(' ', '')}`
        : ''
    };
        `;
  }
}

export class ClassBuilder implements DartBuilder {
  private _discriminatorKey: string;
  private _className: string;
  private _constructors: ConstructorBuilder[] = [];

  public discriminator(key: string): this {
    this._discriminatorKey = key;
    return this;
  }

  public className(name: string): this {
    this._className = name;
    return this;
  }

  public addConstructor(constructor: ConstructorBuilder) {
    this._constructors.push(constructor);
    return this;
  }

  public addConstructors(constructors: ConstructorBuilder[]) {
    this._constructors = [...this._constructors, ...constructors];
    return this;
  }

  public get jsonFactory(): string {
    return `  factory ${this._className}.fromJson(Map<String, dynamic> json) =>
      _$${this._className}FromJson(json);`;
  }

  public get jsonToFromFunction(): string {
    return `
    ${this._className} ${this._className}FromJson(Map<String, dynamic> json) =>
      ${this._className}.fromJson(json);
    
    Map<String, dynamic> ${this._className}ToJson(${this._className} body) => body.toJson();
    `;
  }

  build(): string {
    return `
    ${
      this._discriminatorKey
        ? `@Freezed(unionKey: '${this._discriminatorKey}')`
        : '@freezed'
    }
    class ${this._className} with _$${this._className} {
        ${this._constructors
          .map((c) => c.className(this._className).build())
          .join('\n')}

          ${this.jsonFactory}
    }
    `;
  }
}
