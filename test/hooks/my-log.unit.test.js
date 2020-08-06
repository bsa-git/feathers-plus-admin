
const assert = require('assert');
const myLog = require('../../src/hooks/my-log');
const {appRoot, inspector, readJsonFileSync, HookHelper, serviceHelper} = require('../../src/plugins');
const app = require(`${appRoot}/src/app`);
const chalk = require('chalk');
const debug = require('debug')('app:my-log.unit.test');

const isLog = false;
const isDebug = false;
const isTest = true;

// Get generated fake data
const fakes = readJsonFileSync(`${appRoot}/seeds/fake-data.json`) || {};

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

  it('Save fake data to \'users\' service', async () => {
    const errPath = await serviceHelper.saveFakesToServices(app, 'users');
    assert.ok(errPath === '', `Not save fakes to services - '${errPath}'`);
  });

  it('Create log message for user login', async () => {
    try {
      const fakeUser = fakes['users'][0];
      const idField = HookHelper.getIdField(fakeUser);
      const payload = { userId: fakeUser[idField], role: 'Administrator' };

      // Set context after
      contextAfter.app = app;
      contextAfter.path = 'authentication';
      contextAfter.method = 'create';
      contextAfter.params.payload = payload;

      // Create HookHelper object
      const hookHelper = new HookHelper(contextAfter);
      // Get count messages before
      const countMessagesBefore = await hookHelper.getCountItems('log-messages');
      // Test myLog for contextAfter
      await myLog(true)(contextAfter);
      // Get count messages after
      const countMessagesAfter = await hookHelper.getCountItems('log-messages');
      if(isDebug) debug('countMessagesBefore:', countMessagesBefore, ', countMessagesAfter:', countMessagesAfter);

      if (isLog) inspector('Create log message for user login::contextAfter:', contextAfter);
      if (isDebug) debug(`Create log message for user login - "${contextAfter.path}.${contextAfter.method}"`);

      assert(countMessagesAfter > countMessagesBefore, 'Error creating message log');
    }
    catch (ex) {
      console.error(chalk.red(ex.message));
      assert(false, 'Create log message for user login" generated an error of the wrong type.');
    }
  });


});
