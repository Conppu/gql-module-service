import { GraphQLFormattedError } from "graphql/error";
import configs from "../providers/configs.js";
import logger from "../providers/logger.js";

const formatError = (formattedError: GraphQLFormattedError, error: any) => {
  logger.error(error);

  if (formattedError.message.startsWith("Database Error: ")) {
    return new Error("Internal server error");
  }

  if (configs.IS_PROD) {
    return {
      message: formattedError.message,
    };
  }

  return formattedError;
};

export default formatError;
