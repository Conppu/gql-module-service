import { ContextFunction } from "@apollo/server";
import { ExpressContextFunctionArgument } from "@apollo/server/dist/esm/express4";
import { Log } from "./logger.js";
import env from "./env.js";
import { Context } from "../types/context.js";

export const getContext: ContextFunction<
  [ExpressContextFunctionArgument],
  Context
> = async () => {
  return {
    log: Log,
    env,
  };
};
