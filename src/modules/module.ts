import { createModule, gql } from "graphql-modules";
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
      sendMessage(message: String!): Message
    }

    type Subscription {
      messageAdded: Message
    }

    type Message {
      id: Int
      body: String
    }
  `,
  resolvers: {
    Query: {
      messages() {
        return messages;
      },
    },
    Mutation: {
      sendMessage(_parent: any, { message }: any) {
        const created = {
          id: Math.round(Math.random() * (10000 - 1) + 1),
          body: message,
        };

        pubsub.publish(MESSAGE_ADDED, { messageAdded: created });
        messages.push(created);
        return created;
      },
    },
    Subscription: {
      messageAdded: {
        subscribe() {
          console.log("Hello=========");
          return pubsub.asyncIterator([MESSAGE_ADDED]);
        },
      },
    },
  },
});

export default gqlModule;