const {inspector, readJsonFileSync, stripSpecific, getHookContext, appRoot} = require('../lib');
const {authenticate} = require('@feathersjs/authentication').hooks;
const debug = require('debug')('app:plugins.auth-server.class');

const isLog = false;
const isDebug = false;

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
    if(this.isAuth()) return false;
    // Get generated services
    let services = (readJsonFileSync(`${appRoot}/feathers-gen-specs.json`) || {}).services;
    let testServices = (readJsonFileSync(`${appRoot}/config/default.json`) || {})['tests']['client']['overriddenAuth'];
    // inspector('isJwtAuthentication.testServices', testServices);
    const serviceNames = Object.keys(services);
    const isServiceName = serviceNames.indexOf(this.context.path) >= 0;
    if(isServiceName){
      const service = services[this.context.path];
      const testService = testServices[this.context.path];
      const isRequiresAuth = service['requiresAuth'];
      const isAuthForMethod = testService[this.context.method] !== 'noauth';
      return isRequiresAuth && isAuthForMethod;
    } else {
      if(this.context.path === 'graphql'){
        const found = Object.entries(services).map(service => service[1]).find(function(value) {
          return value.graphql;
        });
        return !!found;
      }else {
        return false;
      }
    }
  }

  async jwtAuthentication(context) {
    if (isDebug) debug('AuthServer.jwtAuthentication: Start');
    await authenticate('jwt')(context);
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
    const msg2 = `; isAuth: ${this.isAuth() ? this.isAuth() : 'Not'}; MyRole: ${myRole? myRole : 'Not'};`;
    if (isDebug) debug(`${msg1}${this.provider ? msg2 : ''}`);
    if(isLog) inspector('AuthServer._context:', getHookContext(this.context));
    if (isDebug) debug(`AuthServer.isAccess: ${!notAccess}`);

    return !notAccess;
  }

  /**
   * Get list services
   * exx. { users: ['create'], roles: ['find', 'create', 'update', 'patch', 'remove'] }
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
   * exx. { isAdmin: 'Administrator', isGuest: 'Guest' }
   * @param isRole
   * @return {Object}
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
   * Determine if environment allows test
   * @return {boolean}
   */
  static isTest() {
    const config = readJsonFileSync(`${appRoot}/config/default.json`) || {};
    // Determine if environment allows test
    let env = (config.tests || {}).environmentsAllowingSeedData || [];
    return env.includes(process.env.NODE_ENV);
  }
}

module.exports = AuthServer;