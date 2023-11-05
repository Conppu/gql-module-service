import { Context } from "../../types/context";
import { UserModule } from "./types";

const users = [
  {
    id: 1,
    email: "test1@gmail.com",
    name: "tes001",
  },
  {
    id: 2,
    email: "test2@gmail.com",
    name: "tes002",
  },
];

const resolvers: UserModule.Resolvers = {
  Query: {
    users: (_parent: any, arg: any, ctx: Context) => {
      if (ctx.configs.IS_PROD) {
        return users;
      }

      throw ctx.GQLError("Unknown");
    },
  },

  Mutation: {
    user: (_parent: any, { name, email }: any, ctx: Context) => {
      const data = {
        id: Math.round(Math.random() * (10000 - 1) + 1),
        name: name || "",
        email: email || "",
      };
      ctx.logger.info("Mutation:user", { a: 11 });
      users.push(data);
      return data;
    },
  },
};

export default resolvers;
