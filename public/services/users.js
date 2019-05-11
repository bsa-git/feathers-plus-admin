// const loPick = require('lodash/pick');
import feathersVuex from 'feathers-vuex';
import feathersClient from '~/plugins/lib/feathers-client';
import normalizeQuery from '~/services/hooks/normalize-query';
import log from '~/services/hooks/log';

const debug = require('debug')('app:service.users');

const isLog = false;
// const isDebug = true;

const {service} = feathersVuex(feathersClient, {idField: '_id'});

const servicePath = 'users';

const servicePlugin = service(servicePath, {
  instanceDefaults(data, {store, Model}) {
    const idField = store.state.users.idField;
    const isAuth = store.getters.isAuth;
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
      get fullName() {
        return `${this.firstName} ${this.lastName}`;
      },
      roleId: null,
      get roleName() {
        if (this.roleId) {
          return isAuth ? store.getters.getMyRole : null;
        } else {
          return null;
        }
      },
      get isAdmin() {
        return this.roleId ? store.getters.isAdmin : false;
      },
    };
  },
  getters: {
    getMembersForTeam: (state, getters) => (memberIds = []) => {
      if (Array.isArray(memberIds) && memberIds.length) {
        const idField = state.idField;
        const query = {query: {[idField]: {$in: memberIds}, $sort: {fullName: 1}}};
        const users = getters.find(query).data;
        if (users.length) {
          return users.map(user => {
            return {
              [idField]: user[idField],
              isAdmin: user.isAdmin,
              roleName: user.roleName,
              email: user.email,
              firstName: user.firstName,
              lastName: user.lastName,
              fullName: user.fullName
            };
          });
        } else {
          return [];
        }
      }else {
        return [];
      }
    },
    getUsersForRole: (state, getters) => (roleId = null) => {
      const idField = state.idField;
      const users = getters.find({query: {roleId: roleId, $sort: {fullName: 1}}}).data;
      if (users.length) {
        return users.map(user => {
          return {
            [idField]: user[idField],
            isAdmin: user.isAdmin,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            fullName: user.fullName
          };
        });
      } else {
        return [];
      }
    },
  },
});

feathersClient.service(servicePath)
  .hooks({
    before: {
      all: [log()],
      find: [],
      get: [],
      create: [normalizeQuery({service: 'users'})],
      update: [normalizeQuery({service: 'users'})],
      patch: [normalizeQuery({service: 'users'})],
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
