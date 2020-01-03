const assert = require('assert');
const app = require('../../src/app');
const {inspector} = require('../../src/plugins/lib');

const debug = require('debug')('app:data-management.test');
const isLog = false;
const isTest = true;

describe('<<< Test /services/data-management.test.js >>>', () => {

  if (!isTest) {
    debug('<<< Test /services/data-management.test.js >>> - NOT >>>');
    return;
  }

  it('registered the service', () => {
    const service = app.service('data-management');
    assert.ok(service, 'Registered the service');
  });

  it('Read flight json data from "dataManagement" service', async () => {
    try {
      const dmService = app.service('data-management');
      const flightData =  await dmService.create({
        action: 'readJsonFile',
        path: '/public/api/demo/echarts/flight-data.json'
      });
      if (isLog) inspector('data-management.test.flightData from "dataManagement" service:', flightData);
      assert.ok(flightData, 'OK - Read flight json data from "dataManagement" service');
    } catch (ex) {
      if (isLog) debug('Error on Read flight json data from "dataManagement" service:', ex);
      assert.ok(false, 'ERROR - Read flight json data from "dataManagement" service');
    }
  });
});
