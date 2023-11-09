import { GraphQLError } from "graphql";
import { GraphQLFormattedError } from "graphql/error";
import { ApolloServerErrorCode } from "@apollo/server/errors";
import logger from "./logger.js";

export type ErrorCode =
  | "UNEXPECTED_SERVER_ERROR"
  | "ENTITY_NOT_FOUND"
  | "AUTHENTICATION_FAILED";

export function GQLError(
  message: string,
  code: ErrorCode = "UNEXPECTED_SERVER_ERROR",
) {
  return new GraphQLError(message, {
    extensions: {
      code,
    },
  });
}

export const formatError = (
  formattedError: GraphQLFormattedError,
  error: any,
) => {
  logger.error(formattedError.message, error);

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

// :: Method of extending the GraphQLError ::
// class UnexpectedServerError extends GraphQLError {
//   constructor(message: string, options?: GraphQLErrorOptions) {
//     super(message, {
//       ...options,
//       extensions: {
//         ...options?.extensions,
//         code: "UNEXPECTED_SERVER_ERROR",
//       },
//     });
//   }
// }
