import feathersVuex from 'feathers-vuex';
import feathersClient from '~/plugins/lib/feathers-client';
import normalizeQuery from '~/services/hooks/normalize-query';

const debug = require('debug')('app:service.teams');

const isLog = false;

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
      memberIds: [],
      get members() {
        if (Array.isArray(data['memberIds']) && data['memberIds'].length) {
          const query = {query: {[idField]: {$in: data['memberIds']}, $sort: {fullName: 1}}};
          const users = Models.User.findInStore(query).data;
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
        } else {
          return [];
        }
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
      create: [normalizeQuery({service: 'teams'})],
      update: [normalizeQuery({service: 'teams'})],
      patch: [normalizeQuery({service: 'teams'})],
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
