import cookies from 'browser-cookies';

const debug = require('debug')('app:plugins.util');
const isDebug = true;

/**
 * toggleFullScreen
 */
const toggleFullScreen = () => {
  let doc = window.document;
  let docEl = doc.documentElement;

  let requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
  let cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

  if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
    requestFullScreen.call(docEl);
  }
  else {
    cancelFullScreen.call(doc);
  }
};

/**
 * Delay time
 * @param sec
 * @return {Promise}
 */
const delayTime = function (sec = 1) {
  return new Promise(function (resolve) {
    setTimeout(() => {
      if (isDebug) debug(`delayTime: ${sec * 1000} MSec`);
      resolve('done!');
    }, sec * 1000);
  });
};

/**
 * Pause
 * @param ms
 * @return {Promise}
 */
const pause = ms => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Strip slashes
 * @param value String
 * @return {string|*|void}
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
 * Get number from value
 * @param value
 * @return {number}
 */
const getNumber = function(value){
  return Number.isInteger(value)? value : Number.parseInt(value);
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
 * getAccessToken
 * @returns {String|null}
 */
const getAccessToken = function () {
  if (process.client) {
    return cookies.get('feathers-jwt');
  } else {
    return null;
  }
};

/**
 * setAccessToken
 * @param token
 */
const setAccessToken = function (token) {
  if (process.client) {
    cookies.set('feathers-jwt', token);
  }
};

/**
 * isAccessToken
 * @returns {boolean}
 */
const isAccessToken = function () {
  return !!getAccessToken();
};

/**
 * removeAccessToken
 */
const removeAccessToken = function () {
  if (process.client) {
    cookies.erase('feathers-jwt');
  }
};

/**
 * verifyJWT
 * Pass a jwt token, get back a payload if it's valid.
 *
 * @param token
 * @return {Promise.<void>}
 */
const verifyJWT = async function (token) {
  const decode = require('jwt-decode');
  //-----------------------------------
  const payloadIsValid = function payloadIsValid(payload) {
    return payload && (!payload.exp || payload.exp * 1000 > new Date().getTime());
  };

  if (typeof token !== 'string') {
    return Promise.reject(new Error('Token provided to verifyJWT is missing or not a string'));
  }

  try {
    let payload = decode(token);

    if (payloadIsValid(payload)) {
      return Promise.resolve(payload);
    }

    return Promise.reject(new Error('Invalid token: expired'));
  } catch (error) {
    return Promise.reject(new Error('Cannot decode malformed token.'));
  }
};


/**
 * readCookie
 * Reads and returns the contents of a cookie with the provided name for server.
 * @param cookies {String}
 * @param name {String}
 * @returns {String|undefined}
 */
function readCookie(cookies, name) {
  if (!cookies) {
    return undefined;
  }
  let nameEQ = name + '=';
  let ca = cookies.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1, c.length);
    }
    if (c.indexOf(nameEQ) === 0) {
      return c.substring(nameEQ.length, c.length);
    }
  }
  return null;
}

/**
 * sort array by string field
 * @param items
 * @param name
 */
function sortByStringField(items, name) {
  items.sort((x, y) => {
    let textA = x[name].toLocaleUpperCase();
    let textB = y[name].toLocaleUpperCase();
    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
  });
}

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

/**
 * Get context for log
 * @param context
 * @return {Object}
 */
const getHookContext = function (context) {
  let target = {};
  let {service, path, method, type, params, id, data, result, error} = context;

  if (service) target.service = service;
  if (service && service.FeathersVuexModel) target.Model = service.FeathersVuexModel;
  if (path) target.path = path;
  if (method) target.method = method;
  if (type) target.type = type;
  if (params) target.params = params;
  if (id) target.id = id;
  if (data && type === 'before') target.data = data;
  if (result) target.result = result;
  if (error) target.error = error;
  return target;
};

/**
 * Returns new object with values cloned from the original object. Some objects
 * (like Sequelize or MongoDB model instances) contain circular references
 * and cause TypeError when trying to JSON.stringify() them. They may contain
 * custom toJSON() or toObject() method which allows to serialize them safely.
 * Object.assign() does not clone these methods, so the purpose of this method
 * is to use result of custom toJSON() or toObject() (if accessible)
 * for Object.assign(), but only in case of serialization failure.
 *
 * @param {Object?} obj - Object to clone
 * @returns {Object} Cloned object
 */
const cloneObject = function (obj) {
  let obj1 = obj;
  if (typeof obj.toJSON === 'function' || typeof obj.toObject === 'function') {
    try {
      JSON.stringify(Object.assign({}, obj1));
    } catch (e) {
      debug('Object is not serializable');
      obj1 = obj1.toJSON ? obj1.toJSON() : obj1.toObject();
    }
  }
  return Object.assign({}, obj1);
};

export default {
  toggleFullScreen,
  delayTime,
  pause,
  stripSlashes,
  stripSpecific,
  isTrue,
  getNumber,
  getRegex,
  getAccessToken,
  setAccessToken,
  isAccessToken,
  removeAccessToken,
  verifyJWT,
  readCookie,
  sortByStringField,
  qlParams,
  stringify,
  getHookContext,
  cloneObject
};
