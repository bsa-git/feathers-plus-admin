const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const {join} = require('path');
const {readJsonFileSync} = require('@feathers-plus/test-utils');
const verifyEmail = require('../../../../src/services/users/hooks/verify-email');
const debug = require('debug')('app:verify-email.service.hook.test');

// Get generated fake data
// eslint-disable-next-line no-unused-vars
const fakeData = readJsonFileSync(join(__dirname, '../../../../seeds/fake-data.json')) || {};
const fakeDataUser = (fakeData['users'] || [])[0] || {email: 'test@example.com'};

describe('=== Test users/hooks/verify-email.integ.test.js ===', () => {
  let app, params;
  // eslint-disable-next-line no-unused-vars
  let service;

  beforeEach(() => {
    app = feathers();

    app.use('/test-service', {
      async create(data) {
        return data;
      }
    });

    app.service('/test-service').hooks({
      before: {
        create: verifyEmail()
      }
    });

    service = app.service('/test-service');
    params = {
      user: fakeDataUser

    };
  });


  it('Hook exists', () => {
    assert(typeof verifyEmail === 'function', 'Hook is not a function.');
  });

  it('Test hook for fakeDataUser', async () => {
    params.provider = undefined;
    const result = await service.create(fakeDataUser, params);
    debug('service.create.result:', result);
    assert.deepEqual(fakeDataUser, result);
  });
});
