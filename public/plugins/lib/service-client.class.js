// const loConcat = require('lodash/concat');
import fakeData from '~~/seeds/fake-data.json';
// import util from '~/plugins/lib/util';
const debug = require('debug')('app:plugins.service-client.class');

const isLog = false;
const isDebug = false;

class ServiceClient {
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
    if(isLog)debug('serviceFields.fields:', fields);
    return fields;
  }

  /**
   * Authenticate
   * @param credentials
   * @return {Promise.<*>}
   */
  async authenticate(credentials = null){
    let results;
    if(credentials){
      results = await this.dispatch('auth/authenticate', credentials);
    }else {
      results = await this.dispatch('auth/authenticate');
    }
    if(isDebug)debug('authenticate: OK', 'results:', results);
    return results;
  }

  /**
   * Logout
   * @return {Promise.<void>}
   */
  async logout(){
    await this.dispatch('auth/logout');
    if(isDebug)debug('logout: OK');
  }

  /**
   * Get auth user
   */
  getAuthUser(){
    const user = this.state.auth.user;
    if(isLog)debug('getUser:', user);
    return user;
  }

  /**
   * Clear all services from store
   */
  clearAll(){
    this.commit('users/clearAll');
    this.commit('roles/clearAll');
    this.commit('teams/clearAll');
    this.commit('user-teams/clearAll');
    this.commit('user-profiles/clearAll');
    if(isDebug)debug('clearAll: OK');
  }

  /**
   * Find all services for admin user
   * @return {Promise.<void>}
   */
  async findAllForAdmin(){
    // findUserTeams
    await this.find('user-teams', {query: {$sort: {teamId: 1, userId: 1}}});
    // findRoles
    await this.find('roles', {query: {$sort: {name: 1}}});
    // findTeams
    await this.find('teams', {query: {$sort: {name: 1}}});
    // findUsers
    await this.find('users', {query: {$sort: {lastName: 1}}});
    // findUserProfiles
    await this.find('user-profiles', {query: {$sort: {}}});

    if(isDebug)debug('findAllForAdmin: OK');
  }

  /**
   * Find all services for auth user
   * @return {Promise.<void>}
   */
  async findAllForUser(){

    const user = this.getAuthUser();
    if(user){
      // getRole
      await this.get('roles', user.roleId);
      // getUserProfiles
      await this.get('user-profiles', user.profileId);
      // getTeams
      const idFieldTeam = this.state.teams.idField;
      const idFieldUser = this.state.users.idField;
      const userId = user[idFieldUser];
      let teamIdsForUser = await this.find('user-teams', {query: {userId: userId, $sort: {teamId: 1}}});
      teamIdsForUser = teamIdsForUser.map(row => row.teamId.toString());
      await this.find('teams', {query: {[idFieldTeam]: {$in: teamIdsForUser}, $sort: {name: 1}}});
    }
    if(isDebug)debug('findAllForUser: OK');
  }

  /**
   * Find method, which is a proxy to the find action
   * @param path
   * @param params
   * @return {Promise.<*>}
   */
  async find(path, params = {}){
    let results = await this.dispatch(`${path}/find`, params);
    results = results.data || results;
    if(isLog)debug(`find.path: ${path}`, `find.params: ${JSON.stringify(params)}`, 'find.results:', results);
    return results;
  }

  /**
   * findInStore method, which is a proxy to the find getter
   * @param path
   * @param params
   * @return {Array}
   */
  findInStore(path, params = {}){
    let results = this.getters[`${path}/find`](params);
    results = results.data || results;
    if(isLog)debug(`findInStore.path: ${path}`, `findInStore.params: ${JSON.stringify(params)}`, 'findInStore.results:', results);
    return results;
  }

  /**
   * Get method, which is a proxy to the get action
   * @param path
   * @param id
   * @param params
   * @return {Promise.<*>}
   */
  async get(path, id, params = {}){
    let results = await this.dispatch(`${path}/get`, id, params);
    if(isLog)debug(`get.path: ${path}`, `get.id: ${id}`, 'get.results:', results);
    return results;
  }

  /**
   * getFromStore method, which is a proxy to the get getter
   * @param path
   * @param id
   * @param params
   * @return {Object}
   */
  getFromStore(path, id, params = {}){
    let results = this.getters[`${path}/get`](id, params);
    if(isLog)debug(`getFromStore.path: ${path}`, `getFromStore.id: ${id}`, 'getFromStore.results:', results);
    return results;
  }

}

export default ServiceClient;
