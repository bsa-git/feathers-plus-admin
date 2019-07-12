
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
 * @param value String
 * @return {XML|string|*|void}
 */
const stripSlashes = function (value) {
  return value.replace(/^(\/*)|(\/*)$/g, '');
};

/**
 * Strip slashes
 * @param value String
 * @param symbol String
 * @return {string|*|void}
 */
const stripSpecific = function (value, symbol = '') {
  const regEx = new RegExp('^[' + symbol + ']+|[' + symbol + ']+$', 'g');
  const trimValue = symbol ? value.replace(regEx, '') : value.trim();
  return trimValue;
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
 * Get Regex
 * @param type
 * @return {String}
 */
const getRegex = function (type) {
  if (typeof(type) === 'string') {
    type = type.trim().toLowerCase();
  }
  switch (type) {
  case 'phone':
    /*
    (123) 456-7890
    +(123) 456-7890
    +(123)-456-7890
    +(123) - 456-7890
    +(123) - 456-78-90
    123-456-7890
    123.456.7890
    1234567890
    +31636363634
    +380980029669
    075-63546725
    */
    return '^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\\s\\./0-9]*$';
  case 'zip_code':
    /*
    12345
    12345-6789
    */
    return '^[0-9]{5}(?:-[0-9]{4})?$';
  case 'lat':
    /*
    +90.0
    45
    -90
    -90.000
    +90
    47.123123
    */
    return '^(\\+|-)?(?:90(?:(?:\\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\\.[0-9]{1,6})?))$';
  case 'long':
    /*
    -127.554334
    180
    -180
    -180.0000
    +180
    179.999999
    */
    return '^(\\+|-)?(?:180(?:(?:\\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\\.[0-9]{1,6})?))$';
  case 'lat_and_long':
    /*
    +90.0, -127.554334
    45, 180
    -90, -180
    -90.000, -180.0000
    +90, +180
    47.1231231, 179.99999999
    */
    return '^[-+]?([1-8]?\\d(\\.\\d+)?|90(\\.0+)?),\\s*[-+]?(180(\\.0+)?|((1[0-7]\\d)|([1-9]?\\d))(\\.\\d+)?)$';
  default:
    return '//g';
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

const getHookContext = function (context) {
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

const getGraphQLContext = function (context) {
  let target = {};
  let {batchLoaders, cache, provider, authenticated, pagination, user,} = context;

  if (batchLoaders) target.batchLoaders = batchLoaders;
  if (cache) target.cache = cache;
  if (provider) target.provider = provider;
  if (authenticated) target.authenticated = authenticated;
  if (pagination) target.pagination = pagination;
  if (user) target.user = user;
  return target;
};

module.exports = {
  appRoot,
  delayTime,
  stripSlashes,
  stripSpecific,
  isTrue,
  getRegex,
  inspector,
  qlParams,
  stringify,
  getHookContext,
  getGraphQLContext
};
