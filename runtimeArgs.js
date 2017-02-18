var runtimeArgs = {}

var grepInvert = false
if (process.env.MOCHA_INVERT === ('true' || 1)){ //TODO: issue with =1
  grepInvert = true
}//

runtimeArgs.mochaOptions = {
  grep : process.env.MOCHA_GREP || false,
  grepInvert: grepInvert,
  reporter: process.env.MOCHA_REPORTER || 'tap',
}

export { runtimeArgs };
