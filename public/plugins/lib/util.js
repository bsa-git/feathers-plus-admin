const crypto = require('crypto');
import cookies from 'browser-cookies';

const debug = require('debug')('app:plugins.util');
const isDebug = false;

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
 * gravatar
 * Get avatar URL for user email
 * @param email
 * @param size
 * @returns {string}
 */
const gravatar = function (email, size) {
  if (!size) {
    size = 200;
  }
  if (!email) {
    return `https://gravatar.com/avatar/?s=${size}&d=retro`;
  }
  const md5 = crypto.createHash('md5').update(email).digest('hex');
  return `https://secure.gravatar.com/avatar/${md5}?s=${size}&d=retro`;
};

/**
 * Delay time
 * @param sec
 * @return {Promise}
 */
const delayTime = function (sec = 1) {
  return new Promise(function (resolve) {
    setTimeout(() => {
      if(isDebug) debug(`delayTime: ${sec * 1000} MSec`);
      resolve('done!');
    }, sec * 1000);
  });
};

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

export default {
  toggleFullScreen,
  gravatar,
  delayTime,
  stripSlashes,
  stripSpecific,
  parseBool,
  isTrue,
  getAccessToken,
  isAccessToken,
  removeAccessToken,
  verifyJWT,
  readCookie,
  sortByStringField,
  qlParams,
  stringify,
  getHookContext
};
