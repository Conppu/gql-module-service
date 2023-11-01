import { EmailAddressResolver } from "graphql-scalars";

export default {
  Query: { _: () => "Hello world!" },
  Mutation: { _: () => "Hello world!" },
  EmailAddress: EmailAddressResolver,
};
