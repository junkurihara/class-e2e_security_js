/**
 * index.js
 */
import {getMyData, postMyData} from './post-get';
import {generateBase64MasterSecret} from './derive-key';

export {getMyData, postMyData, generateBase64MasterSecret};
export default {getMyData, postMyData, generateBase64MasterSecret};
