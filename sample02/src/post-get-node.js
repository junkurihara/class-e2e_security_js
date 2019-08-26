#!/usr/bin/env node

import {postMyData, getMyData} from './post-get';
import pgm from 'commander';
import {generateBase64MasterSecret} from './derive-key';
import {encryptECB, encrypt} from './encrypt';
import {getJscu} from './util/env';
import jseu from 'js-encoding-utils';


pgm.version('0.0.1');

/// for post
pgm
  .command('post <data>', '')
  .description('Post data to json-server')
  .option('-p, --password <password>', 'String password for encryption')
  .option('-m, --masterSecret <masterSecret>', 'Base64 encoded master secret binary')
  .option('-h, --hash <hash>', 'Hash algorithm for key derivation', 'SHA-256')
  .option('-i, --iterationCount <iterationCount>', 'Iteration count for password-based key derivation', 2048)
  .option('-r, --remote', 'Register to remote server (zettant.com)')
  .action(async (data, options) => {
    if(!options.password && !options.masterSecret) {
      console.error('Either string password or Base64-encoded master secret is required for encryption');
      process.exit(1);
    }
    console.log(`> Register encrypted data to ${(options.remote)? 'remote':'local'} server`);
    console.log(`> Data: ${data}`);
    if(options.password) console.log(`> Password: ${options.password}`);
    else console.log(`> Master secret: ${options.masterSecret}`);
    ////////////////////////
    // Derive key then encrypt
    const params = Object.assign(
      { data, remote: options.remote, hash: options.hash },
      (options.password)
        ? {password: options.password, iterationCount: options.iterationCount} : {masterSecret: options.masterSecret}
    );
    const res = await postMyData(params);
    console.log(`> Registered id: ${res.id}`);
  });

/// for get
pgm
  .command('get <id>', '')
  .description('Get data from json-server')
  .option('-p, --password <password>', 'String password for decryption')
  .option('-m, --masterSecret <masterSecret>', 'Base64 encoded master secret binary')
  .option('-r, --remote', 'Retrieve from remote server (zettant.com)')
  .action(async (id, options) => {
    if(!options.password && !options.masterSecret) {
      console.error('Either string password or Base64-encoded master secret is required for decryption');
      process.exit(1);
    }
    console.log(`> Retrieve encrypted data to ${(options.remote)? 'remote':'local'} server`);
    console.log(`> Id: ${id}`);
    if(options.password) console.log(`> Password: ${options.password}`);
    else console.log(`> Master secret: ${options.masterSecret}`);

    // Derive key then decrypt
    const params = Object.assign(
      { id, remote: options.remote },
      (options.password) ? {password: options.password} : {masterSecret: options.masterSecret}
    );
    const res = await getMyData(params);
    console.log(`> Decrypted data: ${res.data}`);
  });


/// for generate master secret encoded in Base64
pgm
  .command('gen-secret <len>', '')
  .description('Generate master secret')
  .action((len) => {
    if(!len) {
      console.error('length of master secret in bytes is required');
      process.exit(1);
    }
    const res = generateBase64MasterSecret(parseInt(len));
    console.log(`> Generated master secret in Base64: ${res}`);
  });

/// weak ecb mode simulation
pgm
  .command('aes-mode-compare', '')
  .description('AES-ECB/CBC simulation, check the encrypted binary occurrence.')
  .action(async () => {
    const jscu = getJscu();

    const ecbKey = jscu.random.getRandomBytes(32);
    const ecbData = '0000000000000000000000000000000000000000000000';
    console.log(`AES-ECB/CBC simulation key (Base64): ${jseu.encoder.encodeBase64(ecbKey)}`);
    console.log(`AES-ECB/CBC simulation data (Hex): ${jseu.encoder.arrayBufferToHexString(jseu.encoder.stringToArrayBuffer(ecbData))}`);
    const ecb = await encryptECB(ecbData, ecbKey);
    console.log(`AES-ECB encrypted data (Hex): ${jseu.encoder.arrayBufferToHexString(jseu.encoder.decodeBase64(ecb.data))}`);
    const cbc = await encrypt(ecbData, ecbKey);
    console.log(`AES-CBC encrypted data (Hex): ${jseu.encoder.arrayBufferToHexString(jseu.encoder.decodeBase64(cbc.data))}`);
  });


pgm.parse(process.argv);
