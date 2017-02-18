var runtimeArgs = {}

var grepInvert = false
if (process.env.MOCHA_INVERT === 'true' || process.env.MOCHA_INVERT === "1"){
  grepInvert = true
}

var runClient = true
if (process.env.TEST_CLIENT === 'false' || process.env.TEST_CLIENT === "0"){
  runClient = false
}

var runServer = true
if (process.env.TEST_SERVER === 'false' || process.env.TEST_SERVER === "0"){
  runServer = false
}

runtimeArgs.runnerOptions = {
  runClient: runClient,
  runServer: runServer,
  reporter: process.env.TEST_REPORTER || 'spec',
  serverReporter: process.env.SERVER_TEST_REPORTER,
  clientReporter: process.env.CLIENT_TEST_REPORTER,
  browserDriver: process.env.TEST_BROWSER_DRIVER,
  testWatch: process.env.TEST_WATCH
}

runtimeArgs.mochaOptions = {
  grep : process.env.MOCHA_GREP || false,
  grepInvert: grepInvert,
  reporter: process.env.MOCHA_REPORTER || 'tap',
}

export { runtimeArgs };
