// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const {checkContext, getItems, replaceItems} = require('feathers-hooks-common');
const errors = require('@feathersjs/errors');
const {inspector, AuthServer} = require('../plugins');
// const {AuthServer} = require(`${appRoot}/src/plugins/auth`);
const debug = require('debug')('app:constraints.all.hook');

const isDebug = false;
const isLog = false;

// eslint-disable-next-line no-unused-vars
module.exports = function (isTest = false) {

  // Return the actual hook.
  return async (context) => {
    // Throw if the hook is being called from an unexpected location.
    checkContext(context, null, ['find', 'get', 'create', 'update', 'patch', 'remove']);

    // Get the authenticated user.
    // eslint-disable-next-line no-unused-vars
    const {user} = context.params;
    // Get the record(s) from context.data (before), context.result.data or context.result (after).
    // getItems always returns an array to simplify your processing.
    const records = getItems(context);

    /*
    Modify records and/or context.
     */

    const isCheck = isTest ? true : !AuthServer.isTest();

    const showDebugInfo = () => {
      if (isDebug) debug(`Provider: ${context.params.provider ? context.params.provider : 'Not'}; ${context.type} app.service('${context.path}').${context.method}()`);
      if (isLog) inspector('constraints.all.hook.records:', records);
    };

    let idField;

    const validateUnique = async (query = {}, id = null) => {
      let valid = true;
      const results = await context.service.find({
        query: query
      });
      if (isLog) inspector(`validateUnique(query=${JSON.stringify(query)}).results:`, results.data);
      if (context.method === 'create') {
        valid = results.data.length === 0;
      } else {
        if (results.data.length !== 0) {
          const rec = results.data[0];
          idField = 'id' in rec ? 'id' : '_id';
          valid = rec[idField] === id;
        } else {
          valid = true;
        }
      }
      if (!valid) {
        throw new errors.BadRequest('Values must be unique');
      }
    };

    const validateRelationship = async (path = '', id = null) => {
      const service = context.app.service(path);
      if (service) {
        const result = await service.get(id);
        if (isLog) inspector(`validateRelationship(path='${path}', id='${id}').result:`, result);
        if (!result) {
          throw new errors.BadRequest(`There is no entry in the service('${path}') for id: '${id}'`);
        }
      } else {
        throw new errors.BadRequest(`There is no service for the path - '${path}'`);
      }
    };

    const removeItems = async (path = '', query = {}) => {
      const service = context.app.service(path);
      if (service) {
        const removeResults = await service.remove(null, {query: query});
        if (isLog) inspector(`removeItems(path='${path}', query=${JSON.stringify(query)}).removeResults:`, removeResults);
        return removeResults;
      } else {
        throw new errors.BadRequest(`There is no service for the path - '${path}'`);
      }
    };

    const patchItems = async (path = '', data = {}, query = {}) => {
      const service = context.app.service(path);
      if (service) {
        const patchResults = await service.patch(null, data, {query: query});
        if (isLog) inspector(`patchItems(path='${path}', data=${JSON.stringify(data)}, query=${JSON.stringify(query)}).patchResults:`, patchResults);
        return patchResults;
      } else {
        throw new errors.BadRequest(`There is no service for the path - '${path}'`);
      }
    };

    const getRoleId = async (isRole = '') => {
      let roleId = '';
      const roles = context.app.service('roles');
      const roleName = AuthServer.getRoles(isRole);
      const findResults = await roles.find({query: {name: roleName}});
      if(findResults.data.length){
        idField = 'id' in findResults.data[0] ? 'id' : '_id';
        roleId = findResults.data[0][idField];
      }
      return roleId;
    };

    if (isCheck) {
      switch (`${context.type}.${context.path}.${context.method}`) {
      case 'before.user-teams.create':
        showDebugInfo();
        if (Array.isArray(records)) {
          records.forEach(async record => {
            await validateUnique({teamId: record.teamId, userId: record.userId});
            await validateRelationship('teams', record.teamId);
            await validateRelationship('users', record.userId);
          });
        } else {
          await validateUnique({teamId: records.teamId, userId: records.userId});
          await validateRelationship('teams', records.teamId);
          await validateRelationship('users', records.userId);
        }
        break;
      case 'before.users.create':
      case 'before.users.patch':
        showDebugInfo();
        if (Array.isArray(records)) {
          records.forEach(async record => {
            if (record.roleId) await validateRelationship('roles', record.roleId);
            if (context.method === 'create' && !record.roleId) {
              const roleId = await getRoleId('isGuest');
              if(roleId) record.roleId = roleId;
            }
          });
        } else {
          if (records.roleId) await validateRelationship('roles', records.roleId);
          if (context.method === 'create' && !records.roleId) {
            const roleId = await getRoleId('isGuest');
            if(roleId) records.roleId = roleId;
          }
        }
        break;
      case 'after.users.remove':
        showDebugInfo();
        if (Array.isArray(records)) {
          records.forEach(async record => {
            const idFieldUser = 'id' in record ? 'id' : '_id';
            const userId = record[idFieldUser];
            let servicePath = 'user-teams';
            const removed = await removeItems(servicePath, {userId: userId});
            if (isDebug) debug(`after.users.remove: (${removed.length}) records have been removed from the ${servicePath} service`);
          });
        } else {
          const idFieldUser = 'id' in records ? 'id' : '_id';
          const userId = records[idFieldUser];
          let servicePath = 'user-teams';
          const removed = await removeItems(servicePath, {userId: userId});
          if (isDebug) debug(`after.users.remove: (${removed.length}) records have been removed from the ${servicePath} service`);
        }
        break;
      case 'after.teams.remove':
        showDebugInfo();
        if (Array.isArray(records)) {
          records.forEach(async record => {
            const idFieldTeam = 'id' in record ? 'id' : '_id';
            const teamId = record[idFieldTeam];
            let servicePath = 'user-teams';
            const removed = await removeItems(servicePath, {teamId: teamId});
            if (isDebug) debug(`after.teams.remove: (${removed.length}) records have been removed from the ${servicePath} service`);
          });
        } else {
          const idFieldTeam = 'id' in records ? 'id' : '_id';
          const teamId = records[idFieldTeam];
          let servicePath = 'user-teams';
          const removed = await removeItems(servicePath, {teamId: teamId});
          if (isDebug) debug(`after.teams.remove: (${removed.length}) records have been removed from the ${servicePath} service`);
        }
        break;
      case 'after.roles.remove':
        showDebugInfo();
        if (Array.isArray(records)) {
          records.forEach(async record => {
            const idFieldRole = 'id' in record ? 'id' : '_id';
            const roleId = record[idFieldRole];
            let servicePath = 'users';
            const guestId = await getRoleId('isGuest');
            if(guestId) {
              const data = {roleId: guestId};
              const updated = await patchItems(servicePath, data, {roleId: roleId});
              if (isDebug) debug(`after.roles.remove: (${updated.length}) records have been updated from the ${servicePath} service`);
            }
          });
        } else {
          const idFieldRole = 'id' in records ? 'id' : '_id';
          const roleId = records[idFieldRole];
          let servicePath = 'users';
          const guestId = await getRoleId('isGuest');
          if(guestId) {
            const data = {roleId: guestId};
            const updated = await patchItems(servicePath, data, {roleId: roleId});
            if (isDebug) debug(`after.roles.remove: (${updated.length}) records have been updated from the ${servicePath} service`);
          }
        }
        break;
      default:
        // code block
      }
    }

    // Place the modified records back in the context.
    replaceItems(context, records);
    // Best practice: hooks should always return the context.
    return context;
  };
};

// Throw to reject the service call, or on an unrecoverable error.
// eslint-disable-next-line no-unused-vars
function error(msg) {
  throw new Error(msg);
}
