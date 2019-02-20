
// A hook that logs service method before, after and error
// See https://github.com/winstonjs/winston for documentation
// about the logger.
const logger = require('../logger');
const {inspector, logHookContext} = require('../plugins/lib');
const debug = require('debug')('app:log.hook');


const isLog = false;

// To see more detailed messages, uncomment the following line:
// logger.level = 'debug';

module.exports = function () {
  return context => {
    // Debug info
    debug(`${context.type} app.service('${context.path}').${context.method}()`);
    // Log context
    const logContext = logHookContext(context);
    if (isLog) inspector('Hook Context:', logContext);

    if (context.error) {
      logger.error(context.error.stack);
    }
  };
};
