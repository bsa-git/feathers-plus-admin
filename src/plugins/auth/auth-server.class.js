const {inspector, readJsonFileSync, stripSpecific, getHookContext, appRoot} = require('../lib');
const {authenticate} = require('@feathersjs/authentication').hooks;
const {getItems} = require('feathers-hooks-common');
const crypto = require('crypto');
const debug = require('debug')('app:plugins.auth-server.class');

const isLog = false;
const isDebug = false;

/**
 * Random bytes
 * @param len
 * @return {Promise}
 * @private
 */
const randomBytes = (len) => {
  return new Promise(function (resolve, reject) {
    crypto.randomBytes(len, function (err, buf) {
      return err ? reject(err) : resolve(buf.toString('hex'));
    });
  });
};

/**
 * Random digits
 * @param len
 * @return {string}
 * @private
 */
const randomDigits = (len) => {
  let str = '';
  while (str.length < len) {
    str += parseInt('0x' + crypto.randomBytes(4).toString('hex')).toString();
  }
  return str.substr(0, len);
};

/**
 * Get items from env. config
 * @param value
 * return {Array}
 */
const getEnvItems = (value) => {
  return stripSpecific(value, ';').split(';').map(item => item.trim());
};


class AuthServer {
  /**
   * Constructor
   * @param context
   */
  constructor(context) {
    this.context = {};
    Object.assign(this.context, context);
    this.provider = this.context.params.provider ? this.context.params.provider : '';
    this.roleName = this.context.params.payload ? this.context.params.payload.role : '';
    if (isDebug) debug('AuthServer.constructor: Start');
  }

  /**
   * isAuth
   * @return {boolean}
   */
  isAuth() {
    return !!this.context.params.authenticated;
  }

  /**
   * Get auth user
   * @return {null}
   */
  getAuthUser() {
    return this.isAuth() ? this.context.params.user : null;
  }

  /**
   * Get my role
   * @param id
   * @return {Promise.<*>}
   */
  async getRole(id) {
    const role = await this.context.app.service('roles').get(id);
    if (isLog) inspector('AuthServer.getRole:', role);
    return role;
  }

  async getRoleName() {
    if (!this.roleName) {
      const user = this.getAuthUser();
      const myRole = (this.isAuth() && user) ? await this.getRole(user.roleId) : null;
      this.roleName = myRole ? myRole.name : '';
    }
    return this.roleName;
  }

  /**
   * isAdmin
   * @return {boolean}
   */
  async isAdmin() {
    const roleName = await this.getRoleName();
    return roleName === AuthServer.getRoles('isAdmin');
  }

  /**
   * Is jwt authentication
   * @return {boolean}
   */
  isJwtAuthentication() {
    if (this.isAuth()) return false;
    // Get generated services
    let services = (readJsonFileSync(`${appRoot}/feathers-gen-specs.json`) || {}).services;
    let testServices = (readJsonFileSync(`${appRoot}/config/default.json`) || {})['tests']['client']['overriddenAuth'];
    // inspector('isJwtAuthentication.testServices', testServices);
    const serviceNames = Object.keys(services);
    const isServiceName = serviceNames.indexOf(this.context.path) >= 0;
    if (isServiceName) {
      const service = services[this.context.path];
      const testService = testServices[this.context.path];
      const isRequiresAuth = service['requiresAuth'];
      const isAuthForMethod = testService ? testService[this.context.method] !== 'noauth' : false;
      return isRequiresAuth && isAuthForMethod;
    } else {
      if (this.context.path === 'graphql') {
        const found = Object.entries(services).map(service => service[1]).find(function (value) {
          return value.graphql;
        });
        return !!found;
      } else {
        return false;
      }
    }
  }

  async jwtAuthentication(context) {
    if (isDebug) debug('AuthServer.jwtAuthentication: Start');
    await authenticate('jwt')(context);
  }

  /**
   * verifyJWT
   * Pass a jwt token, get back a payload if it's valid.
   *
   * @param token
   * @return {Promise.<void>}
   */
  static async verifyJWT (token) {
    const decode = require('jwt-decode');
    //-----------------------------------
    const payloadIsValid = function payloadIsValid(payload) {
      return payload && (!payload.exp || payload.exp * 1000 > new Date().getTime());
    };
    if (typeof token !== 'string') {
      return Promise.reject(new Error('Token provided to verifyJWT is missing or not a string'));
    }
    try {
      let payload = decode(token);

      if (payloadIsValid(payload)) {
        return Promise.resolve(payload);
      }
      return Promise.reject(new Error('Invalid token: expired'));
    } catch (error) {
      return Promise.reject(new Error('Cannot decode malformed token.'));
    }
  }

