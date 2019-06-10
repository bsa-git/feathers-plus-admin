const assert = require('assert');
const {readJsonFileSync, appRoot} = require('../../src/plugins/lib');
const {seedService} = require(`${appRoot}/src/plugins/test-helpers`);
const app = require(`${appRoot}/src/app`);
const debug = require('debug')('app:user-teams.service.test');

const isLog = true;

// Get generated fake data
const fakes = readJsonFileSync(`${appRoot}/seeds/fake-data.json`) || {};

describe('<<< Test \'userTeams\' service >>>', () => {
  it('registered the service', () => {
    const service = app.service('user-teams');

    assert.ok(service, 'Registered the service');
  });

  it('Save fake data to \'userTeams\' service', async () => {
    // Seed service data
    const results = await seedService(app, 'userTeams');
    if (Array.isArray(results)) {
      results.forEach((result, index) => {
        let fake = fakes['userTeams'][index];
        if (isLog) debug('seedService.result:', result);
        if (isLog) debug('userTeams.fake:', fake);
        delete result.createdAt;
        delete result.updatedAt;
        delete result['__v'];
        assert.deepEqual(result, fake);
      });
    } else {
      debug('seedService.results:', results);
      assert.ok(false);
    }
  });
});
