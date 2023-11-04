// import { GraphQLError } from "graphql";
import {
  ApolloError,
  AuthenticationError,
  ForbiddenError,
  PersistedQueryNotFoundError,
  PersistedQueryNotSupportedError,
  SyntaxError,
  UserInputError,
  ValidationError,
} from "apollo-server-errors";

class InternalServerError extends ApolloError {
  constructor(message: string, extensions?: Record<string, any>) {
    super(message, "INTERNAL_SERVER", extensions);

    Object.defineProperty(this, "name", { value: "InternalServerError" });
  }
}

class EntityNotFoundError extends ApolloError {
  constructor(message: string, extensions?: Record<string, any>) {
    super(message, "ENTITY_NOT_FOUND", extensions);

    Object.defineProperty(this, "name", { value: "EntityNotFoundError" });
  }
}

export {
  AuthenticationError,
  ForbiddenError,
  PersistedQueryNotFoundError,
  PersistedQueryNotSupportedError,
  SyntaxError,
  UserInputError,
  ValidationError,
  InternalServerError,
  EntityNotFoundError,
};
