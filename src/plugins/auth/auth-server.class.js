const {readJsonFileSync, stripSpecific, appRoot} = require('../lib');

const debug = require('debug')('app:plugins.auth-server.class');

const isDebug = false;

class AuthServer {
  /**
   * Constructor
   * @param context
   */
  constructor(context) {
    this.context = context;
    this.isAuth = !!context.params.authenticated;
    this.myRole = context.params.payload ? context.params.payload.role : '';
    this.provider = context.params.provider ? context.params.provider : '';
    this.isAdmin = this.myRole === AuthServer.getRoles()['isAdmin'];

    if (isDebug) debug(`Start AuthServer constructor. <<isAuth>>:${this.isAuth}; <<myRole>>:${this.myRole}; <<isAdmin>>:${this.isAdmin};`);
  }

  /**
   * Is access right for service methods
   * @param isTest
   * @return Boolean
   */
  isAccess(isTest = false) {
    const publicServices = AuthServer.listServices(process.env.PUBLIC_SERVICES);
    const adminServices = AuthServer.listServices(process.env.ADMIN_SERVICES);
    const isPublicAccess = !!publicServices[this.context.path] && publicServices[this.context.path].includes(this.context.method);
    const isAdminAccess = !!adminServices[this.context.path] && adminServices[this.context.path].includes(this.context.method);

    const _isTest = isTest ? true : !AuthServer.isTest();
    const notAccess = (_isTest && !!this.provider && !this.isAuth && !isPublicAccess) ||
      (  _isTest && !!this.provider && this.isAuth && !this.isAdmin && isAdminAccess);
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
   * exx. { isAdmin: 'Administrator', isGlobalConfiguration: 'Global Configuration Officer' }
   * @return {Object}
   */
  static getRoles() {
    const _roles = {};
    const envRoles = stripSpecific(process.env.ROLES, ';').split(';').map(role => {
      const items = role.trim().split(':').map(item => item.trim());
      return {[items[0]]: items[1]};
    });
    envRoles.forEach(role => {
      Object.assign(_roles, role);
    });
    return _roles;
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
