
import { initAuth } from 'feathers-vuex';

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
};

export default actions;
