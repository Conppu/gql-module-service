import jwt, { SignOptions, VerifyOptions } from "jsonwebtoken";
import configs from "../providers/configs.js";
import logger from "./logger.js";

const { PRIVATE_KEY, PUBLIC_KEY, PASS_PHRASE } = configs.SSH;

const signOptions: SignOptions = {
  expiresIn: Number(60 * 60 * 2), // sec * min * hrs = 2 hrs
  algorithm: "RS256",
  issuer: configs.APP_NAME,
};

const verifyOptions: VerifyOptions = {
  algorithms: ["RS256"],
  issuer: configs.APP_NAME,
};

export function encodeJWT(payload: object): string | undefined {
  try {
    return jwt.sign(
      payload,
      {
        key: PRIVATE_KEY,
        passphrase: PASS_PHRASE,
      },
      signOptions,
    );
  } catch (error) {
    logger.verbose("JWT", `Error on JWT sign process`, payload, error);
    return undefined;
  }
}

export function decodeJWT(token: string): object | string {
  try {
    const decoded: any = jwt.verify(token, PUBLIC_KEY, verifyOptions);
    return decoded;
  } catch (error) {
    logger.verbose("JWT", `Error on JWT verify process`, token, error);
    if (error instanceof Error) {
      return error.message;
    }
    return "INVALID_JWD_TOKEN";
  }
}
