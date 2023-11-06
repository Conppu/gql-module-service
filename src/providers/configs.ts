import "dotenv/config";
import config from "config";

const NODE_ENV = process.env["NODE_ENV"] || "development";
const IS_DEV = NODE_ENV === "development";
const IS_PROD = NODE_ENV === "production";
const IS_STAG = NODE_ENV === "staging";

const APP_NAME = config.get("APP_NAME") as string;

// SSH KEY PAIR
const PUBLIC_KEY = process.env["PUBLIC_KEY"] || config.get("SSH.PUBLIC_KEY");
const PRIVATE_KEY = process.env["PRIVATE_KEY"] || config.get("SSH.PRIVATE_KEY");
const PASS_PHRASE = process.env["PASS_PHRASE"] || config.get("SSH.PASS_PHRASE");

export default {
  APP_NAME,
  NODE_ENV,
  PORT: Number(process.env["PORT"]) || config.get("PORT"),
  DATABASE_URL: process.env["DATABASE_URL"] || config.get("DATABASE_URL"),
  SSH: {
    PUBLIC_KEY,
    PRIVATE_KEY,
    PASS_PHRASE,
  },
  IS_DEV,
  IS_PROD,
  IS_STAG,
};
