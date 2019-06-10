const loPick = require('lodash/pick');
import feathersVuex from 'feathers-vuex';
import feathersClient from '~/plugins/lib/feathers-client';
import normalize from '~/services/hooks/normalize';

const debug = require('debug')('app:service.user-teams');

// const isDebug = true;
const isLog = false;

const {service} = feathersVuex(feathersClient, {idField: '_id'});

const servicePath = 'user-teams';
const servicePlugin = service(servicePath, {
  instanceDefaults(data, {store, Model, Models}) {
    const idField = store.state['user-teams'].idField;
    if (isLog) debug('ServiceInfo:', {
      servicePath: Model.servicePath,
      namespace: Model.namespace,
      idField: idField,
      data: data
    });
    return {
      teamId: null,
      userId: null,
      get user() {
        const idFieldUser = store.state.users.idField;
        let user = Models.User.getFromStore(this.userId);
        if (user) {
          const id = user[idFieldUser];
          user = loPick(user, ['fullName', 'email']);
          user.id = id;
        } else {
          user = null;
        }
        return user;
      },
      get team() {
        const idFieldTeam = store.state.teams.idField;
        let team = Models.Team.getFromStore(this.teamId);
        if (team) {
          const id = team[idFieldTeam];
          team = loPick(team, ['name']);
          team.id = id;
        } else {
          team = null;
        }
        return team;
      },
    };
  },
  getters: {
    usersForTeam: (state, getters) => (teamId = null) => {
      let teams = {};
      let userTeams = getters.find({query: {$sort: {teamId: 1, userId: 1}}}).data;
      userTeams.forEach(userTeam => {
        if (!teams[userTeam.teamId]) {
          teams[userTeam.teamId] = [];
        }
        teams[userTeam.teamId].push(userTeam.userId);
      });
      return teams[teamId] ? teams[teamId] : [];
    },
    teamsForUser: (state, getters) => (userId = null) => {
      let users = {};
      let userTeams = getters.find({query: {$sort: {userId: 1, teamId: 1}}}).data;
      userTeams.forEach(userTeam => {
        if (!users[userTeam.userId]) {
          users[userTeam.userId] = [];
        }
        users[userTeam.userId].push(userTeam.teamId);
      });
      return users[userId] ? users[userId] : [];
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
