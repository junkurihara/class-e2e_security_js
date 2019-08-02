import {makeApiCall} from '../common/comm';
import {mockDataUrl} from '../common/params';
import {strToBinaryKey} from '../common/key';

/**
 * Post data
 * @param data
 * @param key
 * @return {Promise<*>}
 */
const postMyData = async (data, key) => {
  ////////////////////////
  // TODO encrypt data here!!
  ////////////////////////
  console.log('no encryption at this point');
  const uint8Key = await strToBinaryKey(key, 32);
  console.log(`key data in binary: ${uint8Key.toString()}`);

  return makeApiCall({
    method: 'POST',
    requestUrl: mockDataUrl,
    payload: {data},
    headers: {'Content-Type': 'application/json'},
    mode: 'cors'
  });
};

////////////////////
// main
if(!process.argv[2]) throw new Error('No text input for post');
if(!process.argv[3]) console.error('Key is required for encryption');
console.log(`Data: ${process.argv[2]}`);
console.log(`Key: ${process.argv[3]}`);

postMyData(process.argv[2], process.argv[3]).then( (res) => {
  console.log(res);
});
