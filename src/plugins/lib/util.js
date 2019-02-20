
const { join } = require('path');
const debug = require('debug')('app:util');
const appRoot = join(__dirname, '../../../');

/**
 * Delay time
 * @param sec
 * @return {Promise}
 */
const delayTime = function (sec = 1) {
  return new Promise(function (resolve) {
    setTimeout(() => {
      debug(`delayTime: ${sec * 1000} MSec`);
      resolve('done!');
    }, sec * 1000);
  });
};

/**
 * Strip slashes
 * @param name String
 * @return {XML|string|*|void}
 */
const stripSlashes = function (name) {
  return name.replace(/^(\/*)|(\/*)$/g, '');
};

/**
 * Parse bool
 * @param b String|Any
 * @return boolean
 */
const parseBool = function (b) {
  return !(/^(false|0)$/i).test(b) && !!b;
};

/**
 * Is true
 * @param value String|Any
 * @return boolean
 */
const isTrue = function (value) {
  if (typeof(value) === 'string') {
    value = value.trim().toLowerCase();
  }
  switch (value) {
  case true:
  case 'true':
  case 1:
  case '1':
  case 'on':
  case 'yes':
    return true;
  default:
    return false;
  }
};


/**
 * Inspector to display objects
 * @param desc
 * @param obj
 * @param depth
 */
const inspector = function (desc, obj, depth = 6) {
  const {inspect} = require('util');
  console.log(`\n${desc}`);
  console.log(inspect(obj, {depth, colors: true}));
};

/**
 * Query params
 * @param obj
 * @returns {string}
 */
const qlParams = function (obj) {
  if (typeof obj !== 'object' || obj === null) {
    throw new Error('Expected object. (qlParams)');
  }

  return stringify(obj, undefined, undefined, '', '');
};

/**
 * Stringify to represent an object as a string
 * @param obj
 * @param spacer
 * @param separator
 * @param leader
 * @param trailer
 * @returns {string}
 */
const stringify = function (obj, spacer = ' ', separator = ', ', leader = '{', trailer = '}') {
  if (typeof obj !== 'object' || Array.isArray(obj)) {
    return JSON.stringify(obj);
  }

  const str = Object
    .keys(obj)
    .map(key => `${key}:${spacer}${stringify(obj[key], spacer, separator)}`)
    .join(', ');

  return `${leader}${str}${trailer}`;
};

const logHookContext = function (context) {
  let target = {};
  let {path, method, type, params, id, data, result, dispatch, statusCode, error, grapql} = context;

  if (path) target.path = path;
  if (method) target.method = method;
  if (type) target.type = type;
  if (params) target.params = params;
  if (id) target.id = id;
  if (data && type === 'before') target.data = data;
  if (result) target.result = result;
  if (dispatch) target.dispatch = dispatch;
  if (statusCode) target.statusCode = statusCode;
  if (error) target.error = error;
  if (grapql) target.grapql = grapql;
  return target;
};

module.exports = {
  appRoot,
  delayTime,
  stripSlashes,
  parseBool,
  isTrue,
  inspector,
  qlParams,
  stringify,
  logHookContext
};
