
/* eslint no-console: 0 */

module.exports = {
  isArray,
  isBoolean,
  isFunction,
  isNullsy,
  isObject,
  isString
};

function isArray (array) {
  return Array.isArray(array);
}

function isBoolean(bool) {
  return bool === true || bool === false;
}

function isFunction (func) {
  return typeof func === 'function';
}

function isNullsy (obj) {
  return obj === null || obj === undefined;
}

function isObject (obj) {
  return typeof obj === 'object' && obj !== null;
}

function isString (str) {
  return typeof str === 'string';
}
