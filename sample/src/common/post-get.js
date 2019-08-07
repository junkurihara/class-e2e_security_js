import {makeApiCall} from './comm';
import {mockDataUrl} from './params';
import {strToBinaryKey} from './key';
import jseu from 'js-encoding-utils';

import * as webapi from '../encrypt-browser';
import * as nodeapi from '../encrypt-node';

/**
 * Post data
 * @param data {string} - plaintext data to be encrypted
 * @param key {string} - the string password
 * @return {Promise<*>}
 */
export const postMyData = async (data, key) => {
  ////////////////////////
  // encrypt data here!!
  const keyObj = await strToBinaryKey(key, 32);
  console.log(`Note: Derived key binary in base64: ${jseu.encoder.encodeBase64(keyObj.key)}`);
  const encryptedObj = (typeof window !== 'undefined')
    ? await webapi.encrypt(data, keyObj.key)
    : await nodeapi.encrypt(data, keyObj.key);
  ////////////////////////

  const response = await makeApiCall({
    method: 'POST',
    requestUrl: mockDataUrl,
    payload: {data: encryptedObj.data, iv: encryptedObj.iv, salt: keyObj.salt},
    headers: {'Content-Type': 'application/json'},
    mode: 'cors'
  });

  return {id: response.id};
};


/**
 * Get data
 * @param dataId - id registered in the json server
 * @param key {string} - the string password
 * @return {Promise<*>}
 */
export const getMyData = async (dataId, key) => {
  const data = await makeApiCall({
    method: 'GET',
    requestUrl: `${mockDataUrl}/${dataId}`,
    headers: {'Content-Type': 'application/json'},
    mode: 'cors'
  });

  ////////////////////////
  // decryption data here!!
  const keyObj = await strToBinaryKey(key, 32, data.salt);
  console.log(`Note: Derived key binary in base64: ${jseu.encoder.encodeBase64(keyObj.key)}`);
  const decrypted = (typeof window !== 'undefined')
    ? await webapi.decrypt(data.data, keyObj.key, data.iv)
    : await nodeapi.decrypt(data.data, keyObj.key, data.iv);
  ////////////////////////

  return {data: decrypted};
  ////////////////////////
};

/**
 * Get all entries without decryption
 * @return {Promise<*>}
 */
export const getAllEntries = async () => makeApiCall({
  method: 'GET',
  requestUrl: `${mockDataUrl}`,
  headers: {'Content-Type': 'application/json'},
  mode: 'cors'
});
