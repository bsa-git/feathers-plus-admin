// const loConcat = require('lodash/concat');
import fakeData from '~~/seeds/fake-data.json';
import typeOf from '~/plugins/lib/type-of';
// import {use} from "vee-validate/dist/vee-validate.minimal.esm";
const loKebabCase = require('lodash/kebabCase');
const loMerge = require('lodash/merge');
const errors = require('@feathersjs/errors');
const debug = require('debug')('app:plugins.service-client.class');

const isLog = false;
const isDebug = false;

class Service {
  /**
   * Constructor
   * @param store
   */
  constructor(store) {
    this.store = store;
    this.state = store.state;
    this.getters = store.getters;
    this.dispatch = store.dispatch;
    this.commit = store.commit;
    this.config = store.getters.getConfig;
    const {auth} = store.state;
    this.user = auth.user;
    if (isDebug) debug('Created.OK');
  }

  /**
   * Get service fields
   * @param serviceName
   * @param isId
   * @return {Array.<*>}
   */
  static serviceFields(serviceName = '', isId = false) {
    const serviceFakeData = fakeData[serviceName][0];
    const idField = 'id' in serviceFakeData ? 'id' : '_id';
    const fields = Object.keys(serviceFakeData).filter(key => isId ? true : key !== idField);
    if (isLog) debug('serviceFields.fields:', fields);
    return fields;
  }

  /**
   * Get service paths
   * @return {Array}
   */
  static getServicePaths() {
    const paths = Object.keys(fakeData).map(key => loKebabCase(key).toLowerCase());
    if (isDebug) debug('getServicePaths:', paths);
    return paths;
  }

  /**
   * Get id field
   * @param items {Array || Object}
   * @return {string}
   */
  static getIdField(items) {
    let idField = '';
    if (Array.isArray(items) && items.length) {
      idField = 'id' in items[0] ? 'id' : '_id';
    }
    if (typeOf.isObject(items) && Object.keys(items).length) {
      idField = 'id' in items ? 'id' : '_id';
    }
    if(!idField){
      throw new errors.GeneralError('Items argument is not an array or object');
    }
    return idField ;
  }

  /**
   * Get service id field
   * @param path {String}
   * @return {string}
   */
  getServiceIdField(path = '') {
    return this.state[path].idField;
  }

  /**
   * Authenticate
   * @param credentials
   * @return {Promise.<*>}
   */
  async authenticate(credentials = null) {
    let result;
    if (credentials) {
      result = await this.dispatch('auth/authenticate', credentials);
    } else {
      result = await this.dispatch('auth/authenticate');
    }
    if (isDebug) debug('authenticate: OK', 'result:', result);
    return result;
  }

  /**
   * Logout
   * @return {Promise.<void>}
   */
  async logout() {
    await this.dispatch('auth/logout');
    if (isDebug) debug('logout: OK');
  }

  /**
   * Get auth user
   */
  getAuthUser() {
    const user = this.state.auth.user;
    if (isLog) debug('getUser:', user);
    return user;
  }

  /**
   * Get auth user id
   */
  getAuthUserId() {
    const user = this.getAuthUser();
    const idField = user? Service.getIdField(user) : '';
    return idField? user[idField] : '';
  }

  /**
   * Clear all services from store
   */
  clearAll() {
    const paths = Service.getServicePaths();
    paths.forEach(path => this.commit(`${path}/clearAll`));
    if (isDebug) debug('clearAll: OK');
  }

  /**
   * Get user for userId
   * @param userId
   * @return {Promise.<void>}
   */
  async getUserForUserId(userId) {
    if(!this.getFromStore('users', userId)){
      const user = await this.get('users', userId);
      await this.get('user-profiles', user.profileId);
      if(!this.getFromStore('roles', user.roleId)){
        await this.get('roles', user.roleId);
      }
    }
  }

  /**
   * Find all services for admin user
   * @return {Promise.<void>}
   */
  async findAllForAdmin() {
    if (isDebug) debug('findAllForAdmin: START');
    // Find chat messages for user
    const user = this.getAuthUser();
    if (user) {
      const paths = Service.getServicePaths().filter(path => path !== 'chat-messages' && path !== 'user-teams');
      paths.forEach(path => this.findAll(path, {query: {}}));
      // Find all chat messages for admin
      await this.findChatMessagesForAdmin(user);
    }
  }

  /**
   * Find all chat messages for admin
   * @param user {Object}
   * @return {Promise.<void>}
   */
  async findChatMessagesForAdmin(user) {
    const idField = this.getServiceIdField('users');
    const userId = user[idField];
    // Find chat messages
    await this.findAll('user-teams', {query: {}});
    const teamIdsForUser = this.getters.getTeamIdsForUser(userId);
    // getTeamIdsForUser
    await this.findAll('chat-messages', {query: {$or: [
      {ownerId: userId},
      {userId: userId},
      {roleId: user.roleId},
      { teamId: { $in: teamIdsForUser}}
    ]}});
  }

