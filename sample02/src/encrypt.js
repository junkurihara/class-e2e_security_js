// Works both in Node.js and Browsers by using "jscu"

import jseu from 'js-encoding-utils';
import {getJscu} from './util/env';

/**
 * Encrypt data here
 * @param data {string} - plaintext data to be encrypted
 * @param key {Uint8Array} - 256bit key
 * @return {Promise<{data: *, iv: *}>}
 */
export const encrypt = async (data, key) => {
  const jscu = getJscu();

  const iv = jscu.random.getRandomBytes(16);
  const encrypted = await jscu.aes.encrypt(
    jseu.encoder.stringToArrayBuffer(data),
    key,
    {name: 'AES-CBC', iv}
  );

  return {
    data: jseu.encoder.encodeBase64(encrypted),
    iv: jseu.encoder.encodeBase64(iv)
  };
};

/**
 * Decrypt data
 * @param data {string} - encrypted data in base64
 * @param key {Uint8Array} - 256bit key
 * @param iv {string} - iv in base64
 * @return {Promise<*|void|Promise<void>|IDBRequest<IDBValidKey>|[]>}
 */
export const decrypt = async (data, key, iv) => {
  const jscu = getJscu();

  const decrypted = await jscu.aes.decrypt(
    jseu.encoder.decodeBase64(data),
    key,
    {name: 'AES-CBC', iv: jseu.encoder.decodeBase64(iv)}
  );

  return jseu.encoder.arrayBufferToString(decrypted);
};



/////////////////////////////
// pseudo simulation of aes ecb mode
const AESBLOCK = 16;
const SLICEBLOCK = AESBLOCK - 1; // work around...
//// DO NOT USE ECB MODE IN PRODUCTION
export const encryptECB = async (data, key) => {
  const jscu = getJscu();

  const iv = new Uint8Array([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
  const uint8data = jseu.encoder.stringToArrayBuffer(data);

  const blockNum = Math.ceil(uint8data.length/SLICEBLOCK);
  const plaintext = new Uint8Array( blockNum * SLICEBLOCK );
  uint8data.map( (u,i) => {plaintext[i]=u;});
  const encrypted = new Uint8Array( blockNum * AESBLOCK );

  for(let i = 0; i < blockNum; i++){
    const block = plaintext.slice(i * SLICEBLOCK, (i+1) * SLICEBLOCK);
    const x = await jscu.aes.encrypt(
      block,
      key,
      {name: 'AES-CBC', iv}
    );
    encrypted.set(x, i*AESBLOCK);
  }

  return {
    data: jseu.encoder.encodeBase64(encrypted)
  };
};

//// DO NOT USE ECB MODE IN PRODUCTION
export const decryptECB = async (data, key) => {
  const jscu = getJscu();

  const iv = new Uint8Array([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
  const encrypted = jseu.encoder.decodeBase64(data);

  const blockNum = encrypted.length/AESBLOCK;
  const decrypted = new Uint8Array( blockNum * SLICEBLOCK );

  for(let i = 0; i < blockNum; i++){
    const block = encrypted.slice(i*AESBLOCK, (i+1)*AESBLOCK);
    const x = await jscu.aes.decrypt(
      block,
      key,
      {name: 'AES-CBC', iv}
    );
    decrypted.set(x, i*SLICEBLOCK);
  }

  return {
    data: jseu.encoder.arrayBufferToString(decrypted)
  };
};
