const crypto = require('crypto');
import cookies from 'browser-cookies';
const debug = require('debug')('app:util');

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

export default {
  toggleFullScreen,
  gravatar,
  delayTime,
  stripSlashes,
  parseBool,
  isTrue,
  getAccessToken,
  isAccessToken,
  removeAccessToken,
  verifyJWT,
  readCookie
};
