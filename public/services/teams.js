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
        let teams = {};
        let userTeams = Models.UserTeam.findInStore({query: {$sort: {teamId: 1, userId: 1}}}).data;
        userTeams.forEach(userTeam => {
          if (!teams[userTeam.teamId]) {
            teams[userTeam.teamId] = [];
          }
          teams[userTeam.teamId].push(userTeam.userId);
        });
        if(isLog)debug('members.teams:', teams);
        const userIds = teams[teamId] ? teams[teamId] : [];
        if(isLog)debug('members.userIds:', userIds);
        let members = userIds.map(userId => {
          let user = Models.User.getFromStore(userId);
          if (user) {
            const id = user[idFieldUser];
            user = loPick(user, ['email', 'fullName', 'avatar']);
            user.id = id;
          } else {
            user = null;
          }
          return user;
        });
        if(isLog)debug('members:', members);
        members = members.filter(member => !(member === null));
        return members;
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
