// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const {checkContext, getItems, replaceItems} = require('feathers-hooks-common');
const {inspector, cloneObject, isString, isObject} = require('../plugins/lib');
const debug = require('debug')('app:normalize.all.hook');

const isLog = false;
const isDebug = false;

/**
 * Base normalize
 * @param records
 * @return {*}
 */
const baseNormalize = (records) => {
  if (Array.isArray(records)) {
    let _records = [];
    records.forEach(record => {
      _records.push(cloneObject(record));
    });
    return _records;
  } else {
    return cloneObject(records);
  }
};

/**
 * User normalize
 * @param record
 * @return {*}
 */
const userNormalize = (record) => {
  // Normalize -> verifyExpires/resetExpires
  if(record.verifyExpires === null){
    record.verifyExpires = 0;
  }else {
    if(isObject(record.verifyExpires)){
      record.verifyExpires = Date.parse(record.verifyExpires.toJSON());
    }
    if(isString(record.verifyExpires)){
      record.verifyExpires = Date.parse(record.verifyExpires);
    }
  }
  if(record.resetExpires === null){
    record.resetExpires = 0;
  }else {
    if(isObject(record.resetExpires)){
      record.resetExpires = Date.parse(record.resetExpires.toJSON());
    }
    if(isString(record.resetExpires)){
      record.resetExpires = Date.parse(record.resetExpires);
    }
  }
  return record;
};

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {

  // Return the actual hook.
  return async (context) => {
    // Throw if the hook is being called from an unexpected location.
    checkContext(context, null, ['find', 'get', 'create', 'update', 'patch', 'remove']);

    // Get the authenticated user.
    // eslint-disable-next-line no-unused-vars
    const {user} = context.params;
    // Get the record(s) from context.data (before), context.result.data or context.result (after).
    // getItems always returns an array to simplify your processing.
    let records = getItems(context);

    /*
    Modify records and/or context.
     */
    if (records) {
      if (isDebug) debug(`${context.type} app.service('${context.path}').${context.method}()`);
      if (isLog) inspector('Before normalize query:', records);
      records = baseNormalize(records);
      switch (`${context.type}.${context.path}`) {
      case 'after.users':
        if (Array.isArray(records)) {
          let _records = [];
          records.forEach(record => {
            _records.push(userNormalize(record));
          });
          records = _records;
        } else {
          records = userNormalize(records);
        }
        break;
      default:
        // code block
      }
      if (isLog) inspector('After normalize query:', records);
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
