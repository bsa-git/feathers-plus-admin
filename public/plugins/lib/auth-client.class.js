const loConcat = require('lodash/concat');
import appMenu from '~/api/data/app-menu';
// import util from '~/plugins/lib/util';

const debug = require('debug')('app:plugins.auth-client.class');

const isLog = false;

class AuthClient {
  /**
   * Constructor
   * @param store
   */
  constructor(store) {
    this.store = store;
    this.menu = appMenu;
    this.config = store.getters.getConfig;
    this.locales = this.config.locales.filter(locale => locale !== this.config.fallbackLocale);
    this.envPublicPaths = this.config.publicPaths;
    this.envAdminPaths = this.config.adminPaths;
    this.envPublicServices = this.config.publicServices;
    this.envAdminServices = this.config.adminServices;
    this.envRoles = store.getters.getRoles();
    const {auth} = store.state;
    this.user = auth.user;
    this.isAuth = store.getters.isAuth;
    this.isAdmin = store.getters.isAdmin;
    this.getMyRole = store.getters.getMyRole;

    // Set this.envRoles
    if (isLog) debug('envRoles:', this.envRoles);
  }

  /**
   * Is access right for path
   * @param path
   * @return Boolean
   */
  isAccess(path) {
    const notAccess = (!this.isAuth && !this.publicPaths().includes(path)) ||
      (this.isAuth && !this.isAdmin && this.adminPaths().includes(path));
    return !notAccess;
  }

  /**
   * Get public paths for auth
   * @param envPaths Array
   * @return Array
   */
  listPaths(envPaths = []) {
    let paths = [];
    let localePaths = [];
    this.menu.forEach(item => {
      if (item.to) {
        if (envPaths.includes(item.to)) {
          paths.push(item.to);
          if (item.items) {
            item.items.forEach((i) => {
              if (i.children) {
                i.children.forEach((child) => {
                  if (child.to) paths.push(child.to);
                });
              }
              if (i.to) paths.push(i.to);
            });
          }
        } else {
          if (item.items) {
            item.items.forEach((i) => {
              if (i.to) {
                if (envPaths.includes(i.to)) {
                  paths.push(i.to);
                  if (i.children) {
                    i.children.forEach((child) => {
                      if (child.to) paths.push(child.to);
                    });
                  }
                } else {
                  if (i.children) {
                    i.children.forEach((child) => {
                      if (child.to) {
                        if (envPaths.includes(child.to)) {
                          paths.push(child.to);
                        }
                      }
                    });
                  }
                }
              }
            });
          }
        }
      }
    });
    this.locales.forEach((locale) => {
      localePaths = loConcat(localePaths, paths.map(path => `/${locale}${path}`));
    });
    localePaths = loConcat(localePaths, paths);
    return localePaths;
  }

  /**
   * Filter menu for different access rights
   * @return Array
   */
  filterMenu() {
    return this.menu.filter(item => {
      if (item.divider) return true;
      if (item.header) return true;
      if (this.envPublicPaths.includes(item.to)) return true;
      if (this.isAuth && this.isAdmin) return true;
      if (this.isAuth && !this.isAdmin && !this.envAdminPaths.includes(item.to)) return true;
      return false;
    });
  }

  /**
   * Get list services
   * exx. { users: ['create'], roles: ['find', 'create', 'update', 'patch', 'remove'] }
   * @param envServices
   * @return {Object}
   */
  listServices(envServices = '') {
    const _services = {};
    envServices.forEach(service => {
      Object.assign(_services, service);
    });
    return _services;
  }

  /**
   * Get public paths for auth
   * @return Array
   */
  publicPaths() {
    return this.listPaths(this.envPublicPaths);
  }

  /**
   * Get admin paths for auth
   * @return Array
   */
  adminPaths() {
    return this.listPaths(this.envAdminPaths);
  }

  /**
   * Get public services for auth
   * exx. { users: ['create'], roles: ['find', 'create', 'update', 'patch', 'remove'] }
   * @return Object
   */
  publicServices() {
    return this.listServices(this.envPublicServices);
  }

  /**
   * Get admin services for auth
   * exx. { users: ['create'], roles: ['find', 'create', 'update', 'patch', 'remove'] }
   * @return Object
   */
  adminServices() {
    return this.listServices(this.envAdminServices);
  }

}

export default AuthClient;
