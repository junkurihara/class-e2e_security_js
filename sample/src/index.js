/**
 * index.js
 */
import {hello} from './hello.js';

export default {hello}; // both export and export default needs to be declared for compatibility on node and browser.
export {hello};