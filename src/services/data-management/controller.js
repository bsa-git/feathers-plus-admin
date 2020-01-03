'use strict';

/* eslint-env node */

const errors = require('@feathersjs/errors');
const {readJsonFileSync, inspector, appRoot} = require('../../plugins/lib');

const debug = require('debug')('app:service.dataManagement.controller');
const isLog = false;
const isDebug = false;

let optionsDefault = {
  app: null,
  path: 'dataManagement',
};

module.exports = function () {
  let options1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  if(isDebug) debug('service being configured.');
  let options = Object.assign({}, optionsDefault, options1);

  return function () {
    return dataManagement(options, this);
  };
};

function dataManagement(options, app) {
  // 'function' needed as we use 'this'
  if(isDebug) debug('service initialized');
  options.app = app;

  options.app.use(options.path, {
    create: function create(data) {
      if(isDebug) debug('service called. action=' + data.action);

      switch (data.action) {
      case 'readJsonFile':
        try {
          const jsonData = readJsonFileSync(`${appRoot}${data.path}`) || {};
          if(isLog) inspector('service.dataManagement.controller.readJsonFile:', jsonData);
          return Promise.resolve(jsonData);
        } catch (ex) {
          if (isDebug) debug('Error on read jsonFile:', ex);
          throw new errors.BadRequest('Error on read jsonFile:', ex.message);
        }
      case 'options':
        return Promise.resolve(options);
      default:
        return Promise.reject(new errors.BadRequest('Action \'' + data.action + '\' is invalid.', { errors: { $className: 'badParams' } }));
      }
    }
  });
}
