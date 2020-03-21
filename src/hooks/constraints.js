// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// const {checkContext, getItems, replaceItems} = require('feathers-hooks-common');
const {getItems, replaceItems} = require('feathers-hooks-common');
const {inspector, AuthServer, HookHelper, servicesConstraint} = require('../plugins');
// const HookHelper = require('./hook-helper.class');
const debug = require('debug')('app:hooks.constraints');

const isDebug = false;
const isLog = false;

// eslint-disable-next-line no-unused-vars
module.exports = function (isTest = false) {

  // Return the actual hook
  return async (context) => {
    // Get the record(s) from context.data (before), context.result.data or context.result (after).
    // getItems always returns an array to simplify your processing.
    let records = getItems(context);

    /*
    Modify records and/or context.
     */
    const isCheck = isTest ? true : !AuthServer.isTest();
    if(isDebug) debug('isCheck:', isCheck);

    if (isCheck) {
      // Create HookHelper object
      const hh = new HookHelper(context);
      // Show debug info
      hh.showDebugInfo('', isLog);
      hh.showDebugRecords('', isLog);

      // hookHelper.showDebugInfo('authentication.create.after', true);

      records = await servicesConstraint(context);
      if(isLog)inspector('hooks.constraints.records:', records);
    }

    // Place the modified records back in the context.
    replaceItems(context, records);
    // Best practice: hooks should always return the context.
    return context;
  };
};

// Throw to reject the service call, or on an unrecoverable error.
// eslint-disable-next-line no-unused-vars
function error(msg) {
  throw new Error(msg);
}
