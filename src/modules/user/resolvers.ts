import { decodeJWT, encodeJWT } from "../../helpers/jwt.js";
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
    users: (_parent, _arg, ctx) => {
      ctx.logger.info("QUERY :: USERS RESOLVER", { users });
      return users;
    },
    user: (_parent, _arg, ctx) => {
      ctx.logger.info("QUERY :: USER RESOLVER", { users });
      if (ctx.configs.IS_PROD) {
        return users[0];
      }

      throw ctx.GQLError("Unknown");
    },
  },

  Mutation: {
    user: (_parent, { name, email }, ctx) => {
      const data = {
        id: Math.round(Math.random() * (10000 - 1) + 1),
        name: name || "",
        email: email || "",
      };
      ctx.logger.info("MUTATION :: USER RESOLVER", { data });
      users.push(data);
      return data;
    },

    signIn: (_parent, { id }, ctx) => {
      const token = encodeJWT(ctx, { id });
      ctx.logger.info("MUTATION :: SIGN IN RESOLVER", { token });

      return token || "";
    },

    signVerify: (_parent, { token }, ctx) => {
      const data = decodeJWT(ctx, token);
      ctx.logger.info("MUTATION :: SIGN VERIFY RESOLVER", { data });

      return typeof data === "object" ? "IS_VALID" : data;
    },
  },
};

export default resolvers;
