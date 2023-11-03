// import { EmailAddressResolver } from "graphql-scalars";

import { BaseModule } from "./types";

const resolvers: BaseModule.Resolvers = {
  Query: { _: () => "Hello world!" },
  Mutation: { _: () => "Hello world!" },
  // EmailAddress: EmailAddressResolver,
};

export default resolvers;
