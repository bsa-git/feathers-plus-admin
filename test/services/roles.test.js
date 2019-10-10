const assert = require('assert');
const {readJsonFileSync, appRoot} = require('../../src/plugins/lib');
const app = require(`${appRoot}/src/app`);
const {seedService} = require(`${appRoot}/src/plugins/test-helpers`);
const debug = require('debug')('app:roles.test');

const isLog = false;
const isTest = true;

// Get generated fake data
const fakes = readJsonFileSync(`${appRoot}/seeds/fake-data.json`) || {};

describe('<<< Test services/roles.test.js >>>', () => {

  if(!isTest) {
    debug('<<< Test services/roles.test.js - NOT >>>');
    return;
  }

  it('registered the service', () => {
    const service = app.service('roles');
    assert.ok(service, 'Registered the service');
  });

  it('Save fake data to \'roles\' service', async () => {
    // Seed service data
    const results = await seedService(app, 'roles');
    if (Array.isArray(results)) {
      assert.ok(results.length === fakes['roles'].length);
    } else {
      if(isLog) debug('seedService.results:', results);
      assert.ok(false);
    }
  });
});
