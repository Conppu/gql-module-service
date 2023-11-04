import { BaseModule } from "./types";

let message = "Hello World!...";

const resolvers: BaseModule.Resolvers = {
  Query: {
    _: () => {
      return message;
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
  // EmailAddress: EmailAddressResolver,
};

export default resolvers;
