
import { initAuth } from 'feathers-vuex';
const debug = require('debug')('app:store.actions');

const actions = {

  //--- ServerInit ---//
  async nuxtServerInit ({ commit, dispatch }, { req }) {

    debug(`nuxtServerInit start on ${process.server ? 'server' : 'client'}`);

    const _initAuth =  await initAuth({
      commit,
      dispatch,
      req,
      moduleName: 'auth',
      cookieName: 'feathers-jwt',
    });
    return _initAuth;
  },

  async checkAuth({ dispatch }){
    if(this.$util.isAccessToken()){
      try {
        const response = await dispatch('auth/authenticate');
        return response && response.accessToken;
      } catch (error) {
        if (error.message.includes('Could not find stored JWT')) {
          this.$util.removeAccessToken();
          return false;
        }else {
          console.error(error);
          throw error;
        }
      }
    }else {
      return false;
    }
  },

  async logout({ dispatch }){
    await dispatch('auth/logout');
    this.$util.removeAccessToken();
  }

};

export default actions;