  /**
   * Is access right for service methods
   * @return Boolean
   */
  async isAccess() {

    // Run jwt authentication
    if (!AuthServer.isTest() && this.isJwtAuthentication()) {
      await this.jwtAuthentication(this.context);
    }
    // Run check
    const publicServices = AuthServer.listServices(process.env.PUBLIC_SERVICES);
    const adminServices = AuthServer.listServices(process.env.ADMIN_SERVICES);
    const isPublicAccess = !!publicServices[this.context.path] && publicServices[this.context.path].includes(this.context.method);
    const isAdminAccess = !!adminServices[this.context.path] && adminServices[this.context.path].includes(this.context.method);

    const isAdmin = await this.isAdmin();
    const notAccess = (!!this.provider && !this.isAuth() && !isPublicAccess) ||
      (  !!this.provider && this.isAuth() && !isAdmin && isAdminAccess);

    // --- DEBUG ---
    const myRole = await this.getRoleName();
    const msg1 = `<<AuthServer>>: Provider: ${this.provider ? this.provider : 'Not'}; ${this.context.type} app.service('${this.context.path}').${this.context.method}()`;
    const msg2 = `; isAuth: ${this.isAuth() ? this.isAuth() : 'Not'}; MyRole: ${myRole ? myRole : 'Not'};`;
    if (isDebug) debug(`${msg1}${this.provider ? msg2 : ''}`);
    if (isLog) inspector('AuthServer._context:', getHookContext(this.context));
    if (isDebug) debug(`AuthServer.isAccess: ${!notAccess}`);

    return !notAccess;
  }

  /**
   * Get list services
   * e.g. { users: ['create'], roles: ['find', 'create', 'update', 'patch', 'remove'] }
   * @param envServices
   * @return {Object}
   */
  static listServices(envServices = '') {
    const all = ['find', 'get', 'create', 'update', 'patch', 'remove'];
    const _services = {};
    const services = stripSpecific(envServices, ';').split(';').map(service => {
      const items = service.trim().split('.').map(item => item.trim());
      return {[items[0]]: items[1] === '*' ? all : stripSpecific(items[1], ',').split(',').map(item => item.trim())};
    });
    services.forEach(service => {
      Object.assign(_services, service);
    });
    return _services;
  }

  /**
   * Get roles
   * e.g. { isAdmin: 'Administrator', isGuest: 'Guest', isSuperRole: 'superRole' }
   * @param isRole
   * @return {Object||String}
   */
  static getRoles(isRole = '') {
    const _roles = {};
    const envRoles = stripSpecific(process.env.ROLES, ';').split(';').map(role => {
      const items = role.trim().split(':').map(item => item.trim());
      return {[items[0]]: items[1]};
    });
    envRoles.forEach(role => {
      Object.assign(_roles, role);
    });
    return isRole ? _roles[isRole] : _roles;
  }

  /**
   * Get base roles
   * e.g. { isAdmin: 'Administrator', isGuest: 'Guest' }
   * @param isBaseRole
   * @return {Object||String}
   */
  static getBaseRoles(isBaseRole = '') {
    const _roles = {};
    const _baseRoles = stripSpecific(process.env.BASE_ROLES, ';').split(';').map(item => item.trim());
    const _envRoles = stripSpecific(process.env.ROLES, ';').split(';').map(role => {
      const items = role.trim().split(':').map(item => item.trim());
      return {[items[0]]: items[1]};
    });
    const filterRoles = _envRoles.filter(role => {
      const key = Object.keys(role)[0];
      return _baseRoles.indexOf(key) >= 0;
    });
    filterRoles.forEach(role => {
      Object.assign(_roles, role);
    });
    return isBaseRole ? _roles[isBaseRole] : _roles;
  }

  /**
   * Is env role
   * @param roleName
   * @return {boolean}
   */
  static isEnvRole(roleName = '') {
    const names = Object.values(AuthServer.getRoles());
    const result = (names.indexOf(roleName) >= 0);
    return result;
  }

  /**
   * Is base role
   * @param roleName
   * @return {boolean}
   */
  static isBaseRole(roleName = '') {
    const names = Object.values(AuthServer.getBaseRoles());
    const result = (names.indexOf(roleName) >= 0);
    return result;
  }

  /**
   * Determine if environment allows test
   * @return {boolean}
   */
  static isTest() {
    const config = readJsonFileSync(`${appRoot}/config/default.json`) || {};
    // Determine if environment allows test
    let env = (config.tests || {}).environmentsAllowingSeedData || [];
    return env.includes(process.env.NODE_ENV);
  }

  /**
   * Is user external account
   * @param user
   * @return {boolean}
   */
  static isUserExternalAccount(user) {
    const _externalAccounts = getEnvItems(process.env.EXTERNAL_ACCOUNTS);
    const found = _externalAccounts.find(function (account) {
      const accountId = `${account}Id`;
      return (user && user[accountId]) ? !!user[accountId] : false;
    });
    return !!found;
  }

  static isContextExternalAccount(context) {
    let result = false;
    // Get the record(s) from context.data (before), context.result.data or context.result (after).
    // getItems always returns an array to simplify your processing.
    let records = getItems(context);
    if (Array.isArray(records)) {
      result = records.find(function (record) {
        return !AuthServer.isUserExternalAccount(record);
      });

    } else {
      result = AuthServer.isUserExternalAccount(records);
    }
    return !!result;
  }

  /**
   * Get long token
   * @param len
   * @return {Promise}
   */
  static getLongToken(len) {
    return randomBytes(len);
  }

  /**
   * Get short token
   * @param len
   * @param ifDigits
   * @return {*}
   */
  static getShortToken(len, ifDigits) {
    if (ifDigits) {
      return Promise.resolve(randomDigits(len));
    }

    return randomBytes(Math.floor(len / 2) + 1).then(function (str) {
      str = str.substr(0, len);
      if (str.match(/^[0-9]+$/)) {
        // tests will fail on all digits
        str = 'q' + str.substr(1); // shhhh, secret.
      }
      return str;
    });
  }
}

module.exports = AuthServer;
