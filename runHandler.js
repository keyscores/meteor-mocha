import './lib/collections'
const fclone = require('fclone')
const _ = require('lodash')


https://github.com/odynvolk/map-keys-deep-lodash/blob/master/index.js
function renameKeysDeep(obj, cb) {
  if (_.isUndefined(obj)) {
    console.log('obj: ', obj);
    throw new Error(`map-keys-deep-lodash expects an object but got ${typeof obj}`);
  }

  obj = _.mapKeys(obj, cb);

  const res = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const val = obj[key];
      if (_.isObject(val)) {
        res[key] = renameKeysDeep(val, cb);
      } else {
        res[key] = val;
      }
    }
  }

  return res;
};

function runHandler(runner) {//

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

  var events = ['start', 'end', 'suite', 'suite end', 'test', 'test end', 'hook', 'hook end', 'pass', 'fail']

  _.each( events , function( eachEventName ){
    runner.on( eachEventName, Meteor.bindEnvironment(function( eventDoc ){

      // remove circular structures so we can persist as much of the raw data as possible
      var data = fclone( eventDoc )

      // TODO: better way to do this?
      // client generates errors due to the '$', on $ref and $events, need to rename.
      if(Meteor.isClient){
        if( data ){
          var data = renameKeysDeep( data , (value, key) => {
            if (key === "$ref") {
              return "ref";
            }
            if (key === "$events") {
              return "events";
            }
            return key;
          });
        }
      }

      MochaTestLogs.insert( { type: eachEventName , data: data } )

    }))
  })
}

export { runHandler }