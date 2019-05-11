import feathersVuex from 'feathers-vuex';
import feathersClient from '~/plugins/lib/feathers-client';
import normalizeQuery from '~/services/hooks/normalize-query';

const debug = require('debug')('app:service.teams');

const isLog = false;
// const isDebug = true;

const {service} = feathersVuex(feathersClient, {idField: '_id'});

const servicePath = 'teams';
const servicePlugin = service(servicePath, {
  instanceDefaults(data, {store, Model}) {
    const idField = store.state.teams.idField;
    if (isLog) debug('ServiceInfo:', {
      servicePath: Model.servicePath,
      namespace: Model.namespace,
      idField: idField,
      data: data
    });
    return {
      name: '',
      memberIds: [],
    };
  },
  getters: {
    getTeamsForUser: (state, getters) => (userId = null) => {
      const idField = state.idField;
      let teams = getters.find({query: {$sort: {name: 1}}}).data;
      return teams.filter(team => {
        return team.memberIds.indexOf(userId) !== -1;
      }).map(team => {
        return {[idField]: team[idField], name: team['name']};
      });
    },
  },
});

feathersClient.service(servicePath)
  .hooks({
    before: {
      all: [],
      find: [],
      get: [],
      create: [normalizeQuery({service: 'teams'})],
      update: [normalizeQuery({service: 'teams'})],
      patch: [normalizeQuery({service: 'teams'})],
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
