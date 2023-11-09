import { pbkdf2Sync, randomBytes } from "crypto";

export function random(length: number = 16) {
  return randomBytes(length).toString("hex");
}

export function hashWithSalt(password: string, salt: string) {
  return pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);
}

export function hashPassword(password: string) {
  const salt = random();
  return {
    hash: hashWithSalt(password, salt),
    salt,
  };
}

export function verifyPassword(password: string, hash: string, salt: string) {
  const passwordHash = hashWithSalt(password, salt);
  return hash === passwordHash;
}
