const assert = require('assert');
const {appRoot} = require('../../src/plugins/lib');
const normalize = require(`${appRoot}/src/hooks/normalize`);
const app = require(`${appRoot}/src/app`);
const debug = require('debug')('app:normalize.unit.test');

const isTest = true;

describe('<<< Test /hooks/normalize.unit.test.js >>>', () => {

  // eslint-disable-next-line no-unused-vars
  let contextBefore, contextAfterPaginated,
    // eslint-disable-next-line no-unused-vars
    contextAfter, contextAfterMultiple;

  beforeEach(() => {
    contextBefore = {
      app,
      type: 'before',
      params: {provider: 'socketio'},
      data: {}
    };

    contextAfter = {
      app,
      type: 'after',
      params: {provider: 'socketio'},
      result: {}
    };

    contextAfterMultiple = {
      app,
      type: 'after',
      params: {provider: 'socketio'},
      result: []
    };

    contextAfterPaginated = {
      app,
      type: 'after',
      method: 'find',
      params: {provider: 'socketio'},
      result: {
        data: []
      }
    };
    contextAfterPaginated.result.total = contextAfterPaginated.result.data.length;
  });

  if(!isTest) {
    debug('<<< Test /hooks/normalize.unit.test.js - NOT >>>');
    return;
  }

  it('Hook exists', () => {
    assert(typeof normalize === 'function', 'Hook is not a function.');
  });

  it('Test hook for different contexts', async () => {
    // Test hook for contextBefore
    contextBefore.method = 'create';
    await normalize()(contextBefore);
    assert.deepStrictEqual(contextBefore.data, {});

    // Test hook for contextAfter
    contextAfter.method = 'create';
    await normalize()(contextAfter);
    assert.deepStrictEqual(contextAfter.result, {});

    // Test hook for contextAfterMultiple
    contextAfterMultiple.method = 'create';
    await normalize()(contextAfterMultiple);
    assert.deepStrictEqual(contextAfterMultiple.result, []);

    // Test hook for contextAfterPaginated
    contextAfterPaginated.method = 'create';
    await normalize()(contextAfterPaginated);
    assert.deepStrictEqual(contextAfterPaginated.result.data, []);
  });

  it('Test before hook for "users" service. When values is NULL', async () => {
    contextBefore.path = 'users';
    contextBefore.data = {
      verifyExpires: null,
      resetExpires: null,
      verifyToken: null,
      verifyShortToken: null,
      resetToken: null,
      resetShortToken: null
    };
    await normalize()(contextBefore);
    assert.deepStrictEqual(contextBefore.data, {
      verifyExpires: '1970-01-01T00:00:00.000Z',
      resetExpires: '1970-01-01T00:00:00.000Z',
      verifyToken: '',
      verifyShortToken: '',
      resetToken: '',
      resetShortToken: ''
    });
  });
  it('Test before hook for "users" service. When date values is NUMBER', async () => {
    contextBefore.path = 'users';
    contextBefore.data = {
      verifyExpires: 0,
      resetExpires: 0,
    };
    await normalize()(contextBefore);
    assert.deepStrictEqual(contextBefore.data, {
      verifyExpires: '1970-01-01T00:00:00.000Z',
      resetExpires: '1970-01-01T00:00:00.000Z',
    });
  });

  it('Test before hook for "users" service. When date values is DATE object', async () => {
    contextBefore.path = 'users';
    let nowDate = new Date();
    contextBefore.data = {
      verifyExpires: nowDate,
      resetExpires: nowDate,
    };
    await normalize()(contextBefore);
    assert.deepStrictEqual(contextBefore.data, {
      verifyExpires: nowDate.toJSON(),
      resetExpires: nowDate.toJSON(),
    });
  });

  it('Test before hook for "users" service. When date values is string', async () => {
    contextBefore.path = 'users';
    let strDate = 'December 17, 1995 03:24:00';
    let date = new Date(strDate);
    contextBefore.data = {
      verifyExpires: strDate,
      resetExpires: strDate,
    };
    await normalize()(contextBefore);
    assert.deepStrictEqual(contextBefore.data, {
      verifyExpires: date.toJSON(),
      resetExpires: date.toJSON(),
    });
  });

  it('Test after hook for "users" service. When date values is NULL', async () => {
    contextAfter.path = 'users';
    contextAfter.result = {
      verifyExpires: null,
      resetExpires: null,
    };
    await normalize()(contextAfter);
    assert.deepStrictEqual(contextAfter.result, {
      verifyExpires: 0,
      resetExpires: 0,
    });
  });

  it('Test after hook for "users" service. When date values is DATE object', async () => {
    contextAfter.path = 'users';
    let nowDate = new Date();
    contextAfter.result = {
      verifyExpires: nowDate,
      resetExpires: nowDate,
    };
    await normalize()(contextAfter);
    assert.deepStrictEqual(contextAfter.result, {
      verifyExpires: nowDate.valueOf(),
      resetExpires: nowDate.valueOf(),
    });
  });

  it('Test after hook for "users" service. When date values is string', async () => {
    contextAfter.path = 'users';
    let strDate = '1995-12-17T03:24:00.000Z';
    contextAfter.result = {
      verifyExpires: strDate,
      resetExpires: strDate,
    };
    await normalize()(contextAfter);
    assert.deepStrictEqual(contextAfter.result, {
      verifyExpires: Date.parse(strDate),
      resetExpires: Date.parse(strDate),
    });
  });
});
