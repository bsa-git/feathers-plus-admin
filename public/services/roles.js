import feathersVuex from 'feathers-vuex';
import feathersClient from '~/plugins/lib/feathers-client';
import normalizeQuery from '~/services/hooks/normalize-query';

const debug = require('debug')('app:service.roles');

const isLog = false;

const {service} = feathersVuex(feathersClient, {idField: '_id'});

const servicePath = 'roles';
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
      name: '',
      get users() {
        if (data[idField]) {
          const users = Models.User.findInStore({query: {roleId: data[idField], $sort: {fullName: 1}}}).data;
          if (users.length) {
            return users;
          } else {
            return [];
          }
        } else {
          return [];
        }
      },
    };
  }
});

feathersClient.service(servicePath)
  .hooks({
    before: {
      all: [],
      find: [],
      get: [],
      create: [normalizeQuery({service: 'roles'})],
      update: [normalizeQuery({service: 'roles'})],
      patch: [normalizeQuery({service: 'roles'})],
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
