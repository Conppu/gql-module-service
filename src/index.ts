import cors from "cors";
import bodyParser from "body-parser";
import express from "express";
import { createServer } from "http";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";

import { ApolloServer, BaseContext, ContextFunction } from "@apollo/server";
import {
  ExpressContextFunctionArgument,
  expressMiddleware,
} from "@apollo/server/express4";
import application from "./graphql/application.js";

interface Context extends BaseContext {}

const getContext: ContextFunction<
  [ExpressContextFunctionArgument],
  Context
> = async ({ req }) => {
  return {};
};
const executor = application.createApolloExecutor();
const schema = application.schema;

const app = express();
const httpServer = createServer(app);

const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/graphql",
});

const serverCleanup = useServer({ schema }, wsServer);

const server = new ApolloServer({
  introspection: true,
  gateway: {
    async load() {
      return { executor };
    },
    onSchemaLoadOrUpdate(callback) {
      callback({ apiSchema: schema } as any);
      return () => {};
    },
    async stop() {},
  },
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ],
});

await server.start();

app.use(
  "/graphql",
  cors(),
  bodyParser.json(),
  expressMiddleware(server, { context: getContext })
);

app.get("/ping", (_req, res) => res.send("pong"));

httpServer.listen({ port: 4000 }, () => {
  console.log(`🚀 Server ready at http://localhost:4000/graphql`);
});
