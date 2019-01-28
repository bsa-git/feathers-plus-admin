import Vue from 'vue';
import Vuex from 'vuex';
import state from '~/store/state';
import getters from '~/store/getters';
import mutations from '~/store/mutations';
import actions from '~/store/actions';
import feathersVuex from 'feathers-vuex';
import feathersClient from '~/plugins/lib/feathers-client';
// import feathersClient from '~/plugins/lib/feathers-client-es5';

const { service, auth, FeathersVuex } = feathersVuex(feathersClient, { idField: '_id' });

Vue.use(Vuex);
Vue.use(FeathersVuex);

const createStore = () => {
  return new Vuex.Store({
    strict: false,
    state: state,
    getters: getters,
    mutations: mutations,
    actions: actions,
    plugins: [
      service('users'),
      auth({
        userService: 'users'
      })
    ]
  });
};

export default createStore;

