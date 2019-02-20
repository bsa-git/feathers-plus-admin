const assert = require('assert');
const {appRoot} = require('../../../../src/plugins/lib');
const verifyEmail = require(`${appRoot}/src/services/users/hooks/verify-email`);

describe('<<< Test users/hooks/verify-email.unit.test.js >>>', () => {
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
    assert(typeof verifyEmail === 'function', 'Hook is not a function.');
  });

  it('Test hook for correct email: "test@example.com"', () => {
    contextBefore.method = 'create';
    contextBefore.data = {email: 'test@example.com'};
    verifyEmail()(contextBefore);
    assert.deepEqual(contextBefore.data, {email: 'test@example.com'});
  });

  it('test for not correct email: "test@example."', () => {
    contextBefore.method = 'create';
    contextBefore.data = {email: 'test@example.'};
    try {
      verifyEmail()(contextBefore);
      assert(false, 'The function "verifyEmail()" did not determine the wrong e-mail.');
    }
    catch (ex) {
      if(ex.name === 'BadRequest' && ex.message === 'Invalid email: "test@example."'){
        assert(true);
      }else {
        assert(false, 'The function "verifyEmail()" generated an error of the wrong type.');
      }

    }
  });
});