  /**
   * Find all services for auth user
   * @return {Promise.<void>}
   */
  async findAllForUser() {
    if (isDebug) debug('findAllForUser: START');
    const user = this.getAuthUser();
    if (user) {
      // getRole
      await this.get('roles', user.roleId);
      await this.find('roles', {query: {alias: 'isAdministrator'}});
      // getUserProfiles
      await this.get('user-profiles', user.profileId);
      // getTeams
      const idFieldTeam = this.state.teams.idField;
      const idFieldUser = this.state.users.idField;
      const userId = user[idFieldUser];

      // Find teams for user
      let teamIdsForUser = await this.findAll('user-teams', {query: {userId: userId, $sort: {teamId: 1}}});
      teamIdsForUser = teamIdsForUser.map(row => row.teamId.toString());
      if(teamIdsForUser.length){
        await this.findAll('teams', {query: {[idFieldTeam]: {$in: teamIdsForUser}, $sort: {name: 1}}});
      }
      // Find log messages
      let logMessages = await this.findAll('log-messages', {query: {userId: userId}});
      logMessages = logMessages.filter(msg => msg.ownerId !== msg.userId);
      if(logMessages.length){
        let ownerIds = logMessages.map(msg => msg.ownerId);
        // Get users for log-messages ownerIds
        for (let i = 0; i < ownerIds.length; i++) {
          const ownerId = ownerIds[i];
          await this.getUserForUserId(ownerId);
        }
      }
      // Find chat messages for user
      await this.findChatMessagesForUser(user);
    }
  }

  /**
   * Find all chat messages for user
   * @param user {Object}
   * @return {Promise.<void>}
   */
  async findChatMessagesForUser(user) {
    const idField = this.getServiceIdField('users');
    const authUserId = user[idField];
    // Find chat messages
    const teamIdsForUser = this.getters.getTeamIdsForUser(authUserId);
    const chatMessages = await this.findAll('chat-messages', {query: {$or: [
      {ownerId: authUserId},
      {userId: authUserId},
      {roleId: user.roleId},
      { teamId: { $in: teamIdsForUser}}
    ]}});
    // Get users for chatMessages
    for (let i = 0; i < chatMessages.length; i++) {
      const msg = chatMessages[i];
      const msgOwnerId = msg['ownerId'];
      const msgUserId = msg['user']?  msg['userId'] : null;
      if(msgOwnerId !== authUserId && !this.getFromStore('users', msgOwnerId)){
        await this.getUserForUserId(msgOwnerId);
      }
      if(msgUserId && msgUserId !== authUserId && !this.getFromStore('users', msgUserId)){
        await this.getUserForUserId(msgUserId);
      }
    }
  }

  /**
   * Find chat messages for role
   * @param roleId
   * @return {Promise.<void>}
   */
  async findChatMessagesForRole(roleId) {
    const idUserField = this.getServiceIdField('users');
    const authUserId = this.user[idUserField];
    // Find chat messages
    if(!this.getFromStore('roles', roleId)){
      await this.get('roles', roleId);

      let chatMessages = this.findInStore('chat-messages', {query: {roleId: roleId}});
      if(!chatMessages.length){
        chatMessages = await this.find('chat-messages', {query: {roleId: roleId}});
        // Get users for chatMessages
        for (let i = 0; i < chatMessages.length; i++) {
          const msg = chatMessages[i];
          const msgOwnerId = msg['ownerId'];
          const msgUserId = msg['user']?  msg['userId'] : null;
          if(msgOwnerId !== authUserId && !this.getFromStore('users', msgOwnerId)){
            await this.getUserForUserId(msgOwnerId);
          }
          if(msgUserId && msgUserId !== authUserId && !this.getFromStore('users', msgUserId)){
            await this.getUserForUserId(msgUserId);
          }
        }
      }
    }
  }

  /**
   * Find chat messages for team
   * @param teamId
   * @return {Promise.<void>}
   */
  async findChatMessagesForTeam(teamId) {
    const idUserField = this.getServiceIdField('users');
    const authUserId = this.user[idUserField];
    // Find chat messages
    if(!this.getFromStore('teams', teamId)){
      await this.get('teams', teamId);

      let chatMessages = this.findInStore('chat-messages', {query: {teamId: teamId}});
      if(!chatMessages.length){
        chatMessages = await this.find('chat-messages', {query: {teamId: teamId}});
        // Get users for chatMessages
        for (let i = 0; i < chatMessages.length; i++) {
          const msg = chatMessages[i];
          const msgOwnerId = msg['ownerId'];
          const msgUserId = msg['user']?  msg['userId'] : null;
          if(msgOwnerId !== authUserId && !this.getFromStore('users', msgOwnerId)){
            await this.getUserForUserId(msgOwnerId);
          }
          if(msgUserId && msgUserId !== authUserId && !this.getFromStore('users', msgUserId)){
            await this.getUserForUserId(msgUserId);
          }
        }
      }
    }
  }

