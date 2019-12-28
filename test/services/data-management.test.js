const assert = require('assert');
const app = require('../../src/app');

describe('\'dataManagement\' service', () => {
  it('registered the service', () => {
    const service = app.service('data-management');

    assert.ok(service, 'Registered the service');
  });
});
