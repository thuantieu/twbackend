// import crypto from "crypto";
const crypto = require('crypto');
// import { generateKeyPairSync } from "crypto";
// import dotenv from "dotenv";
// dotenv.config();

// const algorithm = process.env.ALGORITHM;
// const secretKey = process.env.CRYPTO_KEY;

const encrypted = (text) => {
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv(process.env.ALGORITHM, process.env.CRYPTO_KEY, iv);

  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
  return {
    iv: iv.toString("hex"),
    content: encrypted.toString("hex"),
  };
};

const decrypted = (hash) => {
  const decipher = crypto.createDecipheriv(
    process.env.ALGORITHM,
    process.env.CRYPTO_KEY,
    Buffer.from(hash.iv, "hex")
  );

  const decrpyted = Buffer.concat([
    decipher.update(Buffer.from(hash.content, "hex")),
    decipher.final(),
  ]);

  return decrpyted.toString()

};

// const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
//   modulusLength: 2048, // the length of your key in bits
//   publicKeyEncoding: {
//     type: "spki", // recommended to be 'spki' by the Node.js docs
//     format: "pem",
//   },
//   privateKeyEncoding: {
//     type: "pkcs8", // recommended to be 'pkcs8' by the Node.js docs
//     format: "pem",
//   },
// });

module.exports = { encrypted, decrypted };
