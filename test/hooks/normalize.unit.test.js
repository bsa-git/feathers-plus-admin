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
    assert.deepEqual(contextBefore.data, {});

    // Test hook for contextAfter
    contextAfter.method = 'create';
    normalize()(contextAfter);
    assert.deepEqual(contextAfter.result, {});

    // Test hook for contextAfterMultiple
    contextAfterMultiple.method = 'create';
    normalize()(contextAfterMultiple);
    assert.deepEqual(contextAfterMultiple.result, []);

    // Test hook for contextAfterPaginated
    contextAfterPaginated.method = 'create';
    normalize()(contextAfterPaginated);
    assert.deepEqual(contextAfterPaginated.result.data, []);
  });
});
