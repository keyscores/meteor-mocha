var runtimeArgs = {}

var grepInvertgrepInvert
if ( process.env.MOCHA_INVERT == 'false' || 0 ){
  grepInvert = false
}else{
  grepInvert = true
}

runtimeArgs.mochaOptions = {
  grep : process.env.MOCHA_GREP,
  grepInvert: grepInvert,
  reporter: process.env.MOCHA_REPORTER || 'tap',
}

export { runtimeArgs };
