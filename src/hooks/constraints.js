// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const {checkContext, getItems, replaceItems} = require('feathers-hooks-common');
const errors = require('@feathersjs/errors');
const {inspector, AuthServer, getHookContext} = require('../plugins');
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

    /**
     * Show debug info
     */
    const showDebugInfo = () => {
      if(isLog) inspector('constraints.all.hook.context', getHookContext(context));
      if (isDebug) debug(`Provider: ${context.params.provider ? context.params.provider : 'Not'}; ${context.type} app.service('${context.path}').${context.method}()`);
      if (isLog) inspector('constraints.all.hook.records:', records);
    };

    let idField;

    /**
     * Uniqueness check
     * @param query
     * @param id
     * @return {Promise.<void>}
     */
    const validateUnique = async (query = {}, id = null) => {
      let valid = true;
      const results = await context.service.find({query: query});
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

    /**
     * Relationship check
     * @param path
     * @param id
     * @return {Promise.<void>}
     */
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

    /**
     * Get item
     * @param path
     * @param id
     * @return {Promise.<*>}
     */
    // const getItem = async (path = '', id = null) => {
    //   const service = context.app.service(path);
    //   if (service) {
    //     const getResult = await service.get(id);
    //     if (isLog) inspector(`getItem(path='${path}', id='${id}').getResult:`, getResult);
    //     return getResult;
    //   } else {
    //     throw new errors.BadRequest(`There is no service for the path - '${path}'`);
    //   }
    // };

    /**
     * Find items
     * @param path
     * @param query
     * @return {Promise.<*>}
     */
    const findItems = async (path = '', query = {}) => {
      const service = context.app.service(path);
      if (service) {
        const findResults = await service.find({query: query});
        if (isLog) inspector(`findItems(path='${path}', query=${JSON.stringify(query)}).findResults:`, findResults.data);
        return findResults.data;
      } else {
        throw new errors.BadRequest(`There is no service for the path - '${path}'`);
      }
    };

    /**
     * Remove items
     * @param path
     * @param query
     * @return {Promise.<*>}
     */
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

    /**
     * Remove item
     * @param path
     * @param id
     * @return {Promise.<*>}
     */
    const removeItem = async (path = '', id = null) => {
      const service = context.app.service(path);
      if (service) {
        const removeResult = await service.remove(id);
        if (isLog) inspector(`removeItem(path='${path}', id=${id}).removeResult:`, removeResult);
        return removeResult;
      } else {
        throw new errors.BadRequest(`There is no service for the path - '${path}'`);
      }
    };

    /**
     * Patch items
     * @param path
     * @param data
     * @param query
     * @return {Promise.<*>}
     */
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

    /**
     * Create item
     * @param path
     * @param data
     * @return {Promise.<*>}
     */
    const createItem = async (path = '', data = {}) => {
      const service = context.app.service(path);
      if (service) {
        const createResults = await service.create(data);
        if (isLog) inspector(`createItem(path='${path}', data=${JSON.stringify(data)}).createResults:`, createResults);
        return createResults;
      } else {
        throw new errors.BadRequest(`There is no service for the path - '${path}'`);
      }
    };

    /**
     * Get roleId
     * @param isRole
     * @return {Promise.<string>}
     */
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
              if(roleId) record.roleId = roleId.toString();
            }
            if (context.method === 'create' && !record.profileId) {
              const newItem = await createItem('user-profiles');
              if(newItem){
                idField = 'id' in newItem ? 'id' : '_id';
                record.profileId = newItem[idField].toString();
              }
            }
          });
        } else {
          if (records.roleId) await validateRelationship('roles', records.roleId);
          if (context.method === 'create' && !records.roleId) {
            const roleId = await getRoleId('isGuest');
            if(roleId) records.roleId = roleId.toString();
          }
          if (context.method === 'create' && !records.profileId) {
            const newItem = await createItem('user-profiles');
            if(newItem){
              idField = 'id' in newItem ? 'id' : '_id';
              records.profileId = newItem[idField].toString();
            }
          }
        }
        break;
      case 'before.user-profiles.remove':
        showDebugInfo();
        if (Array.isArray(records)) {
          records.forEach(async record => {
            const idField = 'id' in record ? 'id' : '_id';
            const profileId = record[idField];
            let servicePath = 'users';
            const findResults = await findItems(servicePath, {profileId});
            if(findResults.length){
              throw new errors.BadRequest('Error deleting item from \'user-profiles\' service. You can not delete an item if it is referenced by other services.');
            }
          });
        } else {
          let profileId;
          if(records){
            const idField = 'id' in records ? 'id' : '_id';
            profileId = records[idField];
          }else {
            profileId = context.id;
          }
          let servicePath = 'users';
          const findResults = await findItems(servicePath, {profileId: profileId});
          if(Array.isArray(findResults) && findResults.length){
            throw new errors.BadRequest('Error deleting item from \'user-profiles\' service. You can not delete an item if it is referenced by other services.');
          }
        }
        break;
      case 'after.users.remove':
        showDebugInfo();
        if (Array.isArray(records)) {
          records.forEach(async record => {
            const idFieldUser = 'id' in record ? 'id' : '_id';
            const userId = record[idFieldUser].toString();
            const profileId = record.profileId.toString();
            // Remove items for 'user-teams' service
            let servicePath = 'user-teams';
            let removed = await removeItems(servicePath, {userId: userId});
            if (isDebug) debug(`after.users.remove: (${removed.length}) records have been removed from the ${servicePath} service`);

            // Remove item for 'user-profiles' service
            servicePath = 'user-profiles';
            removed = await removeItem(servicePath, {[idFieldUser]: profileId});
            if (isDebug) debug(`after.users.remove: record have been removed for id = '${removed[idFieldUser]}' from the ${servicePath} service`);
          });
        } else {
          const idFieldUser = 'id' in records ? 'id' : '_id';
          const userId = records[idFieldUser].toString();
          const profileId = records.profileId.toString();

          // Remove items for 'user-teams' service
          let servicePath = 'user-teams';
          let removed = await removeItems(servicePath, {userId: userId});
          if (isDebug) debug(`after.users.remove: (${removed.length}) records have been removed from the ${servicePath} service`);

          // Remove item for 'user-profiles' service
          servicePath = 'user-profiles';
          removed = await removeItem(servicePath, profileId);
          if (isDebug) debug(`after.users.remove: record have been removed for id = '${removed[idFieldUser]}' from the ${servicePath} service`);

          // removed = await removeItems(servicePath, {[idFieldUser]: profileId});
          // if (isDebug) debug(`after.users.remove: (${removed.length}) records have been removed from the ${servicePath} service`);
        }
        break;
      case 'after.teams.remove':
        showDebugInfo();
        if (Array.isArray(records)) {
          records.forEach(async record => {
            const idFieldTeam = 'id' in record ? 'id' : '_id';
            const teamId = record[idFieldTeam].toString();
            let servicePath = 'user-teams';
            const removed = await removeItems(servicePath, {teamId: teamId});
            if (isDebug) debug(`after.teams.remove: (${removed.length}) records have been removed from the ${servicePath} service`);
          });
        } else {
          const idFieldTeam = 'id' in records ? 'id' : '_id';
          const teamId = records[idFieldTeam].toString();
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
            const roleId = record[idFieldRole].toString();
            let servicePath = 'users';
            const guestId = await getRoleId('isGuest');
            if(guestId) {
              const data = {roleId: guestId.toString()};
              const updated = await patchItems(servicePath, data, {roleId: roleId});
              if (isDebug) debug(`after.roles.remove: (${updated.length}) records have been updated from the ${servicePath} service`);
            }
          });
        } else {
          const idFieldRole = 'id' in records ? 'id' : '_id';
          const roleId = records[idFieldRole].toString();
          let servicePath = 'users';
          const guestId = await getRoleId('isGuest');
          if(guestId) {
            const data = {roleId: guestId.toString()};
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
