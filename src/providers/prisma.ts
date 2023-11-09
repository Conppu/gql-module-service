import { PrismaClient } from "@prisma/client";
import logger from "./logger.js";

export const prisma = new PrismaClient();

async function connect() {
  logger.info("DATABASE :: Initializing prisma connecting");
  await prisma
    .$connect()
    .then(() => {
      logger.info(
        "DATABASE :: Prisma connected to the database server ✅ ✅ ✅",
      );
    })
    .catch(async (error: any) => {
      await prisma.$disconnect();
      logger.error(
        "DATABASE :: prisma failed to connect to the database",
        error,
      );
      process.exit(1);
    });

  process.on("SIGINT", async function () {
    await prisma.$disconnect().then(() => {
      logger.error(
        "DATABASE :: Prisma disconnecting from the database server due to SIGINT",
      );
      process.exit(0);
    });
  });
}

async function disconnect() {
  return await prisma.$disconnect().then(() => {
    logger.error("DATABASE :: Prisma disconnecting from the database server");
  });
}

export const database = {
  connect,
  disconnect,
};
