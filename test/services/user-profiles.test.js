const assert = require('assert');
const {readJsonFileSync, appRoot} = require('../../src/plugins/lib');
const app = require(`${appRoot}/src/app`);
const {seedService} = require(`${appRoot}/src/plugins/test-helpers`);
const debug = require('debug')('app:user-profiles.test');

const isLog = false;

// Get generated fake data
const fakes = readJsonFileSync(`${appRoot}/seeds/fake-data.json`) || {};

describe('<<< \'userProfiles\' service >>>', () => {
  it('registered the service', () => {
    const service = app.service('user-profiles');

    assert.ok(service, 'Registered the service');
  });

  it('Save fake data to \'user-profiles\' service', async () => {
    // Seed service data
    const results = await seedService(app, 'userProfiles');
    if (Array.isArray(results)) {
      assert.ok(results.length === fakes['userProfiles'].length);
    } else {
      if(isLog) debug('seedService.results:', results);
      assert.ok(false);
    }
  });
});
