const errors = require('@feathersjs/errors');
const {getCapitalizeStr} = require('../lib');
const AuthServer = require('../auth/auth-server.class');
const HookHelper = require('./hook-helper.class');
const debug = require('debug')('app:plugins.servicesConstraint');

const isDebug = false;
// const isLog = false;

/**
 * Services constraint
 * @param context
 * @return {Promise.<void>}
 */
module.exports = async function servicesConstraint(context) {
  // Create HookHelper object
  const hookHelper = new HookHelper(context);
  // Create AuthServer object
  const authServer = new AuthServer(context);

  // Get max rows for log-messages service
  let maxRows = process.env.LOGMSG_MAXROWS;
  maxRows = Number.isInteger(maxRows)? maxRows : Number.parseInt(maxRows);

  let idField, validate, normalize;

  //----- SERVICES CONSTRAINT ---//
  switch (`${hookHelper.contextPath}.${hookHelper.contextMethod}.${hookHelper.contextType}`) {
  case 'user-teams.create.before':
    validate = async (record) => {
      await hookHelper.validateUnique('user-teams', {teamId: record.teamId, userId: record.userId});
      await hookHelper.validateRelationship('teams', record.teamId);
      await hookHelper.validateRelationship('users', record.userId);
    };
    await hookHelper.forEachRecords(validate);
    break;
  case 'users.create.before':
  case 'users.patch.before':
    validate = async (record) => {
      if (record.roleId) await hookHelper.validateRelationship('roles', record.roleId);
      if (hookHelper.contextMethod === 'create' && !record.roleId) {
        const roleId = await authServer.getRoleId('isGuest');
        if(roleId) record.roleId = roleId.toString();
      }
      if (hookHelper.contextMethod === 'create' && !record.profileId) {
        const newItem = await hookHelper.createItem('user-profiles');
        if(newItem){
          idField = HookHelper.getIdField(newItem);
          record.profileId = newItem[idField].toString();
        }
      }
    };
    await hookHelper.forEachRecords(validate);
    break;
  case 'user-profiles.remove.before':
    validate = async () => {
      const profileId = hookHelper.getContextId();
      const servicePath = 'users';
      const findResults = await hookHelper.findItems(servicePath, {profileId});
      if(findResults.length){
        throw new errors.BadRequest('Error deleting item from \'user-profiles\' service. You can not delete an item if it is referenced by other services.');
      }
    };
    await validate();
    break;
  case 'roles.remove.before':
    validate = async () => {
      const roleId = hookHelper.getContextId();
      const servicePath = 'roles';
      const getResult = await hookHelper.getItem(servicePath, roleId);
      if(getResult && AuthServer.isBaseRole(getResult.name)){
        throw new errors.BadRequest('Error deleting item from \'roles\' service. You can not delete an item if it is base role.');
      }
    };
    await validate();
    break;
  case 'roles.create.before':
  case 'roles.patch.before':
  case 'teams.create.before':
  case 'teams.patch.before':
    normalize = async (record) => {
      let alias = '', _record = {};
      alias = record.name? getCapitalizeStr(record.name, 'is') : '';
      // if(isDebug) debug('beforeNormalizeAlias.alias:', alias);
      if(alias && record.alias !== alias){
        _record.alias = alias;
      }
      Object.assign(record, _record);
    };
    await hookHelper.forEachRecords(normalize);
    break;
  case 'users.create.after':
  case 'users.patch.after':
  case 'users.get.after':
  case 'users.find.after':
    normalize = async (record) => {
      if(!record.roleAlias){
        const role = await hookHelper.getItem('roles', record.roleId);
        record.roleAlias = role.alias;
      }
    };
    await hookHelper.forEachRecords(normalize);
    break;
  case 'users.remove.after':
    validate = async (record) => {
      const idFieldUser = HookHelper.getIdField(record);
      const userId = record[idFieldUser].toString();
      const profileId = record.profileId.toString();
      // Remove items for 'user-teams' service
      let servicePath = 'user-teams';
      let removed = await hookHelper.removeItems(servicePath, {userId: userId});
      if (isDebug) debug(`after.users.remove: (${removed.length}) records have been removed from the "${servicePath}" service`);
      // Remove item for 'user-profiles' service
      servicePath = 'user-profiles';
      removed = await hookHelper.removeItem(servicePath, {[idFieldUser]: profileId});
      if (isDebug) debug(`after.users.remove: record have been removed for id = '${removed[idFieldUser]}' from the "${servicePath}" service`);
    };
    normalize = async (record) => {
      if(!record.roleAlias){
        const role = await hookHelper.getItem('roles', record.roleId);
        record.roleAlias = role.alias;
      }
    };
    await hookHelper.forEachRecords(validate);
    await hookHelper.forEachRecords(normalize);
    break;
  case 'teams.remove.after':
    validate = async (record) => {
      const idFieldTeam = HookHelper.getIdField(record);
      const teamId = record[idFieldTeam].toString();
      let servicePath = 'user-teams';
      const removed = await hookHelper.removeItems(servicePath, {teamId: teamId});
      if (isDebug) debug(`after.teams.remove: (${removed.length}) records have been removed from the "${servicePath}" service`);
    };
    await hookHelper.forEachRecords(validate);
    break;
  case 'roles.remove.after':
    validate = async (record) => {
      const idFieldRole = HookHelper.getIdField(record);
      const roleId = record[idFieldRole].toString();
      let servicePath = 'users';
      const guestId = await authServer.getRoleId('isGuest');
      if(guestId) {
        const data = {roleId: guestId.toString()};
        const updated = await hookHelper.patchItems(servicePath, data, {roleId: roleId});
        if (isDebug) debug(`after.roles.remove: (${updated.length}) records have been updated from the "${servicePath}" service`);
      }
    };
    await hookHelper.forEachRecords(validate);
    break;
  case 'log-messages.create.after':
    await hookHelper.restrictMaxRows('log-messages', maxRows);
    break;
  default:
    break;
  }
  return hookHelper.contextRecords;
};
