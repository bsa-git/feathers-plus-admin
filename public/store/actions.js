import {initAuth} from 'feathers-vuex';
const debug = require('debug')('app:store.actions');

const isLog = false;

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
        let response = await dispatch('auth/authenticate');
        const result = (!!response && !!response.accessToken);
        debug('checkAuth.accessToken:');
        if (isLog && result) this.$util.inspector('Response accessToken:', response);
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

  async logout({commit, dispatch}) {
    await dispatch('auth/logout');
    this.$util.removeAccessToken();
    commit('users/clearAll');
    debug('logout');
  }

};

export default actions;
