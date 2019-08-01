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

  async logout(store) {
    if(isDebug) debug('<<logout>> Start logout');
    const service = new this.$Service(store);
    // logout
    await service.logout();
    // Remove access token
    if(this.$util.isAccessToken){
      this.$util.removeAccessToken();
    }
    service.clearAll();
    const isAuth = store.getters.isAuth;
    const myRole = store.getters.getMyRole? store.getters.getMyRole : 'No';
    if(isDebug) debug(`<<logout>> Logout completed; <<isAuth>>: ${isAuth}; <<myRole>>: ${myRole}`);
  },

  async authenticate(store, credentials = null) {
    if(isDebug) debug('<<authenticate>> Start authenticate');
    const service = new this.$Service(store);
    // authenticate
    let response = await service.authenticate(credentials);
    if (response && response.accessToken) {
      const isAuth = store.getters.isAuth;
      const isAdmin = store.getters.isAdmin;
      // Set access token
      if(!this.$util.isAccessToken){
        this.$util.setAccessToken(response.accessToken);
      }
      if(isAdmin){
        await service.findAllForAdmin();
      }else {
        await service.findAllForUser();
      }
      if(isDebug) debug(`<<authenticate>> Authenticate completed; <<isAuth>>: ${isAuth}; <<myRole>>: ${store.getters.getMyRole? store.getters.getMyRole : 'No'}`);
    }
    return response;
  }
};

export default actions;
