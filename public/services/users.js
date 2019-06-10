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
        let users = {};
        let userTeams = Models.UserTeam.findInStore({query: {$sort: {userId: 1, teamId: 1}}}).data;
        userTeams.forEach(userTeam => {
          if (!users[userTeam.userId]) {
            users[userTeam.userId] = [];
          }
          users[userTeam.userId].push(userTeam.teamId);
        });
        if(isLog)debug('teams.users:', users);
        const teamIds = users[userId] ? users[userId] : [];
        if(isLog)debug('teams.teamIds:', teamIds);
        let teams = teamIds.map(teamId => {
          let team = Models.Team.getFromStore(teamId);
          if (team) {
            const id = team[idFieldTeam];
            team = loPick(team, ['name', 'description']);
            team.id = id;
          } else {
            team = null;
          }
          return team;
        });
        if(isLog)debug('teams:', teams);
        teams = teams.filter(team => !(team === null));
        return teams;
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
