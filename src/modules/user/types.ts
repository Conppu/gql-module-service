import * as Types from "../../types/graphql";
import * as gm from "graphql-modules";
export namespace UserModule {
  interface DefinedFields {
    Query: "users" | "user";
    Mutation: "user" | "signIn" | "signVerify";
    User: "id" | "email" | "name" | "password" | "salt";
  }

  export type Query = Pick<Types.Query, DefinedFields["Query"]>;
  export type User = Pick<Types.User, DefinedFields["User"]>;
  export type Mutation = Pick<Types.Mutation, DefinedFields["Mutation"]>;
  export type EmailAddress = Types.EmailAddress;

  export type QueryResolvers = Pick<
    Types.QueryResolvers,
    DefinedFields["Query"]
  >;
  export type MutationResolvers = Pick<
    Types.MutationResolvers,
    DefinedFields["Mutation"]
  >;
  export type UserResolvers = Pick<
    Types.UserResolvers,
    DefinedFields["User"] | "__isTypeOf"
  >;

  export interface Resolvers {
    Query?: QueryResolvers;
    Mutation?: MutationResolvers;
    User?: UserResolvers;
  }

  export interface MiddlewareMap {
    "*"?: {
      "*"?: gm.Middleware[];
    };
    Query?: {
      "*"?: gm.Middleware[];
      users?: gm.Middleware[];
      user?: gm.Middleware[];
    };
    Mutation?: {
      "*"?: gm.Middleware[];
      user?: gm.Middleware[];
      signIn?: gm.Middleware[];
      signVerify?: gm.Middleware[];
    };
    User?: {
      "*"?: gm.Middleware[];
      id?: gm.Middleware[];
      email?: gm.Middleware[];
      name?: gm.Middleware[];
      password?: gm.Middleware[];
      salt?: gm.Middleware[];
    };
  }
}
