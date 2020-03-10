import Vue from 'vue';
import Vuex from 'vuex';
import feathersVuex from 'feathers-vuex';
import feathersClient from '~/plugins/auth/feathers-client';

const {FeathersVuex} = feathersVuex(feathersClient, {idField: '_id'});

Vue.use(Vuex);
Vue.use(FeathersVuex);

const requireModule = require.context(
  // The relative path holding the service modules
  '~/services',
  // Whether to look in subfolders
  false,
  // Only include .js files (prevents duplicate imports)
  /.js$/
);

const servicePlugins = requireModule.keys().map(modulePath => requireModule(modulePath).default);

export const plugins = [
  ...servicePlugins
];

// To disable strict mode in dev
// This is to avoid errors when changing state without using mutations.
export const strict = false;


