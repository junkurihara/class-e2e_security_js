import {getMyData} from './common/post-get';

////////////////////
// main
if(!process.argv[2]) throw new Error('No data id input for get');
if(!process.argv[3]) console.error('Key is required for decryption');
console.log(`Data Id: ${process.argv[2]}`);
console.log(`Key: ${process.argv[3]}`);

getMyData(process.argv[2], process.argv[3]).then( (res) => {
  console.log(`Decrypted string: ${res.data}`);
});
