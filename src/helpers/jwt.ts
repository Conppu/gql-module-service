import jwt from "jsonwebtoken";
import { Context } from "../types/context.js";

export function encodeJWT(
  context: Context,
  payload: object,
): string | undefined {
  const { SSH, JWT_SIGN_OPTIONS } = context.configs;
  const { PRIVATE_KEY, PASS_PHRASE } = SSH;

  try {
    return jwt.sign(
      payload,
      {
        key: PRIVATE_KEY,
        passphrase: PASS_PHRASE,
      },
      JWT_SIGN_OPTIONS,
    );
  } catch (error) {
    context.logger.debug("Error on JWT sign process", error);
    return undefined;
  }
}

export function decodeJWT(context: Context, token: string): object | string {
  const { SSH, JWT_VERIFY_OPTIONS } = context.configs;
  const { PUBLIC_KEY } = SSH;

  try {
    const decoded: any = jwt.verify(token, PUBLIC_KEY, JWT_VERIFY_OPTIONS);
    return decoded;
  } catch (error) {
    context.logger.debug("Error on JWT verify process", error);
    if (error instanceof Error) {
      return error.message.replace(" ", "_").toUpperCase();
    }
    return "INVALID_JWD_TOKEN";
  }
}
