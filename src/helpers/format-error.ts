import { GraphQLFormattedError } from "graphql/error";
import { ApolloServerErrorCode } from "@apollo/server/errors";
import logger from "./logger.js";

const formatError = (formattedError: GraphQLFormattedError, error: any) => {
  logger.error("FORMAT_ERROR", formattedError.message, error);

  if (
    formattedError?.extensions?.code ===
    ApolloServerErrorCode.GRAPHQL_VALIDATION_FAILED
  ) {
    return {
      ...formattedError,
      message: "Your query doesn't match the schema. Try double-checking it!",
    };
  }

  return formattedError;
};

export default formatError;
