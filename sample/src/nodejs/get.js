import {makeApiCall} from '../common/comm';
import {mockDataUrl} from '../common/params';
import {strToBinaryKey} from '../common/key';

/**
 * Get data
 * @param dataId
 * @param key
 * @return {Promise<*>}
 */
const getMyData = async (dataId, key) => {
  const data = await makeApiCall({
    method: 'GET',
    requestUrl: `${mockDataUrl}/${dataId}`,
    headers: {'Content-Type': 'application/json'},
    mode: 'cors'
  });

  ////////////////////////
  // TODO decryption data here!!
  ////////////////////////
  console.log('no decryption at this point');
  const uint8Key = await strToBinaryKey(key, 32);
  console.log(`key data in binary: ${uint8Key.toString()}`);

  const decrypted = data.data;
  console.log(data);
  return decrypted;
};

////////////////////
// main
if(!process.argv[2]) throw new Error('No data id input for get');
if(!process.argv[3]) console.error('Key is required for decryption');
console.log(`Data Id: ${process.argv[2]}`);
console.log(`Key: ${process.argv[3]}`);

getMyData(process.argv[2], process.argv[3]).then( (res) => {
  console.log(res);
});
