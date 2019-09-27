/**
 * index.js
 */
import {ecKeyGen, rsaKeyGen, rsaOaepDecrypt, rsaOaepEncrypt} from './test-apis';
import {deriveKeyFromMasterSecret} from './derive-key';
import {encryptAES, decryptAES} from './encryptAES';

export {encryptAES, decryptAES, ecKeyGen, rsaKeyGen, rsaOaepDecrypt, rsaOaepEncrypt, deriveKeyFromMasterSecret};
export default {encryptAES, decryptAES, ecKeyGen, rsaKeyGen, rsaOaepDecrypt, rsaOaepEncrypt, deriveKeyFromMasterSecret};
