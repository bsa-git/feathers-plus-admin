// const loPick = require('lodash/pick');
import feathersVuex from 'feathers-vuex';
import feathersClient from '~/plugins/lib/feathers-client';
import normalize from '~/services/hooks/normalize';

const debug = require('debug')('app:service.user-teams');

// const isDebug = true;
const isLog = false;

const {service} = feathersVuex(feathersClient, {idField: '_id'});

const servicePath = 'user-teams';
const servicePlugin = service(servicePath, {
  instanceDefaults(data, {store, Model}) {
    const idField = store.state['user-teams'].idField;
    if (isLog) debug('ServiceInfo:', {
      servicePath: Model.servicePath,
      namespace: Model.namespace,
      idField: idField,
      data: data
    });
    return {};
  },
  getters: {
    userIdsForTeam: (state, getters) => (teamId = null) => {
      const _usersForTeam = getters.find({query: {teamId: teamId, $sort: {userId: 1}}}).data;
      return _usersForTeam.map(row => row.userId.toString());
    },
    teamIdsForUser: (state, getters) => (userId = null) => {
      const _teamsForUser = getters.find({query: {userId: userId, $sort: {teamId: 1}}}).data;
      return _teamsForUser.map(row => row.teamId.toString());
    },
  },
});

feathersClient.service(servicePath)
  .hooks({
    before: {
      all: [],
      find: [],
      get: [],
      create: [normalize()],
      update: [normalize()],
      patch: [normalize()],
      remove: []
    },
    after: {
      all: [],
      find: [],
      get: [],
      create: [],
      update: [],
      patch: [],
      remove: []
    },
    error: {
      all: [],
      find: [],
      get: [],
      create: [],
      update: [],
      patch: [],
      remove: []
    }
  });

export default servicePlugin;
