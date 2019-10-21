#!/usr/bin/env node

import {genHash} from './test-apis';
import pgm from 'commander';
import jseu from 'js-encoding-utils';

pgm.version('0.0.1');

pgm
  .command('gen-hash <data>', '')
  .description('Generate hash')
  .option('-h, --hash <hash>', 'Name of hash function like \'SHA-256\'', 'SHA-256')
  .action( async (data, options) => {
    // get Hash
    const hashedData = await genHash(data, options.hash);
    console.log(`<Computed Hash>\n${jseu.encoder.arrayBufferToHexString(hashedData)}\n=======\n`);
  });


pgm.parse(process.argv);
