const assert = require('assert');
const {appRoot} = require('../../src/plugins/lib');
const normalize = require(`${appRoot}/src/hooks/normalize`);

describe('<<< Test /hooks/normalize.unit.test.js >>>', () => {
  // eslint-disable-next-line no-unused-vars
  let contextBefore, contextAfterPaginated,
    // eslint-disable-next-line no-unused-vars
    contextAfter, contextAfterMultiple;

  beforeEach(() => {
    contextBefore = {
      type: 'before',
      params: {provider: 'socketio'},
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

  it('Hook exists', () => {
    assert(typeof normalize === 'function', 'Hook is not a function.');
  });

  it('Test hook for different contexts', () => {
    // Test hook for contextBefore
    contextBefore.method = 'create';
    normalize()(contextBefore);
    assert.deepStrictEqual(contextBefore.data, {});

    // Test hook for contextAfter
    contextAfter.method = 'create';
    normalize()(contextAfter);
    assert.deepStrictEqual(contextAfter.result, {});

    // Test hook for contextAfterMultiple
    contextAfterMultiple.method = 'create';
    normalize()(contextAfterMultiple);
    assert.deepStrictEqual(contextAfterMultiple.result, []);

    // Test hook for contextAfterPaginated
    contextAfterPaginated.method = 'create';
    normalize()(contextAfterPaginated);
    assert.deepStrictEqual(contextAfterPaginated.result.data, []);
  });

  it('Test before hook for "users" service. When values is NULL', () => {
    contextBefore.path = 'users';
    contextBefore.data = {
      verifyExpires: null,
      resetExpires: null,
      verifyToken: null,
      verifyShortToken: null,
      resetToken: null,
      resetShortToken: null
    };
    normalize()(contextBefore);
    assert.deepStrictEqual(contextBefore.data, {
      verifyExpires: '1970-01-01T00:00:00.000Z',
      resetExpires: '1970-01-01T00:00:00.000Z',
      verifyToken: '',
      verifyShortToken: '',
      resetToken: '',
      resetShortToken: ''
    });
  });
  it('Test before hook for "users" service. When date values is NUMBER', () => {
    contextBefore.path = 'users';
    contextBefore.data = {
      verifyExpires: 0,
      resetExpires: 0,
    };
    normalize()(contextBefore);
    assert.deepStrictEqual(contextBefore.data, {
      verifyExpires: '1970-01-01T00:00:00.000Z',
      resetExpires: '1970-01-01T00:00:00.000Z',
    });
  });

  it('Test before hook for "users" service. When date values is DATE object', () => {
    contextBefore.path = 'users';
    let nowDate = new Date();
    contextBefore.data = {
      verifyExpires: nowDate,
      resetExpires: nowDate,
    };
    normalize()(contextBefore);
    assert.deepStrictEqual(contextBefore.data, {
      verifyExpires: nowDate.toJSON(),
      resetExpires: nowDate.toJSON(),
    });
  });

  it('Test before hook for "users" service. When date values is string', () => {
    contextBefore.path = 'users';
    let strDate = 'December 17, 1995 03:24:00';
    let date = new Date(strDate);
    contextBefore.data = {
      verifyExpires: strDate,
      resetExpires: strDate,
    };
    normalize()(contextBefore);
    assert.deepStrictEqual(contextBefore.data, {
      verifyExpires: date.toJSON(),
      resetExpires: date.toJSON(),
    });
  });

  it('Test after hook for "users" service. When date values is NULL', () => {
    contextAfter.path = 'users';
    contextAfter.result = {
      verifyExpires: null,
      resetExpires: null,
    };
    normalize()(contextAfter);
    assert.deepStrictEqual(contextAfter.result, {
      verifyExpires: 0,
      resetExpires: 0,
    });
  });

  it('Test after hook for "users" service. When date values is DATE object', () => {
    contextAfter.path = 'users';
    let nowDate = new Date();
    contextAfter.result = {
      verifyExpires: nowDate,
      resetExpires: nowDate,
    };
    normalize()(contextAfter);
    assert.deepStrictEqual(contextAfter.result, {
      verifyExpires: nowDate.valueOf(),
      resetExpires: nowDate.valueOf(),
    });
  });

  it('Test after hook for "users" service. When date values is string', () => {
    contextAfter.path = 'users';
    let strDate = '1995-12-17T03:24:00.000Z';
    contextAfter.result = {
      verifyExpires: strDate,
      resetExpires: strDate,
    };
    normalize()(contextAfter);
    assert.deepStrictEqual(contextAfter.result, {
      verifyExpires: Date.parse(strDate),
      resetExpires: Date.parse(strDate),
    });
  });
});
