// A hook that logs service method before, after and error
// const {inspector, logHookContext} = require('../plugins/lib');
import HookHelper from '~/plugins/service-helpers/hook-helper.class';

// const debug = require('debug')('app:log.hook');


const isLog = false;
// const isDebug = false;

export default function () {
  return context => {

    // Create HookHelper object
    const hh = new HookHelper(context);
    // Show debug info
    hh.showDebugInfo('', isLog);
    hh.showDebugError();

    // hookHelper.showDebugInfo('users.create.after', true);

  };
}
