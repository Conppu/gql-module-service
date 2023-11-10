import { pbkdf2Sync, generateKeySync } from "crypto";

export function hashPasswordWithSalt(password: string, salt: string) {
  return pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);
}

export function generatePasswordHash(password: string) {
  const salt = generateKeySync("hmac", { length: 512 })
    .export()
    .toString("hex");

  return {
    hash: hashPasswordWithSalt(password, salt),
    salt,
  };
}

export function verifyPasswordHash(
  password: string,
  hash: string,
  salt: string,
) {
  const passwordHash = hashPasswordWithSalt(password, salt);
  return hash === passwordHash;
}
