const assert = require('assert');
const {appRoot, serviceHelper} = require('../../src/plugins');
const app = require(`${appRoot}/src/app`);
const debug = require('debug')('app:teams.test');

const isTest = true;

describe('<<< Test services/teams.test.js >>>', () => {

  if(!isTest) {
    debug('<<< Test services/teams.test.js - NOT >>>');
    return;
  }

  it('registered the service', () => {
    const errPath = serviceHelper.checkServicesRegistered(app, 'teams');
    assert.ok(errPath === '', `Service '${errPath}' not registered`);
  });

  it('Save fake data to \'teams\' service', async () => {
    const errPath = await serviceHelper.saveFakesToServices(app, 'teams');
    assert.ok(errPath === '', `Not save fakes to services - '${errPath}'`);
  });
});
