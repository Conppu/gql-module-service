import { randomUUID } from "crypto";
import {
  generatePasswordHash,
  verifyPasswordHash,
} from "../../helpers/hash.js";
import { decodeJWT, encodeJWT } from "../../helpers/jwt.js";
import { UserModule } from "./types";

const users = [
  {
    id: "7f855dc5-1ba6-4c6f-9b5b-c4a7cee65b5d",
    email: "2",
    name: "2",
    password:
      "655d9c6a8ef458f8626db6342dec2d82ba5e317223156ec9d5bcb50a50455361872a26afd31a5708bd19b67e4c305f4c802b14c3d05673e0df6b838e5bb4172a",
    salt: "505ecd6768a539546c5f1718d6bad580a8984ed1fe72c93685b44bf0971eb7f7f0616a5fa5a99a1ae7d777b9162170d15a93408cf67049308034461a92248fbd",
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
      const { hash, salt } = generatePasswordHash(password);
      const data = {
        id: randomUUID(),
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
      const passwordMatch = verifyPasswordHash(
        password,
        user.password,
        user.salt,
      );

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
