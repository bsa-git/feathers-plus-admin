
const loPick = require('lodash/pick');
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

    /*
    Modify records and/or context.
     */
    if (records) {
      if(isDebug) debug(`${context.type} app.service('${context.path}').${context.method}()`);
      if (isLog) debug('Before normalize-query:', records);

      switch (context.path) {
      case 'users':
        if(records['roleId']){
          records = loPick(records, ['avatar', 'email', 'password', 'firstName', 'lastName', 'roleId']);
        }else {
          records = loPick(records, ['avatar', 'email', 'password', 'firstName', 'lastName']);
        }
        break;
      case 'roles':
        records = loPick(records, ['name', 'description']);
        break;
      case 'teams':
        records = loPick(records, ['name', 'description']);
        break;
      case 'user-teams':
        records = loPick(records, ['teamId', 'userId']);
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