  //==============================================================================================//

  /**
   * Find method, which is a proxy to the find action
   * @param path
   * @param params
   * @return {Promise.<*>}
   */
  async find(path, params = {}) {
    let results = await this.dispatch(`${path}/find`, params);
    results = results.data || results;
    if (isLog) debug(`find.path: ${path}`, `find.params: ${JSON.stringify(params)}`, 'find.results:', results);
    return results;
  }

  /**
   * Find count method, which is a proxy to the find action
   * @param path
   * @param params
   * @return {Promise.<*>}
   */
  async findCount(path, params = {}) {
    const newParams = loMerge(params, {query: {$limit: 0}});
    let results = await this.dispatch(`${path}/find`, newParams);
    results = results.total;
    if (isLog) debug(`findCount.path: ${path}`, `findCount.params: ${JSON.stringify(newParams)}`, 'findCount.results:', results);
    return results;
  }

  /**
   * Find all method, which is a proxy to the find action
   * @param path
   * @param params
   * @return {Promise.<*>}
   */
  async findAll(path, params = {}) {
    const newParams = loMerge(params, {query: {$limit: null}});
    let results = await this.dispatch(`${path}/find`, newParams);
    if (isLog) debug(`findAll.path: ${path}`, `findAll.params: ${JSON.stringify(newParams)}`, 'findAll.results:', results);
    results = results.data || results;
    return results;
  }

  /**
   * findInStore method, which is a proxy to the find getter
   * @param path
   * @param params
   * @return {Array}
   */
  findInStore(path, params = {}) {
    let results = this.getters[`${path}/find`](params);
    results = results.data || results;
    if (isLog) debug(`findInStore.path: ${path}`, `findInStore.params: ${JSON.stringify(params)}`, 'findInStore.results:', results);
    return results;
  }

  /**
   * findCountInStore method, which is a proxy to the find getter
   * @param path
   * @param params
   * @return {Array}
   */
  findCountInStore(path, params = {}) {
    const newParams = loMerge(params, {query: {$limit: 0}});
    let results = this.getters[`${path}/find`](newParams);
    results = results.total;
    if (isLog) debug(`findCountInStore.path: ${path}`, `findCountInStore.params: ${JSON.stringify(newParams)}`, 'findCountInStore.results:', results);
    return results;
  }

  /**
   * findAllInStore method, which is a proxy to the find getter
   * @param path
   * @param params
   * @return {Array}
   */
  findAllInStore(path, params = {}) {
    const newParams = loMerge(params, {query: {$limit: null}});
    let results = this.getters[`${path}/find`](newParams);
    results = results.data || results;
    if (isLog) debug(`findAllInStore.path: ${path}`, `findAllInStore.params: ${JSON.stringify(newParams)}`, 'findAllInStore.results:', results);
    return results;
  }

  /**
   * Get method, which is a proxy to the get action
   * @param path
   * @param id
   * @param params
   * @return {Promise.<*>}
   */
  async get(path, id, params = {}) {
    let results = await this.dispatch(`${path}/get`, id, params);
    if (isLog) debug(`get.path: ${path}`, `get.id: ${id}`, 'get.results:', results);
    return results;
  }

  /**
   * getFromStore method, which is a proxy to the get getter
   * @param path
   * @param id
   * @param params
   * @return {Object}
   */
  getFromStore(path, id, params = {}) {
    let results = this.getters[`${path}/get`](id, params);
    if (isLog) debug(`getFromStore.path: ${path}`, `getFromStore.id: ${id}`, 'getFromStore.results:', results);
    return results;
  }

  /**
   * Create method, which is a proxy to the create action
   * @param path
   * @param data {Object|Array}
   * @param params
   * @return {Object}
   */
  async create(path, data, params = {}) {
    let results = await this.dispatch(`${path}/create`, [data, params]);
    if (isLog) debug(`create.path: ${path}`, `create.data: ${data}`, 'create.results:', results);
    return results;
  }

  /**
   * Patch method, which is a proxy to the patch action
   * @param path
   * @param id
   * @param data {Object}
   * @param params
   * @return {Object}
   */
  async patch(path, id, data, params = {}) {
    let results = await this.dispatch(`${path}/patch`, [id, data, params]);
    if (isLog) debug(`patch.path: ${path}`, `patch.id: ${id}`, `patch.data: ${data}`, 'patch.results:', results);
    return results;
  }

  /**
   * Remove method, which is a proxy to the remove action
   * @param path
   * @param id {Number|String}
   * @return {Object}
   */
  async remove(path, id) {
    let results = await this.dispatch(`${path}/remove`, id);
    if (isLog) debug(`remove.path: ${path}`, `remove.id: ${id}`, 'remove.results:', results);
    return results;
  }
}

export default Service;
