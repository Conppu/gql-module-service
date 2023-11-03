import { BaseContext } from "@apollo/server";
import { Log } from "../providers/logger.js";
import env from "../providers/env.js";

export interface Context extends BaseContext {
  log: typeof Log;
  env: typeof env;
}
