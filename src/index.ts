import cors from "cors";
import bodyParser from "body-parser";
import express from "express";
import { createServer } from "http";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { WebSocketServer } from "ws";
import { applyMiddleware } from "graphql-middleware";
import { useServer } from "graphql-ws/lib/use/ws";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

import application from "./graphql/application.js";
import { formatError } from "./providers/error.js";
import { getContext } from "./providers/context.js";
import { permissions } from "./providers/shield.js";
import env from "./providers/env.js";

const executor = application.createApolloExecutor();
const schema = applyMiddleware(application.schema, permissions);

const app = express();
const httpServer = createServer(app);

const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/graphql",
});

const serverCleanup = useServer({ schema }, wsServer);

const server = new ApolloServer({
  introspection: true,
  csrfPrevention: true,
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
  formatError,
});

await server.start();

app.use(
  "/graphql",
  cors(),
  bodyParser.json(),
  expressMiddleware(server, { context: getContext })
);

app.get("/ping", (_req, res) => res.send("pong"));

httpServer.listen({ port: env.PORT }, () => {
  console.log(`🚀 Server ready at http://localhost:4000/graphql`);
});
