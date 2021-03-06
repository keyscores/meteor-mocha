import './browser-shim.js';
import { mocha } from './core/client';
import './lib/collections';
import { runHandler } from './runHandler';
import './webreporter/webreporter'

// Run the client tests. Meteor calls the `runTests` function exported by
// the driver package on the client.
function runTests() {//
  // We need to set the reporter when the tests actually run. This ensures that the
  // correct reporter is used in the case where `dispatch:mocha-browser` is also
  // added to the app. Since both are testOnly packages, top-level client code in both
  // will run, potentially changing the reporter.

  Meteor.subscribe("mochaTestLogs", {
    onReady: function () {
      var runtimeArgs = Meteor.settings.public.runtimeArgs
      if (runtimeArgs.mochaOptions.grep) { mocha.grep(runtimeArgs.mochaOptions.grep) }
      if (runtimeArgs.mochaOptions.invert) { mocha.options.invert = runtimeArgs.mochaOptions.invert }

      let clientReporter  = runtimeArgs.mochaOptions.reporter
      if (runtimeArgs.mochaOptions.clientReporter){
       clientReporter  = runtimeArgs.mochaOptions.clientReporter
      }
      mocha.reporter(clientReporter);

      // These `window` properties are all used by the client testing script in the
      // browser-tests package to know what is happening.
      window.testsAreRunning = true;
      var runner = mocha.run(failures => {
       window.testsAreRunning = false;
       window.testFailures = failures;
       window.testsDone = true;
      });//

      runHandler( runner )
    },
    onError: function () {
     console.log("onError mochaTestLogs");
    }
  })
}

export { runTests };
