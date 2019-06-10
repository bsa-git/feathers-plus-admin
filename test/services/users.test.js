const assert = require('assert');
const {readJsonFileSync, appRoot} = require('../../src/plugins/lib/index');
const app = require(`${appRoot}/src/app`);
const {seedService} = require(`${appRoot}/src/plugins/test-helpers`);
const debug = require('debug')('app:users.service.test');

const isDebug = false;
const isLog = false;

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
        if (isLog) debug('seedService.result:', result);
        if (isLog) debug('users.fake:', fake);
        delete fake.password;
        delete result.password;
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

  it('Error on incorrect email', async function () {
    try {
      const users = app.service('users');
      await users.create({ email: 'my@test.', password: 'my', firstName: 'Lora', lastName: 'Lind' });
      assert(false, 'email unexpectedly succeeded');
    } catch (ex) {
      if(isDebug)debug('Error on incorrect email for \'users\' service:', ex);
      assert.strictEqual(ex.code, 400, 'unexpected error.code');
      assert.strictEqual(ex.message, 'Data does not match schema');
      assert.strictEqual(ex.name, 'BadRequest', 'unexpected error.name');
    }
  });

  it('Error on unique email', async function () {
    try {
      const fake = fakes['users'][0];
      const users = app.service('users');
      await users.create({ email: fake.email, password: 'test', firstName: 'Lora', lastName: 'Lind' });
      assert(false, 'email unexpectedly succeeded');
    } catch (ex) {
      if(isDebug)debug('Error on unique email for \'users\' service:', ex);
      const fake = fakes['users'][0];
      assert.strictEqual(ex.code, 409, 'unexpected error.code');
      assert.strictEqual(ex.message, `email: ${fake.email} already exists.`);
      assert.strictEqual(ex.name, 'Conflict');
    }
  });
});
