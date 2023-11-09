import { subscriptionName } from "./../providers/pubsub";
import { BaseContext } from "@apollo/server";
import logger from "../providers/logger.js";
import configs from "../providers/configs.js";
import { GQLError } from "../providers/error-handlers.js";
import pubsub from "../providers/pubsub.js";

export interface Context extends BaseContext {
  logger: typeof logger;
  configs: typeof configs;
  GQLError: typeof GQLError;
  pubsub: typeof pubsub;
  subscriptionName: typeof subscriptionName;
}
