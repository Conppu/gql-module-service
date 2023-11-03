/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApolloError } from "apollo-server-errors";
import { rule, shield } from "graphql-shield";
import { Log } from "./logger.js";

const isAuthenticated = rule({ cache: "contextual" })(async (
  _parent,
  _args,
  ctx,
  _info,
) => {
  return ctx.user.isAuthenticated;
});

export const permissions = shield(
  {
    Query: {},
    Mutation: {},
  },
  {
    async fallbackError(thrownThing, _parent, _args, _context, _info) {
      if (thrownThing instanceof ApolloError) {
        // expected errors
        return thrownThing;
      }
      if (thrownThing instanceof Error) {
        // unexpected errors
        Log.error(thrownThing);
        return new ApolloError("Internal server error", "ERR_INTERNAL_SERVER");
      }
      // what the hell got thrown
      console.error("The resolver threw something that is not an error.");
      console.error(thrownThing);
      return new ApolloError("Internal server error", "ERR_INTERNAL_SERVER");
    },
  },
);
