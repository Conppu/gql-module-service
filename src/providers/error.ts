import { GraphQLFormattedError } from "graphql";

export const formatError = (
  formattedError: GraphQLFormattedError,
  error: any
) => {
  console.log("FORMATTED ERROR -----> ", formattedError);
  console.log("ERROR -----> ", error);
  return formattedError;
};
