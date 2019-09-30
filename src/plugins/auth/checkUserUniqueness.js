'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-env node */

const errors = require('@feathersjs/errors');
const debug = require('debug')('app:plugins.auth.checkUniqueness');

const isDebug = true;

// This module is usually called from the UI to check username, email, etc. are unique.
module.exports = function checkUserUniqueness(app, identifyUser, ownId, meta) {
  if(isDebug) debug('checkUniqueness', identifyUser, ownId, meta);
  const users = app.service('users');
  const usersIdName = users.id;

  const keys = Object.keys(identifyUser).filter(function (key) {
    return identifyUser[key] !== undefined && identifyUser[key] !== null;
  });

  return Promise.all(keys.map(function (prop) {
    return users.find({ query: _defineProperty({}, prop, identifyUser[prop].trim()) }).then(function (data) {
      const items = Array.isArray(data) ? data : data.data;
      const isNotUnique = items.length > 1 || items.length === 1 && items[0][usersIdName] !== ownId;

      return isNotUnique ? prop : null;
    });
  })).catch(function (err) {
    throw new errors.GeneralError(err);
  }).then(function (allProps) {
    const errProps = allProps.filter(function (prop) {
      return prop;
    });

    if (errProps.length) {
      var errs = {};
      errProps.forEach(function (prop) {
        errs[prop] = 'Already taken.';
      });
      return errs;
      // throw new errors.BadRequest(meta.noErrMsg ? null : 'Values already taken.', { errors: errs });
    }

    return null;
  });
};
