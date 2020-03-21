const loPick = require('lodash/pick');
import feathersVuex from 'feathers-vuex';
import feathersClient from '~/plugins/auth/feathers-client';
import jsonLogData from '~/api/app/app-log-msg.json';
import colors from 'vuetify/lib/util/colors';
import normalize from '~/services/hooks/normalize';
import log from '~/services/hooks/log';
// import Service from '~/plugins/lib/service-client.class';

const debug = require('debug')('app:service.log-messages');
const isDebug = false;
const isLog = false;

/**
 * Get log data
 * @param name
 */
const getLogData = (name) => {
  return jsonLogData.filter(item => !item.isConfig).find(item => item.name === name);
};

const configLogData = jsonLogData.find(item => item.isConfig);

/**
 * Get color
 * @param baseColor
 * @param subColor
 * @return {String}
 */
const getColor = (baseColor = '', subColor = '') => {
  let _subColor = subColor ? subColor.replace('-', '') : '';
  const color = _subColor ? colors[baseColor][_subColor] : colors[baseColor]['base'];
  return color;
};

/**
 * Get user for profile
 * @param data
 * @param store
 * @param Models
 * @return {Object|null}
 */
const getUser = function (userId, store, Models) {
  let idFieldUser, user = null;
  idFieldUser = store.state.users.idField;
  user = Models.User.getFromStore(userId);
  if (user){
    const userId = user[idFieldUser];
    user = loPick(user, ['fullName', 'email', 'avatar']);
    user.id = userId;
  }
  return user;
};

const {service} = feathersVuex(feathersClient, {idField: '_id'});
const servicePath = 'log-messages';
const servicePlugin = service(servicePath, {
  instanceDefaults(data, {store, Model, Models}) {// Models
    const moment = require('moment');
    const idField = store.state['log-messages'].idField;
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
        return (this && this.userId)? getUser(this.userId, store, Models) : null;
      },
      get icon() {
        return (getLogData(this.name) && getLogData(this.name).icon) ? getLogData(this.name).icon : 'mdi-alert';
      },
      get color() {
        const colors = configLogData.groupColors[this.gr].split(':');
        const baseColor = colors[0];
        const subColor = colors.length > 1 ? colors[1] : '';
        return getColor(baseColor, subColor);
      },
      get isServer() {
        return getLogData(this.name) ? !!getLogData(this.name).isServer : true;
      },
      get title() {
        return (getLogData(this.name) && getLogData(this.name).title) ? getLogData(this.name).title : '';
      },
      get formatMsg() {
        const objMsg = JSON.parse(this.msg);
        const formatMsg = JSON.stringify(objMsg, null, '  ');
        if (isDebug) debug('formatMsg:', formatMsg);
        return formatMsg;
      },
      get dtUTC() {
        let dt = moment.utc(this.createdAt).format('YYYY-MM-DD HH:mm:ss');
        return dt;
      },
      get dtLocal() {
        let dt = moment(this.createdAt).format('YYYY-MM-DD HH:mm:ss');
        return dt;
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
