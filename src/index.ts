import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import application from "./graphql/application.js";

const executor = application.createApolloExecutor();
const apiSchema = application.schema;

const server = new ApolloServer({
  gateway: {
    async load() {
      return { executor };
    },
    onSchemaLoadOrUpdate(callback) {
      callback({ apiSchema } as any);
      return () => {};
    },
    async stop() {},
  },
});

startStandaloneServer(server, {
  context: async ({ req }) => ({ token: req.headers.token }),
  listen: { port: 4000 },
}).then(({ url }) => console.log(`🚀  Server ready at: ${url}`));
