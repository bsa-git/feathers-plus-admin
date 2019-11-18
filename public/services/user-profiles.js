const loPick = require('lodash/pick');
import feathersVuex from 'feathers-vuex';
import feathersClient from '~/plugins/lib/feathers-client';
import normalize from '~/services/hooks/normalize';
import Service from '~/plugins/lib/service-client.class';

const debug = require('debug')('app:service.user-profiles');
// const isDebug = true;
const isLog = false;

/**
 * Get profile icon
 * @param key
 * @return {string}
 */
const getProfileIcon = function (key) {
  let icon = '';
  switch (key) {
  case 'jobEmail':
    icon = 'mdi-email-outline';
    break;
  case 'personalPhone':
  case 'jobPhone':
    icon = 'mdi-contact-phone';
    break;
  case 'personalWebSite':
  case 'jobWebSite':
    icon = 'mdi-web';
    break;
  case 'addressLatitude':
  case 'addressLongitude':
    icon = 'mdi-earth';
    break;
  case 'addressSuite':
  case 'addressStreet':
  case 'addressCity':
  case 'addressState':
  case 'addressStateAbbr':
  case 'addressCountry':
  case 'addressCountryCode':
  case 'addressZipCode':
    icon = 'mdi-email';
    break;
  case 'jobCompanyName':
  case 'jobTitle':
  case 'jobType':
    icon = 'mdi-briefcase-account';
    break;
  default:
    icon = 'perm_identity';
  }
  return icon;
};

/**
 * Get user for profile
 * @param data
 * @param store
 * @param Models
 * @return {Object|null}
 */
const getUser = function (profileId, store, Models) {
  let user = null;
  const idFieldUser = store.state.users.idField;
  // const idFieldProfile = store.state['user-profiles'].idField;
  // const profileId = data[idFieldProfile];
  let users = Models.User.findInStore({query: {profileId: profileId}}).data;
  if (users.length) {
    user = users[0];
    const userId = user[idFieldUser];
    user = loPick(user, ['fullName', 'email', 'avatar', 'roleId']);
    user.id = userId;
    user.role = getRole(user.roleId, store, Models);
    user.teams = getTeams(userId, store, Models);
  }
  return user;
};

/**
 * Get role for user
 * @param roleId
 * @param store
 * @param Models
 * @return {Object|null}
 */
const getRole = function (roleId, store, Models) {
  const idFieldRole = store.state.roles.idField;
  let role = Models.Role.getFromStore(roleId);
  if (role) {
    const roleId = role[idFieldRole];
    role = loPick(role, Service.serviceFields('roles'));
    role.id = roleId;
    role.isAdmin = store.getters.isAdmin;
  } else {
    role = null;
  }
  return role;
};

const getTeams = function (userId, store, Models) {
  const idFieldTeam = store.state.teams.idField;
  let teamIdsForUser = Models.UserTeam.findInStore({query: {userId: userId, $sort: {teamId: 1}}}).data;
  teamIdsForUser = teamIdsForUser.map(row => row.teamId.toString());
  let teamsForUser = Models.Team.findInStore({query: {[idFieldTeam]: {$in: teamIdsForUser}, $sort: {name: 1}}}).data;
  teamsForUser = teamsForUser.map(team => {
    const teamId = team[idFieldTeam];
    team = loPick(team, Service.serviceFields('teams'));
    team.id = teamId;
    return team;
  });
  if(isLog)debug('teams.teamsForUser:', teamsForUser);
  return  teamsForUser;
};

const {service} = feathersVuex(feathersClient, {idField: '_id'});
const servicePath = 'user-profiles';
const servicePlugin = service(servicePath, {
  instanceDefaults(data, {store, Model, Models}) {
    const idField = store.state['user-profiles'].idField;
    // const profileId = data[idField];
    if (isLog) debug('ServiceInfo:', {
      servicePath: Model.servicePath,
      namespace: Model.namespace,
      idField: idField,
      data: data
    });
    return {
      get fullAddress() {
        const isFullAddress = !!this.addressCountry;
        const fullAddress = isFullAddress? `${this.addressStreet} ${this.addressSuite}, ${this.addressCity}, ${this.addressStateAbbr} ${this.addressZipCode}, ${this.addressCountry}` : '';
        if(isLog)debug('fullAddress:', fullAddress);
        return fullAddress;
      },
      get user() {
        return getUser(this[idField], store, Models);
      },
    };
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
      profile = loPick(profile, Service.serviceFields('userProfiles'));
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
        let icon = getProfileIcon(key);
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
