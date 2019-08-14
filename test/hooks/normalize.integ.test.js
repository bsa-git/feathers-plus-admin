
const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const {readJsonFileSync, appRoot} = require('../../src/plugins/lib');
const normalize = require(`${appRoot}/src/hooks/normalize`);

// Get generated fake data
// eslint-disable-next-line no-unused-vars
const fakeData = readJsonFileSync(`${appRoot}/seeds/fake-data.json`) || {};

describe('<<< Test /hooks/normalize.integ.test.js >>>', () => {
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
        create: normalize()
      }
    });

    service = app.service('/test-service');
    params = {
      user: (fakeData['users'][0] || [])[0] || {
        email: 'test@example.com'
      }

    };
  });


  it('Normalize hook exists', () => {
    assert(typeof normalize === 'function', 'Hook is not a function.');
  });

  it('Test hook for fake data', async () => {
    params.provider = undefined;
    const result = await service.create(params.user, params);
    assert.deepStrictEqual(params.user, result);

  });
});
