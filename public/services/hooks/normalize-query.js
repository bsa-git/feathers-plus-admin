
const loPick = require('lodash/pick');
const {checkContext, getItems, replaceItems} = require('feathers-hooks-common');
const debug = require('debug')('app:normalize-query.hook');


const isLog = false;

// eslint-disable-next-line no-unused-vars
export default function (options = {}) {

  // Return the actual hook.
  return async (context) => {
    // Throw if the hook is being called from an unexpected location.
    checkContext(context, null, ['find', 'get', 'create', 'update', 'patch', 'remove']);

    // Get the record(s) from context.data (before), context.result.data or context.result (after).
    // getItems always returns an array to simplify your processing.
    let records = getItems(context);

    /*
    Modify records and/or context.
     */
    if (records) {
      debug(`${context.type} app.service('${context.path}').${context.method}()`);
      debug('Hook Context:', context);

      if (isLog) debug('Before normalize-query:', records);

      switch (options.service) {
      case 'users':
        if(records['roleId']){
          records = loPick(records, ['email', 'password', 'firstName', 'lastName', 'roleId']);
        }else {
          records = loPick(records, ['email', 'password', 'firstName', 'lastName']);
        }
        break;
      case 'roles':
        records = loPick(records, ['name']);
        break;
      case 'teams':
        records = loPick(records, ['name']);
        break;
      default:
        // code block
      }
      if (isLog) debug('After normalize-query:', records);
    }

    // Place the modified records back in the context.
    replaceItems(context, records);
    // Best practice: hooks should always return the context.
    return context;
  };
}

