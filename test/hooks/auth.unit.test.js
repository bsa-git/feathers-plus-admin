const assert = require('assert');
const {appRoot, inspector} = require('../../src/plugins/lib');
const authHook = require(`${appRoot}/src/hooks/auth`);
const {AuthServer} = require(`${appRoot}/src/plugins/auth`);
const chalk = require('chalk');
const debug = require('debug')('app:auth.unit.test');

require(`${appRoot}/src/app`);

const isLog = false;
const isDebug = false;

describe('<< Test /hooks/auth.unit.test.js >>', () => {

  // eslint-disable-next-line no-unused-vars
  let contextBefore, contextAfterPaginated,
    // eslint-disable-next-line no-unused-vars
    contextAfter, contextAfterMultiple;

  beforeEach(() => {
    contextBefore = {
      type: 'before',
      params: {
        provider: 'socketio',
      },
      data: {}
    };

    contextAfter = {
      type: 'after',
      params: {provider: 'socketio'},
      result: {}
    };

    contextAfterMultiple = {
      type: 'after',
      params: {provider: 'socketio'},
      result: []
    };

    contextAfterPaginated = {
      type: 'after',
      method: 'find',
      params: {provider: 'socketio'},
      result: {
        data: []
      }
    };
    contextAfterPaginated.result.total = contextAfterPaginated.result.data.length;
  });

  it('authHook.authCheck hook exists', () => {
    assert(typeof authHook.authCheck() === 'function', 'authHook.authCheck hook is not a function.');
  });

  it('auth.payloadExtension hook exists', () => {
    assert(typeof authHook.payloadExtension() === 'function', 'auth.payloadExtension hook is not a function.');
  });

  it('Customizing the Payload with Hook', () => {
    // Set context params
    contextBefore.params.authenticated = true;
    contextBefore.params.payload = {};
    contextBefore.path = 'users';
    contextBefore.method = 'create';

    const objRoles = AuthServer.getRoles();
    const roleNames = Object.keys(objRoles);
    roleNames.forEach(name => {
      contextBefore.params.payload.role = objRoles[name];
      authHook.payloadExtension(true)(contextBefore);
      if (isLog) inspector('Customizing the Payload with Hook.contextBefore:', contextBefore);
      if (isDebug) debug('Customizing the Payload with Hook.params.payload.role:', contextBefore.params.payload.role);
      assert(contextBefore.params.payload.role === objRoles[name], 'Customizing the Payload');
    });
  });

  it('Check access to public services', async () => {
    try {
      const objServices = AuthServer.listServices(process.env.PUBLIC_SERVICES);
      const serviceNames = Object.keys(objServices);
      const name = serviceNames[0];
      const method = objServices[name][0];
      contextBefore.path = name;
      contextBefore.method = method;
      await authHook.authCheck(true)(contextBefore);
      if (isLog) inspector('Check access to public services.contextBefore:', contextBefore);
      if (isDebug) debug(`Check access to service method - "${contextBefore.path}.${contextBefore.method}"`);
      assert(true);
    }
    catch (ex) {
      console.error(chalk.red(ex.message));
      assert(false, 'The hook "authHook.authCheck()" generated an error of the wrong type.');
    }
  });

  it('Error accessing services to not public services', async () => {
    try {
      const objServices = AuthServer.listServices(process.env.ADMIN_SERVICES);
      const serviceNames = Object.keys(objServices);
      const name = serviceNames[0];
      const method = objServices[name][0];
      contextBefore.path = name;
      contextBefore.method = method;
      if (isLog) inspector('Error accessing services to not public services.contextBefore:', contextBefore);
      if (isDebug) debug(`Check access to service method - "${contextBefore.path}.${contextBefore.method}"`);
      await authHook.authCheck(true)(contextBefore);
      assert(false, 'The hook "authHook.authCheck()" generated an error of the wrong type.');
    }
    catch (ex) {
      assert.strictEqual(ex.code, 403, 'unexpected error.code');
      assert.strictEqual(ex.message, `Access to the service method "${contextBefore.path}.${contextBefore.method}" is denied. Not enough rights`, 'unexpected error.message');
      assert.strictEqual(ex.name, 'Forbidden', 'unexpected error.name');
    }

  });

  it('Check access to services for the administrator role', async () => {
    try {
      // Set context params
      contextBefore.params.authenticated = true;
      contextBefore.params.payload = {};
      contextBefore.params.payload.role = 'Administrator';

      const objServices = AuthServer.listServices(process.env.ADMIN_SERVICES);
      const serviceNames = Object.keys(objServices);
      const name = serviceNames[0];
      const method = objServices[name][0];
      contextBefore.path = name;
      contextBefore.method = method;
      await authHook.authCheck(true)(contextBefore);
      if (isLog) inspector('Check access to services for the administrator role.contextBefore:', contextBefore);
      if (isDebug) debug(`Check access to service method - "${contextBefore.path}.${contextBefore.method}"`);
      assert(true);
    }
    catch (ex) {
      console.error(chalk.red(ex.message));
      assert(false, 'The hook "authHook.authCheck()" generated an error of the wrong type.');
    }
  });

  it('Error accessing services if the role is not an administrator', async () => {
    try {
      // Set context params
      contextBefore.params.authenticated = true;
      contextBefore.params.payload = {};
      contextBefore.params.payload.role = 'notAdministrator';

      const objServices = AuthServer.listServices(process.env.ADMIN_SERVICES);
      const serviceNames = Object.keys(objServices);
      const name = serviceNames[0];
      const method = objServices[name][0];
      contextBefore.path = name;
      contextBefore.method = method;
      if (isLog) inspector('Error accessing services if the role is not an administrator.contextBefore:', contextBefore);
      if (isDebug) debug(`Check access to service method - "${contextBefore.path}.${contextBefore.method}"`);
      await authHook.authCheck(true)(contextBefore);
      assert(false, 'The hook "authHook.authCheck()" generated an error of the wrong type.');
    }
    catch (ex) {
      assert.strictEqual(ex.code, 403, 'unexpected error.code');
      assert.strictEqual(ex.message, `Access to the service method "${contextBefore.path}.${contextBefore.method}" is denied. Not enough rights`, 'unexpected error.message');
      assert.strictEqual(ex.name, 'Forbidden', 'unexpected error.name');
    }
  });
});
