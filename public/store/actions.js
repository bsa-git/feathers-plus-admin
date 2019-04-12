import {initAuth} from 'feathers-vuex';

const debug = require('debug')('app:store.actions');

const isLog = true;

const actions = {

  //--- ServerInit ---//
  async nuxtServerInit({commit, dispatch}, {req}) {
    debug(`nuxtServerInit start on ${process.server ? 'server' : 'client'}`);
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
        // let response = await dispatch('auth/authenticate');
        let response = await dispatch('authenticate');
        const result = (!!response && !!response.accessToken);
        debug('checkAuth.accessToken:');
        if (isLog && result) debug('Response accessToken:', response);
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
    debug('logout');
    // logout
    await dispatch('auth/logout');
    this.$util.removeAccessToken();
    // clearAll
    commit('users/clearAll');
    commit('roles/clearAll');
    commit('teams/clearAll');
    // Go to homePath
    const config = getters.getConfig;
    this.$redirect(config.homePath);
  },

  async authenticate({dispatch, getters}, credentials = null) {
    let response;
    // authenticate
    if (credentials) {
      response = await dispatch('auth/authenticate', credentials);
    } else {
      response = await dispatch('auth/authenticate');
    }

    if (response && response.accessToken) {
      // The delay is needed to fully create a user object in store
      await this.$util.delayTime(1);
      const user = getters.getUser;
      const isAuth = !!user;
      const isAdmin = isAuth ? user.isAdmin : false;
      debug(`Run authenticate; <<isAuth>>: ${isAuth}; <<isAdmin>>: ${isAdmin}`);
      if(!isAdmin) return response;
      // findRoles
      let roles = await dispatch('roles/find', {query: {$sort: {name: 1}}});
      roles = roles.data || roles;
      if (isLog) debug('Roles from server:', roles);
      // findTeams
      let teams = await dispatch('teams/find', {query: {$sort: {name: 1}}});
      teams = teams.data || teams;
      if (isLog) debug('Teams from server:', teams);
      // findUsers
      let users = await dispatch('users/find', {query: {$sort: {lastName: 1}}});
      users = users.data || users;
      if (isLog) debug('Users from server:', users);
    }
    return response;
  }
};

export default actions;
