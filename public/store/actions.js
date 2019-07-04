import {initAuth} from 'feathers-vuex';
const debug = require('debug')('app:store.actions');

const isLog = false;
const isDebug = true;

const actions = {

  //--- ServerInit ---//
  async nuxtServerInit({commit, dispatch}, {req}) {
    if(isDebug) debug(`Start nuxtServerInit on ${process.server ? 'server' : 'client'}`);
    let _initAuth = null;
    if (process.server && !process.static) {
      _initAuth = await initAuth({
        commit,
        dispatch,
        req,
        moduleName: 'auth',
        cookieName: 'feathers-jwt',
      });
    }
    return _initAuth;
  },

  async checkAuth({dispatch}) {
    if (this.$util.isAccessToken()) {
      try {
        if(isDebug) debug('<<checkAuth>>Start checkAuth');
        // let response = await dispatch('auth/authenticate');
        let response = await dispatch('authenticate');
        const result = (!!response && !!response.accessToken);
        if (isLog && result) debug('<<checkAuth>>Response accessToken:', response);
        return result;
      } catch (error) {
        if (error.message.includes('Could not find stored JWT')) {
          this.$util.removeAccessToken();
          return false;
        } else {
          console.error(error);
          throw error;
        }
      }
    } else {
      return false;
    }
  },

  async logout({commit, dispatch, getters}) {
    if(isDebug) debug('<<logout>>Start logout');
    // logout
    await dispatch('auth/logout');
    this.$util.removeAccessToken();
    // clearAll
    commit('users/clearAll');
    commit('roles/clearAll');
    commit('teams/clearAll');
    commit('user-teams/clearAll');
    // Go to homePath
    const config = getters.getConfig;
    this.$redirect(config.homePath);
  },

  async authenticate({dispatch, getters}, credentials = null) {
    let response;
    if(isDebug) debug('<<authenticate>>Start authenticate');
    // authenticate
    if (credentials) {
      response = await dispatch('auth/authenticate', credentials);
    } else {
      response = await dispatch('auth/authenticate');
    }
    // Get users data only for admins
    if (response && response.accessToken) {
      const isAuth = getters.isAuth;
      const isAdmin = getters.isAdmin;
      if(isDebug) debug(`<<authenticate>>Authenticate completed; <<isAuth>>: ${isAuth}; <<myRole>>: ${getters.getMyRole}`);
      // return response;
      if(!isAdmin) return response;
      // findUserTeams
      let userTeams = await dispatch('user-teams/find', {query: {$sort: {teamId: 1, userId: 1}}});
      userTeams = userTeams.data || userTeams;
      if (isLog) debug('<<authenticate>>userTeams from server:', userTeams);
      // findRoles
      let roles = await dispatch('roles/find', {query: {$sort: {name: 1}}});
      roles = roles.data || roles;
      if (isLog) debug('<<authenticate>>Roles from server:', roles);
      // findTeams
      let teams = await dispatch('teams/find', {query: {$sort: {name: 1}}});
      teams = teams.data || teams;
      if (isLog) debug('<<authenticate>>Teams from server:', teams);
      // findUsers
      let users = await dispatch('users/find', {query: {$sort: {lastName: 1}}});
      users = users.data || users;
      if (isLog) debug('<<authenticate>>Users from server:', users);
      // findUserProfiles
      let userProfiles = await dispatch('user-profiles/find', {query: {$sort: {}}});
      userProfiles = userProfiles.data || userProfiles;
      if (isLog) debug('<<authenticate>>userProfiles from server:', userProfiles);
    }
    return response;
  }
};

export default actions;
