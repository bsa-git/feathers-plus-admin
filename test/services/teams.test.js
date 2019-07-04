const assert = require('assert');
const {readJsonFileSync, appRoot} = require('../../src/plugins/lib');
const app = require(`${appRoot}/src/app`);
const {seedService} = require(`${appRoot}/src/plugins/test-helpers`);
const debug = require('debug')('app:teams.test');

const isLog = false;

// Get generated fake data
const fakes = readJsonFileSync(`${appRoot}/seeds/fake-data.json`) || {};

describe('<<< Test \'teams\' service >>>', () => {
  it('registered the service', () => {
    const service = app.service('teams');
    assert.ok(service, 'Registered the service');
  });

  it('Save fake data to \'teams\' service', async () => {
    // Seed service data
    const results = await seedService(app, 'teams');
    if (Array.isArray(results)) {
      results.forEach((result, index) => {
        let fake = fakes['teams'][index];
        if (isLog) debug('seedService.result:', result);
        if (isLog) debug('teams.fake:', fake);
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
