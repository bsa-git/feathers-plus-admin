// A hook that logs service method before, after and error
// const {inspector, logHookContext} = require('../plugins/lib');
import util from '~/plugins/lib/util';

const debug = require('debug')('app:log.hook');


const isLog = false;
const isDebug = false;

export default function () {
  return context => {
    // Debug info
    if (isDebug) debug(`${context.type} app.service('${context.path}').${context.method}()`);
    // Log context
    const logContext = util.getHookContext(context);
    if (isLog) debug('Hook Context:', logContext);

    if (context.error) {
      debug(context.error);
    }
  };
}
