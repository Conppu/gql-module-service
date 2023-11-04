import { subscriptionName } from "./../providers/pubsub";
import { BaseContext } from "@apollo/server";
import logger from "../providers/logger.js";
import configs from "../providers/configs.js";
import * as errors from "../providers/errors.js";
import pubsub from "../providers/pubsub.js";

export interface Context extends BaseContext {
  logger: typeof logger;
  configs: typeof configs;
  errors: typeof errors;
  pubsub: typeof pubsub;
  subscriptionName: typeof subscriptionName;
}
