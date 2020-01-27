// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const {checkContext, getItems, replaceItems} = require('feathers-hooks-common');
const {inspector, isString, isObject, isNumber, isNull} = require('../plugins/lib');
const debug = require('debug')('app:hooks.normalize');

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
      const cloneObject = JSON.parse(JSON.stringify(record));
      _records.push(cloneObject);
    });
    return _records;
  } else {
    return JSON.parse(JSON.stringify(records));
  }
};

/**
 * User normalize
 * @param record
 * @return {*}
 */
const userNormalize = (type, record) => {
  let date;
  //==== BEFORE ===//
  if(type === 'before'){
    //--- Normalize -> verifyExpires Date ---
    if(isNull(record.verifyExpires)){
      date = new Date(0);
      record.verifyExpires = date.toJSON();
    }
    if(isNumber(record.verifyExpires)){
      date = new Date(record.verifyExpires);
      record.verifyExpires = date.toJSON();
    }
    if(isObject(record.verifyExpires)){
      record.verifyExpires = record.verifyExpires.toJSON();
    }
    if(isString(record.verifyExpires)){
      date = new Date(record.verifyExpires);
      record.verifyExpires = date.toJSON();
    }

    //--- Normalize -> resetExpires  Date ---
    if(isNull(record.resetExpires)){
      date = new Date(0);
      record.resetExpires = date.toJSON();
    }
    if(isNumber(record.resetExpires)){
      date = new Date(record.resetExpires);
      record.resetExpires = date.toJSON();
    }
    if(isObject(record.resetExpires)){
      record.resetExpires = record.resetExpires.toJSON();
    }
    if(isString(record.resetExpires)){
      date = new Date(record.resetExpires);
      record.resetExpires = date.toJSON();
    }
    //--- Normalize -> verifyToken ---
    if(isNull(record.verifyToken)){
      record.verifyToken = '';
    }
    //--- Normalize -> verifyShortToken ---
    if(isNull(record.verifyShortToken)){
      record.verifyShortToken = '';
    }
    //--- Normalize -> resetToken ---
    if(isNull(record.resetToken)){
      record.resetToken = '';
    }
    //--- Normalize -> resetShortToken ---
    if(isNull(record.resetShortToken)){
      record.resetShortToken = '';
    }
  }
  //==== AFTER ===//
  if(type === 'after'){
    //--- Normalize -> verifyExpires  Date ---
    if(isNull(record.verifyExpires)){
      record.verifyExpires = 0;
    }
    if(isObject(record.verifyExpires)){
      record.verifyExpires = Date.parse(record.verifyExpires.toJSON());
    }
    if(isString(record.verifyExpires)){
      record.verifyExpires = Date.parse(record.verifyExpires);
    }
    //--- Normalize -> resetExpires  Date ---
    if(isNull(record.resetExpires)){
      record.resetExpires = 0;
    }
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
      //==== AFTER ===//
      if(context.type === 'after'){
        records = baseNormalize(records);
      }
      //==== BEFORE/AFTER ===//
      switch (context.path) {
      case 'users':
        if (Array.isArray(records)) {
          let _records = [];
          records.forEach(record => {
            _records.push(userNormalize(context.type, record));
          });
          records = _records;
        } else {
          records = userNormalize(context.type, records);
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
