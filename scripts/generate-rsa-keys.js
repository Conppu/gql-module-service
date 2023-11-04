/* eslint-disable no-undef */
import { Command } from "commander";
import { generateKeyPair } from "crypto";
import { readFileSync, writeFileSync, existsSync, copyFile } from "fs";
import { EOL } from "os";
import { resolve } from "path";

const startStr = "# =====KEY PAIR START=====";
const endStr = "# =====KEY PAIR END=====";

const program = new Command();

const envPath = resolve(".env");
const envExamplePath = resolve(".env.local");

const options = program
  .helpOption("-h, --help", "help message")
  .option("-p, --passphrase <string>", "provide a valid passphrase")
  .parse(process.argv)
  .opts();

async function setEnvValues(input) {
  if (!existsSync(envPath)) {
    writeFileSync(envPath, "");
  }
  // read file from hdd & split if from a linebreak to a array
  let ENV_VARS = readFileSync(envPath, "utf8").split(EOL);

  const startIndex = ENV_VARS.indexOf(startStr);
  const endIndex = ENV_VARS.indexOf(endStr);

  if (startIndex >= 0 && endIndex >= 0) {
    ENV_VARS = [
      ...ENV_VARS.slice(0, startIndex),
      ...ENV_VARS.slice(endIndex + 1, ENV_VARS.length),
    ];

    ENV_VARS.push(startStr);
    // find the env we want based on the key
    Object.keys(input).forEach((key) => {
      ENV_VARS.push(`${key}=${input[key]}`);
    });
    ENV_VARS.push(endStr);

    // write everything back to the file system
    writeFileSync(envPath, ENV_VARS.join(EOL));
    return console.log("KEY PAIR ADDED TO THE .ENV FILE ✅ ✅ ✅");
  } else {
    console.error("❌ ❌ ERROR :: KEY PAIR START/END NOT FOUND ❌ ❌");
  }
}

async function generateKeys() {
  // The `generateKeyPairSync` method accepts two arguments:
  // 1. The type ok keys we want, which in this case is "rsa"
  // 2. An object with the properties of the key
  generateKeyPair(
    "rsa",
    {
      // The standard secure default length for RSA keys is 2048 bits
      modulusLength: 2048, // 4096
      // namedCurve: 'secp256k1',
      publicKeyEncoding: {
        type: "pkcs1", // spki
        format: "pem",
      },
      privateKeyEncoding: {
        // first of a family of standards called Public-Key Cryptography Standards
        type: "pkcs1", // pkcs8
        format: "pem",
        // set of rules used to encode the information
        cipher: "aes-256-cbc",
        // tell you how to arrange those rules
        passphrase: options.passphrase || "",
      },
    },
    async (error, publicKey, privateKey) => {
      if (error) {
        console.error("❌ ❌ ", error, " ❌ ❌");
        process.exit(0);
      }

      await setEnvValues({
        PUBLIC_KEY: `"${publicKey}"`,
        PRIVATE_KEY: `"${privateKey}"`,
        PASS_PHRASE: options.passphrase ? `"${options.passphrase}"` : '""',
      });
      process.exit(0);
    },
  );
}

(async function () {
  if (!existsSync(envPath)) {
    return copyFile(envExamplePath, envPath, generateKeys);
  } else {
    return generateKeys();
  }
})();
