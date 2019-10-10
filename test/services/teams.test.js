const assert = require('assert');
const {readJsonFileSync, appRoot} = require('../../src/plugins/lib');
const app = require(`${appRoot}/src/app`);
const {seedService} = require(`${appRoot}/src/plugins/test-helpers`);
const debug = require('debug')('app:teams.test');

const isLog = false;
const isTest = true;

// Get generated fake data
const fakes = readJsonFileSync(`${appRoot}/seeds/fake-data.json`) || {};

describe('<<< Test services/teams.test.js >>>', () => {

  if(!isTest) {
    debug('<<< Test services/teams.test.js - NOT >>>');
    return;
  }

  it('registered the service', () => {
    const service = app.service('teams');
    assert.ok(service, 'Registered the service');
  });

  it('Save fake data to \'teams\' service', async () => {
    // Seed service data
    const results = await seedService(app, 'teams');
    if (Array.isArray(results)) {
      assert.ok(results.length === fakes['teams'].length);
    } else {
      if(isLog) debug('seedService.results:', results);
      assert.ok(false);
    }
  });
});
