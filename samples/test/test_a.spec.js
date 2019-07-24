import {getTestEnv} from './prepare.js';
const env = getTestEnv();
const hello = env.library;
const message = env.message;
const envName = env.envName;

describe(`${envName}: Test skeleton 1`, () => {
  before( async () => {
    console.log(message);
  });

  it('Test 1', async () => {
    const val = hello.hello();
    expect(val === 'hello world').to.be.true;
  });

});

