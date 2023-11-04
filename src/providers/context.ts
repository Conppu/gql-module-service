import { ContextFunction } from "@apollo/server";
import { ExpressContextFunctionArgument } from "@apollo/server/dist/esm/express4";
import { Context } from "../types/context.js";
import logger from "./logger.js";
import configs from "./configs.js";
import * as errors from "./errors.js";
import pubsub, { subscriptionName } from "./pubsub.js";

const getContext: ContextFunction<
  [ExpressContextFunctionArgument],
  Context
> = async () => {
  return {
    logger,
    configs,
    errors,
    pubsub,
    subscriptionName,
  };
};

export default getContext;
