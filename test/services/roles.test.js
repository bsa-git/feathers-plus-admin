const assert = require('assert');
const {appRoot, serviceHelper} = require('../../src/plugins');
const app = require(`${appRoot}/src/app`);
const debug = require('debug')('app:roles.test');

const isTest = true;

describe('<<< Test services/roles.test.js >>>', () => {

  if(!isTest) {
    debug('<<< Test services/roles.test.js - NOT >>>');
    return;
  }

  it('registered the service', () => {
    const errPath = serviceHelper.checkServicesRegistered(app, 'roles');
    assert.ok(errPath === '', `Service '${errPath}' not registered`);
  });

  it('Save fake data to \'roles\' service', async () => {
    const errPath = await serviceHelper.saveFakesToServices(app, 'roles');
    assert.ok(errPath === '', `Not save fakes to services - '${errPath}'`);
  });
});
