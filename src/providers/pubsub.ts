import { PubSub } from "graphql-subscriptions";

const pubsub = new PubSub();

export const subscriptionName = {
  MESSAGE_ADDED: "MESSAGE_ADDED",
};

export default pubsub;
