import { createModule, Injectable, gql } from "graphql-modules";
import { PubSub } from "graphql-subscriptions";

export const pubsub = new PubSub();

const MESSAGE_ADDED = "MESSAGE_ADDED";

const messages: { id: any; body: string }[] = [
  // ...
];

const gqlModule = createModule({
  id: "my-module",
  providers: [],
  typeDefs: gql`
    type Query {
      messages: [Message!]
    }

    type Mutation {
      sendMessage(message: String!): Message!
    }

    type Subscription {
      messageAdded: Message
    }

    type Message {
      id: ID!
      body: String!
    }
  `,
  resolvers: {
    Query: {
      messages(_parent: any, _args: any, ctx: GraphQLModules.Context) {
        return messages;
      },
    },
    Mutation: {
      sendMessage(_parent: any, { message }: any, ctx: GraphQLModules.Context) {
        const created = {
          id: Math.random() * (100000 - 1) + 1,
          body: message,
        };

        messages.push(created);
        pubsub.publish(MESSAGE_ADDED, { messageAdded: message });
      },
    },
    Subscription: {
      messageAdded: {
        subscribe(_root: any, _args: any, ctx: GraphQLModules.Context) {
          return pubsub.asyncIterator(MESSAGE_ADDED);
        },
      },
    },
  },
});

export default gqlModule;
