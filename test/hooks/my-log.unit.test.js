
const assert = require('assert');
const myLog = require('../../src/hooks/my-log');
const debug = require('debug')('app:my-log.unit.test');

const isTest = true;

describe('<<< Test /hooks/my-log.unit.test.js >>>', () => {

  if(!isTest) {
    debug('<<< Test /hooks/my-log.unit.test.js - NOT >>>');
    return;
  }

  // eslint-disable-next-line no-unused-vars
  let contextBefore, contextAfterPaginated,
    // eslint-disable-next-line no-unused-vars
    contextAfter, contextAfterMultiple;

  beforeEach(() => {
    contextBefore = {
      type: 'before',
      params: { provider: 'socketio' },
      data: {

      }
    };

    contextAfter = {
      type: 'after',
      params: { provider: 'socketio' },
      result: {

      }
    };

    contextAfterMultiple = {
      type: 'after',
      params: { provider: 'socketio' },
      result: [

      ]
    };

    contextAfterPaginated = {
      type: 'after',
      method: 'find',
      params: { provider: 'socketio' },
      result: {
        data: [

        ]
      }
    };
    contextAfterPaginated.result.total = contextAfterPaginated.result.data.length;
  });

  it('Hook exists', () => {
    assert(typeof myLog === 'function', 'Hook is not a function.');
  });

  it('???', () => {
    contextBefore.method = 'create';
    assert(true);

    /*
    myLog()(contextBefore);

    assert.deepEqual(contextBefore.data, {

    });
    */
  });
});
