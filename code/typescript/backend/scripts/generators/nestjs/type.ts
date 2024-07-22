export const NestMethods = [
  'Get',
  'Post',
  'Put',
  'Delete',
  'Patch',
  'Options',
  'Head',
  'All',
] as const;
export type NestMethod = (typeof NestMethods)[number];

export const NestParameterPrmitiveType = ['number', 'string'];
export type NestParameterPrmitiveType =
  (typeof NestParameterPrmitiveType)[number];

export const RouteReturnType = ['string', 'number', 'boolean', 'void'];
export type RouteReturnType = (typeof RouteReturnType)[number];

export interface NestjsAstController {
  className: string;

  /**
   * Simplified name of the class
   *
   * `UserController` is simplified to `User`
   */
  name: string;

  /**
   * The path of the controller
   *
   *  Path will be null if its the root controller
   */
  path: string | null;

  /**
   * The routes of the controller
   */
  routes: NestjsAstControllerRoute[];
}

export interface NestjsAstControllerRoute {
  /**
   * The name of the method
   */
  name: string;

  /**
   * The path of the method
   *
   *  `/user/:id`
   *
   *  `/book/:bookId/chapter/:chapterId`
   */
  path: string;

  /**
   * The HTTP method of the method
   */
  method: NestMethod;

  /**
   * The return type of the method
   */
  returnType: {
    type: RouteReturnType | string;
    // primitive type does not have import
    importPath: string | null;
  } | null;

  /**
   * Information of each route parameter
   */
  parameters: {
    name: string;
    type: NestParameterPrmitiveType;
  }[];

  /**
   * Information of the route query
   */
  query: {
    type: string;
    importPath: string;
  } | null;

  /**
   * Information of the route body
   */
  body: {
    type: string;
    importPath: string;
  } | null;
}
