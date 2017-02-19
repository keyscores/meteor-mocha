# dispatch:mocha

A Mocha test driver package for Meteor 1.3. This package reports server AND client test results in the server console and can be used for running tests on a CI server or locally. This achieves what `spacejam` does but without the need for a separate Node package.

## Installation

In a Meteor 1.3+ app directory:

```bash
meteor add dispatch:mocha
```

## Run app unit tests

If you do not have any tests in client code:

```bash
meteor test --once --driver-package dispatch:mocha
```

If you do have client tests, you'll need to specify which browser to use and install the necessary NPM packages. To do this, set the `TEST_BROWSER_DRIVER` environment variable. There are currently 3 supported browsers:

**Chrome**

```bash
$ npm i --save-dev selenium-webdriver@3.0.0-beta-2 chromedriver
$ TEST_BROWSER_DRIVER=chrome meteor test --once --driver-package dispatch:mocha
```

NOTE: Currently you must pin to exactly version 3.0.0-beta-2 of selenium-webdriver because the latest only works on Node 6.x

**Nightmare/Electron**

```bash
$ npm i --save-dev nightmare
$ TEST_BROWSER_DRIVER=nightmare meteor test --once --driver-package dispatch:mocha
```

**PhantomJS**

```bash
$ npm i --save-dev phantomjs-prebuilt
$ TEST_BROWSER_DRIVER=phantomjs meteor test --once --driver-package dispatch:mocha
```

### Run in watch mode

To run in watch mode, restarting as you change files, add `TEST_WATCH=1` before your test command and remove the `--once` flag.

NOTE: Watch mode does not properly rerun client tests if you change only client code. To work around this, you can add or remove whitespace from a server file, and that will trigger both server and client tests to rerun.

### Run in parallel

By default dispatch:mocha will run in series. This is a safety mechanism since running a client test and server test which depend on DB state may have side-effects.

If you design your client and server tests to not share state, then you can run tests faster.

Run in parallel simply by exporting the environment variable `TEST_PARALLEL=1` or `TEST_PARALLEL=true` before running.

### Run with a different server reporter

The default Mocha reporter for server tests is the "spec" reporter. You can set the `SERVER_TEST_REPORTER` environment variable to change it.

```bash
$ SERVER_TEST_REPORTER="dot" meteor test --once --driver-package dispatch:mocha
```

### Run with a different client reporter

The default Mocha reporter for client tests is the "spec" reporter. You can set the `CLIENT_TEST_REPORTER` environment variable to change it.

```bash
$ CLIENT_TEST_REPORTER="tap" meteor test --once --driver-package dispatch:mocha-phantomjs
```

Because of the differences between client and server code, not all reporters will work as client reporters. "spec" and "tap" are confirmed to work.

## NPM Scripts

A good best practice is to define these commands as run scripts in your app's `package.json` file. For example:

```json
"scripts": {
  "pretest": "npm run lint --silent",
  "test-chrome": "TEST_BROWSER_DRIVER=chrome meteor test --once --driver-package dispatch:mocha",
  "test-app-chrome": "TEST_BROWSER_DRIVER=chrome meteor test --full-app --once --driver-package dispatch:mocha",
  "test-phantom": "TEST_BROWSER_DRIVER=phantomjs meteor test --once --driver-package dispatch:mocha",
  "test-app-phantom": "TEST_BROWSER_DRIVER=phantomjs meteor test --full-app --once --driver-package dispatch:mocha",
  "test-watch": "TEST_BROWSER_DRIVER=chrome TEST_WATCH=1 meteor test --driver-package dispatch:mocha",
  "test-app-watch": "TEST_BROWSER_DRIVER=chrome TEST_WATCH=1 meteor test --full-app --driver-package dispatch:mocha",
  "lint": "eslint .",
  "start": "meteor run"
}
```

And then run `npm run test-chrome`, etc.
