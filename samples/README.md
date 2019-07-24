Project Skeleton for JavaScript 'Universal' Library Development for Node.js and Browsers
--

> **WARNING**: At this time this solution should be considered suitable for research and experimentation, further code and security review is needed before utilization in a production application.

# Usage
Just clone this repo, remove `.git`, and edit `package.json`, `webpack.dev.js`, `webpack.prod.js`, `karma.conf.js` and whatever for your project. The simplest way is editing only `webpack.common.js` which defines the library name and library entry point.

## Npm commands
By specifying `:bundled` as a suffix of each test commands, i.e, `test` and `karma`, the test would be done with the **bundled library** `dist/testlib.bundled.js`. Note that by plain commands, tests will be executed by importing from `src/index.js`. These tests should be done considering use cases of public library. Namely, the universal library is expected to be used by various ways of importing and executing, like ones from babel-ed sources (`dist/index.js`), from one bundle file (`dist/testlib.bundle.js`), on Node.js, and on browsers through a certain bundlers. Also you can test the case where the bundled library is imported as a part of `window`, i.e., `window.testlib`.

```shell
// Test for node.js with mocha.
$ npm run test
$ npm run test:bundle // test with `dist/testlib.bundle.js`
 
// Test for browsers (headless chrome) with Karma.
$ npm run karma
$ npm run karma:bundle // test with `dist/testlib.bundle.js`
$ npm run karma:window // test with `window.testlib`

// Generate bandled test files (not library) for compatibility test on various browsers.
// open ./test/html/test.html with your intended browser after executing this command.
// This generate test-bundles simultaneously from `src/index.js`, `dist/testlib.bundle.js`
// and `window.testlib`.
$ npm run html

// Execute babel and output transpiled JS files to ./dist,
// and create their bandle file via webpack.
// This also removes console.log in source codes.
$ npm run build
```

## Following GitFlow and NPM semantic versioning
To follow the workflow and NPM semantic version rule, we implemented some scripts in `package.json`. By using the scripts, you can easily follow the workflow.

1. Execute `npm run flow:version [patch|minor|major]` to bump the version of the package. This does not commit to your git repo.

2. Commit the current change in **develop branch**.

3. Execute `npm run release:start` that checks if the version can be published in NPM, and kicks the GitFlow release procedure.

4. Prepare the release as the standard GitFlow release one.

5. Execute `npm run release:finish` to finalize the GitFlow release operation.

Additionally `npm run release:push` executes `git push --all` and `git push origin <the version number>`.

# License
Licensed under the MIT license, see `LICENSE` file.