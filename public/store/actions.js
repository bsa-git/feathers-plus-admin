
import { initAuth } from 'feathers-vuex';
import util from '~/plugins/lib/util';

const actions = {

  //--- ServerInit ---//
  async nuxtServerInit ({ commit, dispatch }, { req }) {
    let userId = null;
    const _initAuth =  await initAuth({
      commit,
      dispatch,
      req,
      moduleName: 'auth',
      cookieName: 'feathers-jwt',
    });
    if(_initAuth && _initAuth.userId){
      userId = _initAuth.userId;
    }
    console.log('nuxtServerInit.initAuth.userId:', userId);
    return _initAuth;
  },

  async checkAuth({ dispatch }){
    if(util.isAccessToken()){
      try {
        const response = await dispatch('auth/authenticate');
        return response && response.accessToken;
      } catch (error) {
        if (error.message.includes('Could not find stored JWT')) {
          util.removeAccessToken();
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
    util.removeAccessToken();
  }

};

export default actions;
