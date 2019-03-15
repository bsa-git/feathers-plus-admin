const assert = require('assert');
const {readJsonFileSync, appRoot} = require('../../src/plugins/lib/index');
const app = require(`${appRoot}/src/app`);
const {seedService} = require(`${appRoot}/src/plugins/test-helpers`);

// Get generated fake data
const fakes = readJsonFileSync(`${appRoot}/seeds/fake-data.json`) || {};

describe('<<< Test \'users\' service >>>', () => {
  it('registered the service', () => {
    const service = app.service('users');
    assert.ok(service, 'Registered the service');
  });

  it('Save fake data to \'users\' service', async () => {
    // Seed service data
    const results = await seedService(app, 'users');
    if (Array.isArray(results)) {
      results.forEach((result, index) => {
        let fake = fakes['users'][index];
        delete fake.password;
        // debug('fakeData \'users\' service for fake:', fake);
        delete result.password;
        delete result.createdAt;
        delete result.updatedAt;
        delete result['__v'];
        assert.deepEqual(result, fake);
      });
    }
  });

  it('Error writing to database when field uniqueness violation', async () => {
    try {
      const rec = fakes['users'][0];
      const ourSeedId = 'id' in rec ? 'id' : '_id';
      const prop = 'email';
      const patchEmail = fakes['users'][1][prop];
      const service = app.service('users');
      await service.patch(rec[ourSeedId], { [prop]: patchEmail });
      assert.ok(false);
    } catch (ex) {
      console.error('Error:', ex);
      const patchEmail = fakes['users'][1]['email'];
      assert.strictEqual(ex.code, 409, 'unexpected error.code');
      assert.strictEqual(ex.message, `email: ${patchEmail} already exists.`, 'unexpected error.message');
      assert.strictEqual(ex.name, 'Conflict', 'unexpected error.name');
    }

  });
});
