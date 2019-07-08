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

  // async logout({commit, dispatch}) {
  //   if(isDebug) debug('<<logout>>Start logout');
  //   // logout
  //   await dispatch('auth/logout');
  //   this.$util.removeAccessToken();
  //   // clearAll
  //   commit('users/clearAll');
  //   commit('roles/clearAll');
  //   commit('teams/clearAll');
  //   commit('user-teams/clearAll');
  //   commit('user-profiles/clearAll');
  // },

  async logout(store) {
    if(isDebug) debug('<<logout>> Start logout');
    const service = new this.$Service(store);
    // logout
    await service.logout();
    this.$util.removeAccessToken();
    service.clearAll();
  },

  async authenticate(store, credentials = null) {
    if(isDebug) debug('<<authenticate>> Start authenticate');
    const service = new this.$Service(store);
    // authenticate
    let response = await service.authenticate(credentials);
    if (response && response.accessToken) {
      const isAuth = store.getters.isAuth;
      const isAdmin = store.getters.isAdmin;
      if(isAdmin){
        await service.findAllForAdmin();
      }else {
        await service.findAllForUser();
      }
      if(isDebug) debug(`<<authenticate>> Authenticate completed; <<isAuth>>: ${isAuth}; <<myRole>>: ${store.getters.getMyRole}`);
    }
    return response;
  }
};

export default actions;
