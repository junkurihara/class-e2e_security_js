/**
 * index.js
 */
import {getMyData, postMyData} from './post-get';
import {generateBase64MasterSecret} from './derive-key';
import {encryptECB, decryptECB} from './encrypt';

export {getMyData, postMyData, generateBase64MasterSecret, encryptECB, decryptECB};
export default {getMyData, postMyData, generateBase64MasterSecret, encryptECB, decryptECB};
