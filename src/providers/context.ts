import { BaseContext, ContextFunction } from "@apollo/server";
import { ExpressContextFunctionArgument } from "@apollo/server/dist/esm/express4";
import { Log } from "./logger.js";
import env from "./env.js";

export interface Context extends BaseContext {
  log: typeof Log;
  env: typeof env;
}

export const getContext: ContextFunction<
  [ExpressContextFunctionArgument],
  Context
> = async ({ req }) => {
  return {
    log: Log,
    env,
  };
};
