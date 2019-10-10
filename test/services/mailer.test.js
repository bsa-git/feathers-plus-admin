const assert = require('assert');
const app = require('../../src/app');
const debug = require('debug')('app:mailer.test');

const isTest = true;

describe('<<< Test services/mailer.test.js >>>', () => {

  if(!isTest) {
    debug('<<< Test services/mailer.test.js - NOT >>>');
    return;
  }

  it('registered the service', () => {
    const service = app.service('mailer');

    assert.ok(service, 'Registered the service');
  });
});
