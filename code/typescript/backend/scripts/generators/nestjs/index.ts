import * as babelParser from '@babel/parser';
import {
  CallExpression,
  ClassDeclaration,
  ClassMethod,
  Decorator,
  ExportNamedDeclaration,
  Identifier,
  ImportDeclaration,
  Program,
  StringLiteral,
  TSTypeAnnotation,
  TSTypeParameterInstantiation,
  TSTypeReference,
} from '@babel/types';
import { Glob } from 'glob';
import fs from 'node:fs/promises';
import path from 'path';
import {
  NestMethod,
  NestMethods,
  NestjsAstController,
  NestjsAstControllerRoute,
} from './type';

function hasIgnoreDecorator(decorators: Decorator[]) {
  const found = decorators.find((d) => {
    // make sure its a CallExpression
    if (d.expression.type === 'CallExpression') {
      // get decorator name
      const decoratorName = (d.expression.callee as Identifier).name;
      // make sure its @Ignore
      return decoratorName === 'Ignore';
    }
  });
  return !!found;
}

function getImportDeclaration(
  specifier: string,
  file: Program,
): ImportDeclaration | null {
  const importDeclaration = file.body.find((b) => {
    return (
      b.type === 'ImportDeclaration' &&
      b.specifiers.find((s) => {
        return s.type === 'ImportSpecifier' && s.local.name === specifier;
      })
    );
  }) as ImportDeclaration;

  return importDeclaration;
}

/**
 *
 * Checks if the import path is valid according to root tsconfig,
 * and whether it can be imported in other monorepo packages
 *
 * A valid path will be `libs/entities`
 *
 * If the path is not valid, it will try to fix the path by resolving a new path
 *
 * If the path is still not valid, it will throw an error
 *
 */
function isImportPathValid(path: string) {
  //
}

async function main() {
  // path to generated api folder
  const dstFolder = path.resolve(__dirname, '../../app/src/api');
  console.log(dstFolder);

  const controllers = new Glob('apps/api/src/**/*.controller.ts', {
    withFileTypes: true,
  });

  for await (const file of controllers) {
    const controllerCode = await fs.readFile(file.fullpath(), 'utf-8');
    const parsed = babelParser.parse(controllerCode, {
      sourceType: 'module',
      plugins: ['decorators-legacy', 'typescript'],
    });

    // Check if the file is the app controller at src
    // folder instead of a module folder
    const isSrcController = path.basename(file.path) === 'src';

    const controllerName = path.basename(file.fullpath()).split('.')[0];

    // filter out the real Controller class
    const controllerDeclaration = parsed.program.body.find((b) => {
      const classDeclaration =
        b.type === 'ExportNamedDeclaration' &&
        b.declaration.type === 'ClassDeclaration';

      if (!classDeclaration) return false;

      return (b.declaration as ClassDeclaration).decorators.find((d) => {
        // make sure its a CallExpression
        if (d.expression.type === 'CallExpression') {
          // get decorator name
          const decoratorName = (d.expression.callee as Identifier).name;
          // make sure its @Controller
          return decoratorName === 'Controller';
        }
      });
    }) as ExportNamedDeclaration;

    const classDeclaration =
      controllerDeclaration.declaration as ClassDeclaration;

    const shouldIgnore = hasIgnoreDecorator(classDeclaration.decorators || []);
    if (shouldIgnore) continue;

    const controllerDecorator = classDeclaration.decorators.find((d) => {
      // make sure its a CallExpression
      if (d.expression.type === 'CallExpression') {
        // get decorator name
        const decoratorName = (d.expression.callee as Identifier).name;
        // make sure its @Controller
        return decoratorName === 'Controller';
      }
    });

    if (!controllerDecorator) {
      throw new Error(
        `Controller ${classDeclaration.id.name} does not have a @Controller decorator`,
      );
    }

    const controllerPath = (
      (controllerDecorator.expression as CallExpression)
        .arguments[0] as StringLiteral
    )?.value;

    const result: NestjsAstController = {
      className: classDeclaration.id.name as string,
      path: controllerPath,
      name: controllerName,
      routes: classDeclaration.body.body.reduce<NestjsAstControllerRoute[]>(
        (pv, cv) => {
          const method = cv as ClassMethod;
          if (cv.type !== 'ClassMethod') return pv;
          const methodName = (method.key as Identifier).name;

          const ignoreRoute = hasIgnoreDecorator(method.decorators || []);
          if (ignoreRoute) return pv;

          const methodDecorator = (method.decorators || []).find((d) => {
            // make sure its a CallExpression
            if (d.expression.type === 'CallExpression') {
              // get decorator name
              const decoratorName = (d.expression.callee as Identifier)
                .name as NestMethod;
              // make sure its a Nest method
              return NestMethods.includes(decoratorName);
            }
          });

          if (!methodDecorator) return pv;

          const path = (
            (methodDecorator.expression as CallExpression)
              .arguments[0] as StringLiteral
          )?.value;

          const methodType = (
            (methodDecorator.expression as CallExpression).callee as Identifier
          ).name as NestMethod;

          function resolveType(
            value: TSTypeAnnotation | null,
          ): NestjsAstControllerRoute['returnType'] {
            if (!value) return null;

            // we will assume its a Promise type
            // we will need to extract the type inside the Promise
            const promiseType = value.typeAnnotation as TSTypeReference;

            // this is the generic inside the Promise
            const promiseTypeParams = (
              promiseType.typeParameters as TSTypeParameterInstantiation
            )?.params;

            if (!promiseTypeParams) return null;

            // type inside the Promise
            const typeReference = promiseTypeParams[0] as TSTypeReference;

            // this means the inner type of Promise is a nested generic type
            // Promise<ApiResponse<{token: string}>> for example
            if (typeReference.typeParameters) {
              throw new Error(
                `Nested generics are not supported yet. Please use a type alias for the method ${methodName} in ${classDeclaration.id.name}`,
              );
            }

            const type = (typeReference.typeName as Identifier)?.name;

            const importDeclaration = getImportDeclaration(
              type,
              parsed.program,
            );

            return {
              type,
              importPath: importDeclaration?.source.value,
            };
          }

          pv.push({
            name: methodName,
            path: path,
            parameters: [],
            query: null,
            returnType: resolveType(method.returnType as TSTypeAnnotation),
            body: null,
            method: methodType,
          });

          return pv;
        },
        [],
      ),
    };

    console.log('controller', JSON.stringify(result, null, 2));
  }
}

main();
