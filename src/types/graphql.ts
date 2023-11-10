import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from "graphql";
import { Context } from "./context";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  CountryCode: { input: any; output: any };
  Date: { input: any; output: any };
  DateTime: { input: any; output: any };
  EmailAddress: { input: any; output: any };
  JSON: { input: any; output: any };
  JSONObject: { input: any; output: any };
};

export type Mutation = {
  __typename?: "Mutation";
  _: Scalars["String"]["output"];
  signIn?: Maybe<Scalars["String"]["output"]>;
  signVerify?: Maybe<Scalars["String"]["output"]>;
  user?: Maybe<User>;
};

export type MutationArgs = {
  message: Scalars["String"]["input"];
};

export type MutationSignInArgs = {
  id: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
};

export type MutationSignVerifyArgs = {
  token: Scalars["String"]["input"];
};

export type MutationUserArgs = {
  email?: InputMaybe<Scalars["EmailAddress"]["input"]>;
  name: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
};

export type Query = {
  __typename?: "Query";
  _: Scalars["String"]["output"];
  date?: Maybe<Scalars["Date"]["output"]>;
  dateTime?: Maybe<Scalars["DateTime"]["output"]>;
  json?: Maybe<Scalars["JSON"]["output"]>;
  jsonObject?: Maybe<Scalars["JSONObject"]["output"]>;
  user?: Maybe<User>;
  users?: Maybe<Array<Maybe<User>>>;
};

export type Subscription = {
  __typename?: "Subscription";
  _?: Maybe<Scalars["String"]["output"]>;
};

export type User = {
  __typename?: "User";
  email?: Maybe<Scalars["EmailAddress"]["output"]>;
  id: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
  password: Scalars["String"]["output"];
  salt: Scalars["String"]["output"];
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {},
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo,
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {},
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<NonNullable<unknown>>;
  CountryCode: ResolverTypeWrapper<NonNullable<unknown>>;
  Date: ResolverTypeWrapper<NonNullable<unknown>>;
  DateTime: ResolverTypeWrapper<NonNullable<unknown>>;
  EmailAddress: ResolverTypeWrapper<NonNullable<unknown>>;
  JSON: ResolverTypeWrapper<NonNullable<unknown>>;
  JSONObject: ResolverTypeWrapper<NonNullable<unknown>>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<NonNullable<unknown>>;
  Subscription: ResolverTypeWrapper<{}>;
  User: ResolverTypeWrapper<NonNullable<unknown>>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: NonNullable<unknown>;
  CountryCode: NonNullable<unknown>;
  Date: NonNullable<unknown>;
  DateTime: NonNullable<unknown>;
  EmailAddress: NonNullable<unknown>;
  JSON: NonNullable<unknown>;
  JSONObject: NonNullable<unknown>;
  Mutation: {};
  Query: {};
  String: NonNullable<unknown>;
  Subscription: {};
  User: NonNullable<unknown>;
};

export interface CountryCodeScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["CountryCode"], any> {
  name: "CountryCode";
}

export interface DateScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Date"], any> {
  name: "Date";
}

export interface DateTimeScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["DateTime"], any> {
  name: "DateTime";
}

export interface EmailAddressScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["EmailAddress"], any> {
  name: "EmailAddress";
}

export interface JsonScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["JSON"], any> {
  name: "JSON";
}

export interface JsonObjectScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["JSONObject"], any> {
  name: "JSONObject";
}

export type MutationResolvers<
  ContextType = Context,
  ParentType extends
    ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"],
> = {
  _?: Resolver<
    ResolversTypes["String"],
    ParentType,
    ContextType,
    RequireFields<MutationArgs, "message">
  >;
  signIn?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSignInArgs, "id" | "password">
  >;
  signVerify?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSignVerifyArgs, "token">
  >;
  user?: Resolver<
    Maybe<ResolversTypes["User"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUserArgs, "name" | "password">
  >;
};

export type QueryResolvers<
  ContextType = Context,
  ParentType extends
    ResolversParentTypes["Query"] = ResolversParentTypes["Query"],
> = {
  _?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  date?: Resolver<Maybe<ResolversTypes["Date"]>, ParentType, ContextType>;
  dateTime?: Resolver<
    Maybe<ResolversTypes["DateTime"]>,
    ParentType,
    ContextType
  >;
  json?: Resolver<Maybe<ResolversTypes["JSON"]>, ParentType, ContextType>;
  jsonObject?: Resolver<
    Maybe<ResolversTypes["JSONObject"]>,
    ParentType,
    ContextType
  >;
  user?: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>;
  users?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["User"]>>>,
    ParentType,
    ContextType
  >;
};

export type SubscriptionResolvers<
  ContextType = Context,
  ParentType extends
    ResolversParentTypes["Subscription"] = ResolversParentTypes["Subscription"],
> = {
  _?: SubscriptionResolver<
    Maybe<ResolversTypes["String"]>,
    "_",
    ParentType,
    ContextType
  >;
};

export type UserResolvers<
  ContextType = Context,
  ParentType extends
    ResolversParentTypes["User"] = ResolversParentTypes["User"],
> = {
  email?: Resolver<
    Maybe<ResolversTypes["EmailAddress"]>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  password?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  salt?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = Context> = {
  CountryCode?: GraphQLScalarType;
  Date?: GraphQLScalarType;
  DateTime?: GraphQLScalarType;
  EmailAddress?: GraphQLScalarType;
  JSON?: GraphQLScalarType;
  JSONObject?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

export type CountryCode = Scalars["CountryCode"];
export type Date = Scalars["Date"];
export type DateTime = Scalars["DateTime"];
export type EmailAddress = Scalars["EmailAddress"];
export type Json = Scalars["JSON"];
export type JsonObject = Scalars["JSONObject"];
