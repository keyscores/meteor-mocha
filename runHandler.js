// import { runner } from './server'
//
// if(Meteor.isServer){//
//   Meteor.startup(function(){
//     var testsPassed = 0;
//
//     var onTestPassedHandler = function(e){
//       testsPassed++;
//       console.log('e', e);
//       console.log("onTestPassedHandler - title: " + e.title + " - total:" + testsPassed);
//     };
//
//     runner.on("pass", onTestPassedHandler);
//   });
// }

function runHandler(runner) {
  // mocha.reporters.Base.call(this, runner);
  var passes = 0;
  var failures = 0;

  runner.on('pass', function(test){
    passes++;
    console.log('pass: %s', test.fullTitle());
  });

  runner.on('fail', function(test, err){
    failures++;
    console.log('fail: %s -- error: %s', test.fullTitle(), err.message);
  });

  runner.on('end', function(){
    console.log('end: %d/%d', passes, passes + failures);
  });
}

export { runHandler }
