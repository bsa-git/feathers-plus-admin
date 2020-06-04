const assert = require('assert');
const app = require('../../src/app');

describe('\'chatMessages\' service', () => {
  it('registered the service', () => {
    const service = app.service('chat-messages');

    assert.ok(service, 'Registered the service');
  });
});
