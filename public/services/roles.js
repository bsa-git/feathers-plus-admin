const loPick = require('lodash/pick');
import feathersVuex from 'feathers-vuex';
import feathersClient from '~/plugins/lib/feathers-client';
import normalize from '~/services/hooks/normalize';

const debug = require('debug')('app:service.roles');

const isLog = false;

const {service} = feathersVuex(feathersClient, {idField: '_id'});

const servicePath = 'roles';
const servicePlugin = service(servicePath, {
  instanceDefaults(data, {store, Model, Models}) {
    const idField = store.state.roles.idField;
    if (isLog) debug('ServiceInfo:', {
      servicePath: Model.servicePath,
      namespace: Model.namespace,
      idField: idField,
      data: data
    });
    return {
      name: '',
      description: '',
      get users() {
        const idFieldUser = store.state.users.idField;
        const idFieldRole = store.state.roles.idField;
        const roleId = data[idFieldRole];
        let users = Models.User.findInStore({query: {roleId: roleId, $sort: {fullName: 1}}}).data;
        users = users.map(user => {
          const id = user[idFieldUser];
          user = loPick(user, ['email', 'fullName', 'avatar']);
          user.id = id;
          return user;
        });
        if(isLog)debug('users:', users);
        return users;
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
