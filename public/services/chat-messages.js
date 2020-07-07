const loPick = require('lodash/pick');
import feathersVuex from 'feathers-vuex';
import feathersClient from '~/plugins/auth/feathers-client';
import normalize from '~/services/hooks/normalize';
import log from '~/services/hooks/log';
// import Service from '~/plugins/lib/service-client.class';

const debug = require('debug')('app:service.log-messages');
const isLog = false;

/**
 * Get user for chat-message
 * @param userId
 * @param store
 * @param Models
 * @return {Object|null}
 */
const getUser = function (userId, store, Models) {
  let user = null;
  user = Models.User.getFromStore(userId);
  if (user){
    user = loPick(user, ['fullName', 'email', 'avatar']);
    user.id = userId;
  }
  return user;
};

/**
 * Get team for chat-message
 * @param teamId
 * @param store
 * @param Models
 * @return {Object|null}
 */
const getTeam = function (teamId, store, Models) {
  let team = null;
  team = Models.Team.getFromStore(teamId);
  if (team){
    team = loPick(team, ['name', 'description']);
    team.id = teamId;
  }
  return team;
};

/**
 * Get role for chat-message
 * @param roleId
 * @param store
 * @param Models
 * @return {Object|null}
 */
const getRole = function (roleId, store, Models) {
  let role = null;
  role = Models.Role.getFromStore(roleId);
  if (role){
    role = loPick(role, ['name', 'description']);
    role.id = roleId;
  }
  return role;
};

const {service} = feathersVuex(feathersClient, {idField: '_id'});
const servicePath = 'chat-messages';
const servicePlugin = service(servicePath, {
  instanceDefaults(data, {store, Model, Models}) {
    const idField = store.state[servicePath].idField;
    if (isLog) debug('ServiceInfo:', {
      servicePath: Model.servicePath,
      namespace: Model.namespace,
      idField: idField,
      data: data
    });
    return {
      get owner() {
        return (this && this.ownerId)? getUser(this.ownerId, store, Models) : null;
      },
      get user() {
        return (this && this.userId && this.userId !== '000000000000000000000000')? getUser(this.userId, store, Models) : null;
      },
      get team() {
        return (this && this.teamId && this.teamId !== '000000000000000000000000')? getTeam(this.teamId, store, Models) : null;
      },
      get role() {
        return (this && this.roleId && this.roleId !== '000000000000000000000000')? getRole(this.roleId, store, Models) : null;
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
