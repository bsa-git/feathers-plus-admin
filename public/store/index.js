import Vue from 'vue';
import Vuex from 'vuex';
import state from '~/store/state';
import getters from '~/store/getters';
import mutations from '~/store/mutations';
import feathersVuex from 'feathers-vuex';
import feathersClient from '~/plugins/lib/feathers-client';

const { service, auth, FeathersVuex } = feathersVuex(feathersClient, { idField: '_id' });

Vue.use(Vuex);
Vue.use(FeathersVuex);

const createStore = () => {
  return new Vuex.Store({
    strict: false,
    state: state,
    getters: getters,
    mutations: mutations,
    plugins: [
      service('users'),
      auth({
        userService: 'users'
      })
    ]
  });
};

export default createStore;

