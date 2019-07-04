import feathersVuex from 'feathers-vuex';
import feathersClient from '~/plugins/lib/feathers-client';
import normalize from '~/services/hooks/normalize';
import util from '~/plugins/lib/util';

const debug = require('debug')('app:service.user-profiles');

// const isDebug = true;
const isLog = true;

const {service} = feathersVuex(feathersClient, {idField: '_id'});

const servicePath = 'user-profiles';
const servicePlugin = service(servicePath, {
  instanceDefaults(data, {store, Model}) {
    const idField = store.state['user-profiles'].idField;
    // const profileId = data[idField];
    if (isLog) debug('ServiceInfo:', {
      servicePath: Model.servicePath,
      namespace: Model.namespace,
      idField: idField,
      data: data
    });
    return {};
  },
  getters: {
    profileList: (state, getters) => (profileId) => {
      const loPick = require('lodash/pick');
      const loToPairs = require('lodash/toPairs');
      //------------------------------------------
      let list = [];
      let profile = getters.get(profileId);
      if (isLog) debug('profileList.profile:', profile);
      if (!profile) return list;
      // const idFieldProfile = 'id' in profile ? 'id' : '_id';
      profile = loPick(profile, util.serviceKeys('userProfiles'));
      loToPairs(profile).forEach(row => {
        let key = row[0];
        let val = row[1];
        // Add headers
        if (key.startsWith('personal') && !list.find(item => item.header === 'Personal')) list.push({header: 'Personal'});
        if (key.startsWith('address') && !list.find(item => item.header === 'Address')) {
          // list.push({ divider: true, inset: true });
          list.push({header: 'Address'});
        }
        if (key.startsWith('job') && !list.find(item => item.header === 'Job')) {
          // list.push({ divider: true, inset: true });
          list.push({header: 'Job'});
        }
        // Add key/val/icon
        let icon = util.getProfileIcon(key);
        if (key.startsWith('personal')) key = key.replace('personal', '');
        if (key.startsWith('address')) key = key.replace('address', '');
        if (key.startsWith('job')) key = key.replace('job', '');
        list.push({name: key, val: val, icon: icon});
      });
      if (isLog) debug('profileList.list:', list);
      return list;
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
