const errors = require('@feathersjs/errors');
const {inspector} = require('../plugins/lib');
const {AuthServer} = require('../plugins/auth');
// const { authenticate } = require('@feathersjs/authentication').hooks;

const debug = require('debug')('app:hooks.auth');

const isLog = false;
const isDebug = false;

/**
 * User rights check for hook
 * @param isTest
 * @return {function(*=)}
 */
const authCheck = function (isTest = false) {
  return async context => {
    const provider = context.params.provider ? context.params.provider : '';
    if(isTest || (!AuthServer.isTest() && provider)){
      if (isDebug) debug('authCheck: Start');
      const authServer = new AuthServer(context);
      const isAccess = await authServer.isAccess();
      if (!isAccess) {
        throw new errors.Forbidden(`Access to the service method "${context.path}.${context.method}" is denied. Not enough rights`);
      }
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
      let role = {};
      const roleId = context.params.user.roleId;
      if (roleId) {
        role = await context.app.service('roles').get(roleId);
        if (isLog) inspector('Role for authorized user:', role);
      }

      // make sure params.payload exists
      context.params.payload = context.params.payload || {};
      // merge in a `role` property
      Object.assign(context.params.payload, {role: `${role.name ? role.name : ''}`});
    }
  };
};

module.exports = {
  authCheck,
  payloadExtension
};
