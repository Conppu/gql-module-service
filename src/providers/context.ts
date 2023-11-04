import { ContextFunction } from "@apollo/server";
import { ExpressContextFunctionArgument } from "@apollo/server/dist/esm/express4";
import logger from "./logger.js";
import configs from "./configs.js";
import * as errors from "./errors.js";
import { Context } from "../types/context.js";

const getContext: ContextFunction<
  [ExpressContextFunctionArgument],
  Context
> = async () => {
  return {
    logger,
    configs,
    errors,
  };
};

export default getContext;
