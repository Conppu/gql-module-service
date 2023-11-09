import { hashPassword, random, verifyPassword } from "../../helpers/hash.js";
import { decodeJWT, encodeJWT } from "../../helpers/jwt.js";
import { UserModule } from "./types";

const users = [
  {
    id: "b6da620c70",
    email: "1",
    name: "1",
    password:
      "9fc1d4c740154ad5579faca963ea30856cbe20a197b96b497f04bf06ce53c4a67f05dd8e29333ef1a1c365d7c228459e29d1fe7f5f6f61a50beb07c7c76e44b2",
    salt: "6902d24b9372fda7b519e3ff7bf5febe",
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
        return users[0] || {};
      }

      throw ctx.GQLError("Unknown");
    },
  },

  Mutation: {
    user: (_parent, { name, email, password }, ctx) => {
      const { hash, salt } = hashPassword(password);
      const data = {
        id: random(5),
        name: name || "",
        email: email || "",
        salt,
        password: hash,
      };
      ctx.logger.info("MUTATION :: USER RESOLVER", { data });
      users.push(data);
      return data;
    },

    signIn: (_parent, { id, password }, ctx) => {
      const user = users.find((e) => e.id === id);
      if (!user) {
        throw ctx.GQLError("NO_USER_FOUND", "ENTITY_NOT_FOUND");
      }
      const passwordMatch = verifyPassword(password, user.password, user.salt);

      if (!passwordMatch) {
        throw ctx.GQLError("PASSWORD_MISS_MATCH", "AUTHENTICATION_FAILED");
      }
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
