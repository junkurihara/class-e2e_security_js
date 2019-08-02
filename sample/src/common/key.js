import {getJscu} from './env';

export const strToBinaryKey = async (str, len) => {
  const jscu = getJscu();

  // derive key from password
  // following params (salt, iterationCount, aesKeyLen, hash) must be shared with receiver.
  const salt = jscu.random.getRandomBytes(32); // Uint8Array -> must be shared with receiver
  const iterationCount = 2048; // must be shared with receiver
  const hash = 'SHA-256'; // SHA-384, SHA-512, etc.

  return jscu.pbkdf.pbkdf2(
    str,
    salt,
    iterationCount,
    len,
    hash
  ).catch( (e) => {
    throw new Error(`failed to derive binary key from string key: ${e.message}`);
  });
};
