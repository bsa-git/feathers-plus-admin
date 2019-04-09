import Vue from 'vue';
import Vuex from 'vuex';
import feathersVuex from 'feathers-vuex';
import feathersClient from '~/plugins/lib/feathers-client';

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


