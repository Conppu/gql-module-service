import { BaseModule } from "./types";
import {
  CountryCodeResolver,
  DateResolver,
  DateTimeResolver,
  EmailAddressResolver,
} from "graphql-scalars";
import GraphQLJSON, { GraphQLJSONObject } from "graphql-type-json";

let message = "Hello World!...";

const resolvers: BaseModule.Resolvers = {
  Query: {
    _: () => {
      return message;
    },
    json: () => {
      return [{ hello: "world", foo: "bar" }];
    },
    jsonObject: () => {
      return { hello: "world", foo: "bars", white: "sky" };
    },
    date: () => {
      return new Date();
    },
    dateTime: () => {
      return new Date();
    },
  },
  Mutation: {
    _: (_parent, _arg, ctx) => {
      ctx.pubsub.publish(ctx.subscriptionName.MESSAGE_ADDED, {
        _: _arg.message,
      });
      message = _arg.message;
      return message;
    },
  },
  Subscription: {
    _: {
      subscribe: (_parent, _arg, ctx) =>
        ctx.pubsub.asyncIterator([ctx.subscriptionName.MESSAGE_ADDED]) as any,
    },
  },
  JSON: GraphQLJSON,
  JSONObject: GraphQLJSONObject,
  CountryCode: CountryCodeResolver,
  Date: DateResolver,
  DateTime: DateTimeResolver,
  EmailAddress: EmailAddressResolver,
};

export default resolvers;
