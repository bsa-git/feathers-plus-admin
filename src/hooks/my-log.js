
// A hook that logs service method before, after and error
// See https://github.com/winstonjs/winston for documentation
// about the logger.
// const logger = require('../logger');
const {inspector, getHookContext} = require('../plugins/lib');
const chalk = require('chalk');
const debug = require('debug')('app:my-log.all.hook');

const isDebug = false;
const isLog = false;

/**
 * Get provider
 * @param context
 * @return {String}
 */
const getProvider = (context) => context.params.provider ? context.params.provider : 'Not';

// To see more detailed messages, uncomment the following line:
// logger.level = 'debug';

module.exports = function () {
  return context => {
    // Debug info
    if(isDebug) debug(`Provider: ${getProvider(context)}; ${context.type} app.service('${context.path}').${context.method}()`);
    if (context.error) {
      console.error(chalk.red(`context.error.message: ${context.error.message}`));
      delete context.error.app;
      delete context.error.hook;
      inspector('Error Context:', context.error);
    }else {
      // Log context
      const logContext = getHookContext(context);
      if (isLog) inspector('Hook Context:', logContext);
    }
  };
};
