import "dotenv/config";
import config from "config";
import type { SignOptions, VerifyOptions } from "jsonwebtoken";

const NODE_ENV = process.env["NODE_ENV"] || "development";
const IS_DEV = NODE_ENV === "development";
const IS_PROD = NODE_ENV === "production";
const IS_STAG = NODE_ENV === "staging";

const APP_NAME = config.get("APP_NAME") as string;

// SSH KEY PAIR
const PUBLIC_KEY =
  process.env["PUBLIC_KEY"] || (config.get("SSH.PUBLIC_KEY") as string);
const PRIVATE_KEY =
  process.env["PRIVATE_KEY"] || (config.get("SSH.PRIVATE_KEY") as string);
const PASS_PHRASE =
  process.env["PASS_PHRASE"] || (config.get("SSH.PASS_PHRASE") as string);

const JWT_SIGN_OPTIONS: SignOptions = {
  expiresIn: Number(60 * 60 * 2), // sec * min * hrs = 2 hrs
  algorithm: "RS256",
  issuer: APP_NAME,
};

const JWT_VERIFY_OPTIONS: VerifyOptions = {
  algorithms: ["RS256"],
  issuer: APP_NAME,
};

export default {
  APP_NAME,
  NODE_ENV,
  PORT: Number(process.env["PORT"]) || config.get("PORT"),
  DATABASE_URL: process.env["DATABASE_URL"] || config.get("DATABASE_URL"),
  SSH: {
    PRIVATE_KEY: PRIVATE_KEY.split("/\\n/").join("\n"),
    PUBLIC_KEY: PUBLIC_KEY.split("/\\n/").join("\n"),
    PASS_PHRASE,
  },
  IS_DEV,
  IS_PROD,
  IS_STAG,
  JWT_SIGN_OPTIONS,
  JWT_VERIFY_OPTIONS,
};
