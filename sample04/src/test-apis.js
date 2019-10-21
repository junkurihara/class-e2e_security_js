import jseu from 'js-encoding-utils';

import {getJscu} from './util/env';

/**
 * Get Hash
 * @param data {string}
 * @param hash {'SHA-256'|'SHA-384'|'SHA-512'|'SHA3-256'|'SHA3-384'|'SHA3-512'}
 * @return {Promise<Uint8Array>}
 */
export const genHash = (data, hash = 'SHA-256') => {
  const jscu = getJscu();
  const binary = jseu.encoder.stringToArrayBuffer(data);

  return jscu.hash.compute(binary, hash);
};
