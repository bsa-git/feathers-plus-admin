const loPick = require('lodash/pick');
import feathersVuex from 'feathers-vuex';
import feathersClient from '~/plugins/lib/feathers-client';
import normalizeQuery from '~/services/hooks/normalize-query';

const debug = require('debug')('app:service.users');

const isLog = false;

const {service} = feathersVuex(feathersClient, {idField: '_id'});

const servicePath = 'users';

const servicePlugin = service(servicePath, {
  instanceDefaults(data, {store, Model, Models}) {
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
      get role() {
        if (this.roleId) {
          let role = Models.Role.getFromStore(this.roleId);
          // Fetch the Role record if we don't already have it
          if (!role) {
            if (isAuth) Models.Role.get(this.roleId);
          }
          return role ? loPick(role, [idField, 'name']) : null;
        } else {
          return null;
        }
      },
      get isAdmin() {
        return this.role ? this.role.name.toLowerCase() === 'administrator' : false;
      },
      get teams() {
        let teams = Models.Team.findInStore({query: {$sort: {name: 1}}}).data;
        if (!teams.length) {
          if (isAuth) Models.Team.find({query: {$sort: {name: 1}}});
          return [];
        }
        return Array.isArray(teams) ? teams.filter(team => team.memberIds.indexOf(data[idField]) !== -1).map(team => {
          return {[idField]: team[idField], name: team['name']};
        }) : [];
      }
    };
  }
});

feathersClient.service(servicePath)
  .hooks({
    before: {
      all: [],
      find: [],
      get: [],
      create: [normalizeQuery({service: 'users'})],
      update: [normalizeQuery({service: 'users'})],
      patch: [normalizeQuery({service: 'users'})],
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
