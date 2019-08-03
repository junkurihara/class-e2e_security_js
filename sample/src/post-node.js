import {postMyData} from './common/post-get';

////////////////////
// main
if(!process.argv[2]) throw new Error('No text input for post');
if(!process.argv[3]) console.error('Key is required for encryption');
console.log(`Data: ${process.argv[2]}`);
console.log(`Key: ${process.argv[3]}`);

postMyData(process.argv[2], process.argv[3]).then( (res) => {
  console.log(`Registered id: ${res.id}`);
});
