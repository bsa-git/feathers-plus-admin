const assert = require('assert');
const app = require('../../src/app');

describe('\'logMsg\' service', () => {
  it('registered the service', () => {
    const service = app.service('log-msg');

    assert.ok(service, 'Registered the service');
  });
});
