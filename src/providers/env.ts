import "dotenv/config";

const NODE_ENV = process.env["NODE_ENV"] || "development";

const isDevelopment = NODE_ENV === "development";
const isProduction = NODE_ENV === "production";
const isStaging = NODE_ENV === "staging";

const PORT = Number(process.env["PORT"]) || Number(4000);
const DATABASE_URL = process.env["DATABASE_URL"];

// SSH KEY PAIR
const PUBLIC_KEY = process.env["PUBLIC_KEY"] || "";
const PRIVATE_KEY = process.env["PRIVATE_KEY"] || "";
const PASS_PHRASE = process.env["PASS_PHRASE"] || "";

export default {
  NODE_ENV,
  PORT,
  DATABASE_URL,
  SSH: {
    PUBLIC_KEY,
    PRIVATE_KEY,
    PASS_PHRASE,
  },
  isDevelopment,
  isProduction,
  isStaging,
};
