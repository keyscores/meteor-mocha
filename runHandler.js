import './lib/collections'
const fclone = require('fclone')
const cycle = require('cycle')

function runHandler(runner) {

  // Handle all moch runner events, and persist the raw output to db, use by ad hoc reporters.

  //http://stackoverflow.com/questions/18660916/how-can-i-subscribe-to-mocha-suite-events
  // *   - `start`  execution started
  // *   - `end`  execution complete
  // *   - `suite`  (suite) test suite execution started
  // *   - `suite end`  (suite) all tests (and sub-suites) have finished
  // *   - `test`  (test) test execution started
  // *   - `test end`  (test) test completed
  // *   - `hook`  (hook) hook execution started
  // *   - `hook end`  (hook) hook complete
  // *   - `pass`  (test) test passed
  // *   - `fail`  (test, err) test failed

  // var startListeners = function(){
    // var events = ['start', 'end', 'suite', 'suite end', 'test', 'test end', 'hook', 'hook end', 'pass', 'fail']
    //
    // _.each( events , function( eachEventName ){
    //   runner.on( eachEventName, Meteor.bindEnvironment(function( eventDoc ){
    //     MochaTestLogs.insert( { type: eachEventName , data: fclone( eventDoc ) } )
    //   }))
    // })


    runner.on( 'test end', Meteor.bindEnvironment(function( eventDoc ){

      // var a = fclone( eventDoc )
      // console.log( a);
      MochaTestLogs.insert( { type: 'test' , data: cycle.decycle( eventDoc ) } )
    }))
}

export { runHandler }
