const assert = require('assert');
const app = require('../../src/app');

describe('=== Test \'teams\' service ===', () => {
  it('registered the service', () => {
    const service = app.service('teams');

    assert.ok(service, 'Registered the service');
  });
});
