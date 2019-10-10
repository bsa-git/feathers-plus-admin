const assert = require('assert');
const {readJsonFileSync, appRoot} = require('../../src/plugins/lib');
const {seedService} = require(`${appRoot}/src/plugins/test-helpers`);
const app = require(`${appRoot}/src/app`);
const debug = require('debug')('app:user-teams.service.test');

const isLog = false;
const isTest = true;

// Get generated fake data
const fakes = readJsonFileSync(`${appRoot}/seeds/fake-data.json`) || {};

describe('<<< Test services/user-teams.test.js >>>', () => {

  if(!isTest) {
    debug('<<< Test services/user-teams.test.js - NOT >>>');
    return;
  }

  it('registered the service', () => {
    const service = app.service('user-teams');

    assert.ok(service, 'Registered the service');
  });

  it('Save fake data to \'userTeams\' service', async () => {
    // Seed service data
    const results = await seedService(app, 'userTeams');
    if (Array.isArray(results)) {
      assert.ok(results.length === fakes['userTeams'].length);
    } else {
      if(isLog) debug('seedService.results:', results);
      assert.ok(false);
    }
  });
});
