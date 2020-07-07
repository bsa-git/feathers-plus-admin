const {getItems, replaceItems} = require('feathers-hooks-common');
// import Service from '~/plugins/service-helpers/service-client.class';
import HookHelper from '~/plugins/service-helpers/hook-helper.class';

const debug = require('debug')('app:hooks.constraints');
const isLog = false;
const isDebug = false;

// eslint-disable-next-line no-unused-vars
export default function (options = {}) {
  // Return the actual hook.
  return async (context) => {
    // Get the record(s) from context.data (before), context.result.data or context.result (after).
    // getItems always returns an array to simplify your processing.
    let records = getItems(context);

    // Create HookHelper object
    const hh = new HookHelper(context);
    // Show debug info
    hh.showDebugInfo('', isLog);

    if(isDebug) debug('Context:', `${hh.contextPath}.${hh.contextMethod}.${hh.contextType}`);
    //----- SERVICES CONSTRAINT ---//
    switch (`${hh.contextPath}.${hh.contextMethod}.${hh.contextType}`) {
    case 'users.patch.after':
      break;
    default:
      break;
    }

    // Place the modified records back in the context.
    replaceItems(context, records);
    // Best practice: hooks should always return the context.
    return context;
  };
}

