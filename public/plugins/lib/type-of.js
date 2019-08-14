
/* eslint no-console: 0 */

function isArray (array) {
  return Array.isArray(array);
}

function isBoolean(bool) {
  return bool === true || bool === false;
}

function isFunction (func) {
  return typeof func === 'function';
}

function isNull (obj) {
  return obj === null || obj === undefined;
}

function isObject (obj) {
  return typeof obj === 'object' && obj !== null;
}

function isString (str) {
  return typeof str === 'string';
}

function isNumber (val) {
  return typeof val === 'number';
}

export default {
  isArray,
  isBoolean,
  isFunction,
  isNull,
  isObject,
  isString,
  isNumber
};
