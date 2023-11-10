import * as Types from "../../types/graphql";
import * as gm from "graphql-modules";
export namespace BaseModule {
  interface DefinedFields {
    Query: "_" | "json" | "jsonObject" | "date" | "dateTime";
    Mutation: "_";
    Subscription: "_";
  }

  export type Query = Pick<Types.Query, DefinedFields["Query"]>;
  export type Mutation = Pick<Types.Mutation, DefinedFields["Mutation"]>;
  export type Subscription = Pick<
    Types.Subscription,
    DefinedFields["Subscription"]
  >;

  export type Scalars = Pick<
    Types.Scalars,
    "JSON" | "JSONObject" | "CountryCode" | "Date" | "DateTime" | "EmailAddress"
  >;
  export type JsonScalarConfig = Types.JsonScalarConfig;
  export type JsonObjectScalarConfig = Types.JsonObjectScalarConfig;
  export type CountryCodeScalarConfig = Types.CountryCodeScalarConfig;
  export type DateScalarConfig = Types.DateScalarConfig;
  export type DateTimeScalarConfig = Types.DateTimeScalarConfig;
  export type EmailAddressScalarConfig = Types.EmailAddressScalarConfig;

  export type QueryResolvers = Pick<
    Types.QueryResolvers,
    DefinedFields["Query"]
  >;
  export type MutationResolvers = Pick<
    Types.MutationResolvers,
    DefinedFields["Mutation"]
  >;
  export type SubscriptionResolvers = Pick<
    Types.SubscriptionResolvers,
    DefinedFields["Subscription"]
  >;

  export interface Resolvers {
    Query?: QueryResolvers;
    Mutation?: MutationResolvers;
    Subscription?: SubscriptionResolvers;
    JSON?: Types.Resolvers["JSON"];
    JSONObject?: Types.Resolvers["JSONObject"];
    CountryCode?: Types.Resolvers["CountryCode"];
    Date?: Types.Resolvers["Date"];
    DateTime?: Types.Resolvers["DateTime"];
    EmailAddress?: Types.Resolvers["EmailAddress"];
  }

  export interface MiddlewareMap {
    "*"?: {
      "*"?: gm.Middleware[];
    };
    Query?: {
      "*"?: gm.Middleware[];
      _?: gm.Middleware[];
      json?: gm.Middleware[];
      jsonObject?: gm.Middleware[];
      date?: gm.Middleware[];
      dateTime?: gm.Middleware[];
    };
    Mutation?: {
      "*"?: gm.Middleware[];
      _?: gm.Middleware[];
    };
    Subscription?: {
      "*"?: gm.Middleware[];
      _?: gm.Middleware[];
    };
  }
}
