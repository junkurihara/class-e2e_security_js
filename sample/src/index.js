/**
 * index.js
 */
import {getMyData, postMyData} from './common/post-get';

const data = 'secret';
const key = 'test key';

postMyData(data, key)
  .then( (resPost) => {
    console.log(`Registered id: ${JSON.stringify(resPost)}`);
    return getMyData(resPost.id, key);
  })
  .then( (resGet) => {
    console.log(`Retrieved data: ${JSON.stringify(resGet)}`);
  });
