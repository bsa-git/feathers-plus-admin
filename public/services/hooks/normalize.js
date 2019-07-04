
const loPick = require('lodash/pick');
import util from '~/plugins/lib/util';
const {checkContext, getItems, replaceItems} = require('feathers-hooks-common');
const debug = require('debug')('app:normalize.hook');


const isLog = false;
const isDebug = false;

// eslint-disable-next-line no-unused-vars
export default function (options = {}) {

  // Return the actual hook.
  return async (context) => {
    // Throw if the hook is being called from an unexpected location.
    checkContext(context, null, ['find', 'get', 'create', 'update', 'patch', 'remove']);

    // Get the record(s) from context.data (before), context.result.data or context.result (after).
    // getItems always returns an array to simplify your processing.
    let records = getItems(context);
    let _records = {};

    /*
    Modify records and/or context.
     */
    if (records) {
      if(isDebug) debug(`${context.type} app.service('${context.path}').${context.method}()`);
      if (isLog) debug('Before normalize-query:', records);

      switch (context.path) {
      case 'users':
        Object.assign(_records, loPick(records, util.serviceKeys('users')));
        break;
      case 'user-profiles':
        Object.assign(_records, loPick(records, util.serviceKeys('userProfiles')));
        break;
      case 'roles':
        Object.assign(_records, loPick(records, util.serviceKeys('roles')));
        // records = loPick(records, ['name', 'description']);
        break;
      case 'teams':
        Object.assign(_records, loPick(records, util.serviceKeys('teams')));
        break;
      case 'user-teams':
        Object.assign(_records, loPick(records, util.serviceKeys('userTeams')));
        break;
      default:
        Object.assign(_records, records);
      }
      if (isLog) debug('After normalize-query:', _records);
    }

    // Place the modified records back in the context.
    replaceItems(context, _records);
    // Best practice: hooks should always return the context.
    return context;
  };
}

