import crypto from "crypto";

export function inputToHash(input: string) {
  return crypto.createHash("sha256").update(input).digest("hex");
}

export function inputToKey(input: string) {
  return crypto.createHash("sha256").update(input).digest();
}

export function outputToEncrypted(translation: string, key: Buffer) {
  const vector = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv("aes-256-cbc", key, vector);

  let output = cipher.update(translation, "utf8", "hex");

  output += cipher.final("hex");

  return { vector: vector.toString("hex"), output };
}

export function encryptedToOutput(vector: string, output: string, key: Buffer) {
  const buffer = Buffer.from(vector, "hex");
  const decipher = crypto.createDecipheriv("aes-256-cbc", key, buffer);

  let decrypted = decipher.update(output, "hex", "utf8");

  decrypted += decipher.final("utf8");

  return decrypted;
}
