const assert = require('assert');
const {readJsonFileSync, appRoot} = require('../../src/plugins/lib');
const app = require(`${appRoot}/src/app`);
const {seedService} = require(`${appRoot}/src/plugins/test-helpers`);
const debug = require('debug')('app:users.test');

const isDebug = false;
const isLog = false;
const isTest = true;

// Get generated fake data
const fakes = readJsonFileSync(`${appRoot}/seeds/fake-data.json`) || {};

describe('<<< Test services/users.test.js >>>', () => {

  if(!isTest) {
    debug('<<< Test services/users.test.js - NOT >>>');
    return;
  }

  it('registered the service', () => {
    const service = app.service('users');
    assert.ok(service, 'Registered the service');
  });

  it('Save fake data to \'users\' service', async () => {
    // Seed service data
    const results = await seedService(app, 'users');
    if (Array.isArray(results)) {
      assert.ok(results.length === fakes['users'].length);
    } else {
      if(isLog) debug('seedService.results:', results);
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

  it('Error on unique profileId', async function () {
    try {
      const fake = fakes['users'][0];
      const users = app.service('users');
      await users.create({ email: 'test@test.com', password: 'test', firstName: 'Lora', lastName: 'Lind', profileId: fake.profileId });
      assert(false, 'email unexpectedly succeeded');
    } catch (ex) {
      if(isDebug)debug('Error on unique profileId for \'users\' service:', ex);
      const fake = fakes['users'][0];
      // assert.ok(true);
      assert.strictEqual(ex.code, 409, 'unexpected error.code');
      assert.strictEqual(ex.message, `profileId: ObjectId('${fake.profileId}') already exists.`);
      assert.strictEqual(ex.name, 'Conflict');
    }
  });
});
