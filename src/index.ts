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

import application from "./modules/application.js";
import getContext from "./providers/context.js";
import { permissions } from "./providers/shield.js";
import configs from "./providers/configs.js";
import logger from "./helpers/logger.js";
import formatError from "./helpers/format-error.js";
import { database } from "./providers/prisma.js";

const executor = application.createApolloExecutor();
const schema = applyMiddleware(application.schema, permissions);

const app = express();
const httpServer = createServer(app);

const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/graphql",
});

wsServer.on("connection", function connection(ws) {
  logger.info("WEBSOCKET :: Connected to WebSocketServer ✅ ✅ ✅");
  ws.on("error", logger.error);
  ws.on("pong", () => logger.debug("WEBSOCKET :: WS connected...."));

  ws.on("message", function message(data) {
    console.log("received: %s", data);
  });

  ws.send("something");
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
      callback({ apiSchema: schema } as never);
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
  expressMiddleware(server, { context: getContext }),
);

app.get("/ping", (_req, res) => res.send("pong"));

httpServer.listen({ port: configs.PORT }, async () => {
  logger.info(
    `SERVER :: 🚀 Server ready at http://localhost:${configs.PORT}/graphql ✅ ✅ ✅`,
  );
  await database.connect();
});
