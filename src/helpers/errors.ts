import { GraphQLError } from "graphql";

export type ErrorCode = "UNEXPECTED_SERVER_ERROR" | "ENTITY_NOT_FOUND";

function GQLError(
  message: string,
  code: ErrorCode = "UNEXPECTED_SERVER_ERROR",
) {
  return new GraphQLError(message, {
    extensions: {
      code,
    },
  });
}

export default GQLError;

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
