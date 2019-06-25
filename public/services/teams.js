const loPick = require('lodash/pick');
import feathersVuex from 'feathers-vuex';
import feathersClient from '~/plugins/lib/feathers-client';
import normalize from '~/services/hooks/normalize';

const debug = require('debug')('app:service.teams');

const isLog = false;
// const isDebug = true;

const {service} = feathersVuex(feathersClient, {idField: '_id'});

const servicePath = 'teams';
const servicePlugin = service(servicePath, {
  instanceDefaults(data, {store, Model, Models}) {
    const idField = store.state.teams.idField;
    if (isLog) debug('ServiceInfo:', {
      servicePath: Model.servicePath,
      namespace: Model.namespace,
      idField: idField,
      data: data
    });
    return {
      name: '',
      description: '',
      get members() {
        const idFieldUser = store.state.users.idField;
        const idFieldTeam = store.state.teams.idField;
        const teamId = data[idFieldTeam];
        let userIdsForTeam = Models.UserTeam.findInStore({query: {teamId: teamId, $sort: {userId: 1}}}).data;
        userIdsForTeam = userIdsForTeam.map(row => row.userId.toString());
        if(isLog)debug('members.userIdsForTeam:', userIdsForTeam);
        let usersForTeam = Models.User.findInStore({query: {[idFieldUser]: {$in: userIdsForTeam}, $sort: {fullName: 1}}}).data;
        usersForTeam = usersForTeam.map(row => {
          return {
            id: row[idFieldUser],
            email: row.email,
            fullName: row.fullName,
            avatar: row.avatar
          };
        });
        if(isLog)debug('members.usersForTeam:', usersForTeam);
        return  usersForTeam;
      },
    };
  },
  getters: {},
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
