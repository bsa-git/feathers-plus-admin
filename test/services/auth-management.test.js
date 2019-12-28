const assert = require('assert');
// const {readJsonFileSync, inspector, appRoot} = require('../../src/plugins/lib');
const app = require('../../src/app');

const debug = require('debug')('app:auth.unit.test');

// const isLog = true;
const isTest = true;

describe('<<< Test /services/auth-management.test.js >>>', () => {

  if (!isTest) {
    debug('<<< Test /services/auth-management.test.js >>> - NOT >>>');
    return;
  }

  it('Registered the service', () => {
    const service = app.service('auth-management');
    assert.ok(service, 'Registered the service');
  });

  // it('Read the json data', () => {
  //   try {
  //     const flightData = readJsonFileSync(`${appRoot}/public/api/demo/echarts/flight-data.json`) || {};
  //     assert.ok(flightData, 'OK - Read the json data');
  //     if (isLog) inspector('auth.test.flightData:', flightData);
  //   } catch (ex) {
  //     if (isLog) debug('Error on Read the json data:', ex);
  //     assert.ok(false, 'ERROR - Read the json data');
  //   }
  // });
});
