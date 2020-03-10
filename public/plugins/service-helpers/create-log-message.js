import Service from '~/plugins/service-helpers/service-client.class';
import jsonLogData from '~/api/app/app-log-msg.json';

const debug = require('debug')('app:plugins.create-log-message');
const isLog = false;
const isDebug = false;

/**
 * Create log message
 * @param name
 * @param params
 * @return {Promise.<*>}
 */
export default function createLogMessage(store) {
  return async (name = '', params = {}) => {
    let msg, data, selIds, ownerId, userId, result;
    if(isDebug) debug('name:', name, 'params:', params);

    const service = new Service(store);

    // Log data
    const getLogData = (name) => {
      return jsonLogData.filter(item => !item.isConfig).find(item => item.name === name);
    };
    const configLogData = jsonLogData.find(item => item.isConfig);
    const logData = getLogData(name);
    if(isLog) debug('logData:', logData);

    // Get idField for user
    const idField = Service.getIdField(service.user);
    // Get ownerId/userId
    if(service.user){
      ownerId = service.user[idField];
      userId = service.user[idField];
    }else {
      ownerId = '000000000000000000000000';
      userId = '000000000000000000000000';
    }

    // Not create log msg
    if (!logData.isEnable) return result;
    if (configLogData.excludeGroups.includes(logData.gr)) return result;

    // Create log msg
    switch (name) {
    // Log message remove
    case 'LOG-MESSAGE-REMOVE':
      if (Array.isArray(params.selected)) {
        selIds = params.selected.map(sel => sel.id);
      } else {
        selIds = [params.selected.id];
      }
      msg = {
        selected: selIds,
        email: service.user['email'],
        fullName: `${service.user['firstName']} ${service.user['lastName']}`
      };
      data = {
        gr: logData.gr,
        pr: logData.pr,
        name: logData.name,
        ownerId,
        userId,
        msg: JSON.stringify(msg)
      };
      break;
      // Log message error
    case 'ERROR-CLIENT':
      // Get msg
      if(params.error.code){
        msg = params.error;
      }else {
        msg = {message: params.error.message};
      }
      // Get data
      data = {
        gr: logData.gr,
        pr: logData.pr,
        name: logData.name,
        ownerId,
        userId,
        msg: JSON.stringify(msg)
      };
      break;
    default:
      break;
    }
    if(data) {
      result = await service.create('log-messages', data);
    }
    if(isLog) debug('createLogMsg.result:', result);
    return result;
  };
}
