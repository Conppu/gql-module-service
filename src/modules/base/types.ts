import * as Types from "../../types/graphql";
import * as gm from "graphql-modules";
export namespace BaseModule {
  interface DefinedFields {
    Query: "_";
    Mutation: "_";
  }

  export type Query = Pick<Types.Query, DefinedFields["Query"]>;
  export type Mutation = Pick<Types.Mutation, DefinedFields["Mutation"]>;

  export type QueryResolvers = Pick<
    Types.QueryResolvers,
    DefinedFields["Query"]
  >;
  export type MutationResolvers = Pick<
    Types.MutationResolvers,
    DefinedFields["Mutation"]
  >;

  export interface Resolvers {
    Query?: QueryResolvers;
    Mutation?: MutationResolvers;
  }

  export interface MiddlewareMap {
    "*"?: {
      "*"?: gm.Middleware[];
    };
    Query?: {
      "*"?: gm.Middleware[];
      _?: gm.Middleware[];
    };
    Mutation?: {
      "*"?: gm.Middleware[];
      _?: gm.Middleware[];
    };
  }
}
