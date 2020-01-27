// A hook that logs service method before, after and error
// See https://github.com/winstonjs/winston for documentation
// about the logger.
// const logger = require('../logger');
const {readJsonFileSync, inspector, getHookContext, appRoot, AuthServer} = require('../plugins');
const chalk = require('chalk');
const debug = require('debug')('app:hooks.my-log');

const isDebug = false;
const isLog = false;

const jsonLogData = readJsonFileSync(`${appRoot}/public/api/app/app-log-msg.json`) || {};

/**
 * Get provider
 * @param context
 * @return {String}
 */
const getProvider = (context) => context.params.provider ? context.params.provider : 'Not';

// To see more detailed messages, uncomment the following line:
// logger.level = 'debug';

const getLogMsg = async (context) => {
  let logContext, payload, logData, idField, msg;
  logContext = getHookContext(context);
  switch (`${logContext.path}.${logContext.method}.${logContext.type}`) {
  // User login
  case 'authentication.create.after':
    logData = jsonLogData['LOGIN'];
    payload = await AuthServer.verifyJWT(logContext.result.accessToken);
    msg = {title: logData.title, role: payload.role};
    return {gr: logData.gr, pr: logData.pr, name: 'LOGIN', userId: payload.userId, msg: JSON.stringify(msg)};
  // User logout
  case 'authentication.remove.after':
    logData = jsonLogData['LOGOUT'];
    payload = await AuthServer.verifyJWT(logContext.result.accessToken);
    msg = {title: logData.title, role: payload.role};
    return {gr: logData.gr, pr: logData.pr, name: 'LOGOUT', userId: payload.userId, msg: JSON.stringify(msg)};
  case 'users.create.after':
    logData = jsonLogData['REG_ACCOUNT'];
    idField = 'id' in logContext.result ? 'id' : '_id';
    msg = {title: logData.title, email: logContext.result['email'], fullName: `${logContext.result['firstName']} ${logContext.result['lastName']}`};
    return {gr: logData.gr, pr: logData.pr, name: 'REG_ACCOUNT', userId: logContext.result[idField], msg: JSON.stringify(msg)};
  case 'users.remove.after':
    logData = jsonLogData['REMOVE_ACCOUNT'];
    idField = 'id' in logContext.result ? 'id' : '_id';
    msg = {title: logData.title, email: logContext.result['email'], fullName: `${logContext.result['firstName']} ${logContext.result['lastName']}`};
    return {gr: logData.gr, pr: logData.pr, name: 'REMOVE_ACCOUNT', userId: logContext.result[idField], msg: JSON.stringify(msg)};
  default:
    return '';
  }
};

module.exports = function () {
  return async context => {
    // Debug info
    if (isDebug) debug(`Provider: ${getProvider(context)}; ${context.type} app.service('${context.path}').${context.method}()`);
    if (context.error) {
      console.error(chalk.red(`context.error.message: ${context.error.message}`));
      delete context.error.app;
      delete context.error.hook;
      inspector('Error Context:', context.error);
    } else {
      // Log context
      if (isLog) {
        const logContext = getHookContext(context);
        inspector('Hook Context:', logContext);
      }
      const logMsg = await getLogMsg(context);
      if (logMsg) debug('getLogMsg:', logMsg);
    }
  };
};
