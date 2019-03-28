import Vue from 'vue';
import Vuex from 'vuex';
import feathersVuex from 'feathers-vuex';
import feathersClient from '~/plugins/lib/feathers-client';
import usersPlugin from '~/services/users';
import authPlugin from '~/services/auth';

const {FeathersVuex} = feathersVuex(feathersClient, {idField: '_id'});

Vue.use(Vuex);
Vue.use(FeathersVuex);

export const plugins = [
  // service('roles', { paginate: true }),
  usersPlugin,
  // service('teams', { paginate: true }),
  // service('graphql', { paginate: true }),
  authPlugin
];


