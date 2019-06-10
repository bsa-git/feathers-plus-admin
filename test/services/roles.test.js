const assert = require('assert');
const {readJsonFileSync, appRoot} = require('../../src/plugins/lib');
const app = require(`${appRoot}/src/app`);
const {seedService} = require(`${appRoot}/src/plugins/test-helpers`);
const debug = require('debug')('app:user-teams.service.test');

const isLog = true;

// Get generated fake data
const fakes = readJsonFileSync(`${appRoot}/seeds/fake-data.json`) || {};

describe('<<< Test \'roles\' service >>>', () => {
  it('registered the service', () => {
    const service = app.service('roles');
    assert.ok(service, 'Registered the service');
  });

  it('Save fake data to \'roles\' service', async () => {
    // Seed service data
    const results = await seedService(app, 'roles');
    if (Array.isArray(results)) {
      results.forEach((result, index) => {
        let fake = fakes['roles'][index];
        if (isLog) debug('seedService.result:', result);
        if (isLog) debug('roles.fake:', fake);
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
