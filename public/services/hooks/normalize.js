
const loPick = require('lodash/pick');
const loCamelCase = require('lodash/camelCase');
const {replaceItems} = require('feathers-hooks-common');
import Service from '~/plugins/service-helpers/service-client.class';
import HookHelper from '~/plugins/service-helpers/hook-helper.class';
import fakeData from '~~/seeds/fake-data.json';

const debug = require('debug')('app:hooks.normalize');
const isLog = false;
const isDebug = false;

// eslint-disable-next-line no-unused-vars
export default function (options = {}) {
  // Return the actual hook.
  return async (context) => {

    // Create HookHelper object
    const hh = new HookHelper(context);
    // Show debug info
    hh.showDebugInfo('', isLog);

    // let records = hh.contextRecords;
    let _records;
    const fakeDataKey = loCamelCase(hh.contextPath);
    if(isDebug) debug('fakeDataKey:', fakeDataKey);

    /**
     * Pick item
     * @param record
     * @return {Object}
     */
    const pickItem = (record) => {
      if (!record) return {};
      return Object.assign({}, loPick(record, Service.serviceFields(fakeDataKey)));
    };

    if (isLog) debug('Before normalize-query records:', hh.contextRecords);

    if(fakeData[fakeDataKey]){
      _records = hh.getPickRecords(pickItem);
    }else {
      Object.assign(_records, hh.contextRecords);
    }

    if (isLog) debug('After normalize-query records:', _records);

    // Place the modified records back in the context.
    replaceItems(context, _records);
    // Best practice: hooks should always return the context.
    return context;
  };
}

