const errors = require('@feathersjs/errors');
const {inspector} = require('../plugins/lib');
const {AuthServer} = require('../plugins/auth');

const debug = require('debug')('app:auth.hook');

const isLog = false;
const isDebug = true;

/**
 * User rights check for hook
 * @param isTest
 * @return {function(*=)}
 */
const userRightsCheck = function (isTest = false) {
  return context => {
    // Create auth
    const auth = new AuthServer(context);
    // Debug info
    if (isDebug) debug(`<<userRightsCheck>>: Provider: ${auth.provider ? auth.provider : 'Not'}; ${context.type} app.service('${context.path}').${context.method}()`);
    if (isDebug) {
      if (auth.provider) {
        debug(`<<userRightsCheck>>: isAuth: ${auth.isAuth ? auth.isAuth : 'Not'}; Access: ${auth.isAccess() ? 'Yes' : 'Not'}; MyRole: ${auth.isAuth ? auth.myRole : 'Not'};`);
      }
    }
    if (!auth.isAccess(isTest)) {
      throw new errors.Forbidden(`Access to the service method "${context.path}.${context.method}" is denied. Not enough rights`);
    }

  };
};

/**
 * Payload extension for hook
 * @param isTest
 * @return {function(*=)}
 */
const payloadExtension = function (isTest = false) {
  return async context => {
    // Create auth
    const provider = context.params.provider ? context.params.provider : '';
    // Debug info
    if (isDebug) debug(`<<payloadExtension>>: Provider: ${provider}; ${context.type} app.service('${context.path}').${context.method}()`);
    const _isTest = isTest ? true : !AuthServer.isTest();
    if (_isTest && context.params.user) {
      const roleId = context.params.user.roleId;
      const role = await context.app.service('roles').get(roleId);
      if (isLog) inspector('Role for authorized user:', role);
      // make sure params.payload exists
      context.params.payload = context.params.payload || {};
      // merge in a `role` property
      Object.assign(context.params.payload, {role: `${role.name}`});
    }
  };
};

module.exports = {
  userRightsCheck,
  payloadExtension
};
