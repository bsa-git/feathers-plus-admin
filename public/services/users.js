const loPick = require('lodash/pick');
import feathersVuex from 'feathers-vuex';
import feathersClient from '~/plugins/lib/feathers-client';
import normalize from '~/services/hooks/normalize';
import log from '~/services/hooks/log';

const debug = require('debug')('app:service.users');

const isLog = false;
// const isDebug = true;

const {service} = feathersVuex(feathersClient, {idField: '_id'});

const servicePath = 'users';

const servicePlugin = service(servicePath, {
  instanceDefaults(data, {store, Model, Models}) {
    const idField = store.state.users.idField;
    if (isLog) debug('ServiceInfo:', {
      servicePath: Model.servicePath,
      namespace: Model.namespace,
      idField: idField,
      data: data
    });
    return {
      email: '',
      firstName: '',
      lastName: '',
      avatar: '',
      get fullName() {
        return `${this.firstName} ${this.lastName}`;
      },
      roleId: null,
      get role() {
        if (this.roleId) {
          const idFieldRole = store.state.roles.idField;
          let role = Models.Role.getFromStore(this.roleId);
          if (role) {
            const id = role[idFieldRole];
            role = loPick(role, ['name', 'description']);
            role.id = id;
            role.isAdmin = store.getters.isAdmin;
          } else {
            role = null;
          }
          return role;
        } else {
          return null;
        }
      },
      get teams() {
        const idFieldTeam = store.state.teams.idField;
        const idFieldUser = store.state.users.idField;
        const userId = data[idFieldUser];
        let teamIdsForUser = Models.UserTeam.findInStore({query: {userId: userId, $sort: {teamId: 1}}}).data;
        teamIdsForUser = teamIdsForUser.map(row => row.teamId.toString());
        let teamsForUser = Models.Team.findInStore({query: {[idFieldTeam]: {$in: teamIdsForUser}, $sort: {name: 1}}}).data;
        teamsForUser = teamsForUser.map(row => {
          return {
            id: row[idFieldTeam],
            name: row.name,
            description: row.description,
          };
        });
        if(isLog)debug('teams.teamsForUser:', teamsForUser);
        return  teamsForUser;
      },
    };
  },
  getters: {},
});

feathersClient.service(servicePath)
  .hooks({
    before: {
      all: [log()],
      find: [],
      get: [],
      create: [normalize()],
      update: [normalize()],
      patch: [normalize()],
      remove: []
    },
    after: {
      all: [log()],
      find: [],
      get: [],
      create: [],
      update: [],
      patch: [],
      remove: []
    },
    error: {
      all: [log()],
      find: [],
      get: [],
      create: [],
      update: [],
      patch: [],
      remove: []
    }
  });

export default servicePlugin;
