const loConcat = require('lodash/concat');
import appMenu from '~/api/data/app-menu';
import util from '~/plugins/lib/util';

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
    this.locales = util.stripSpecific(process.env.LOCALES, ';').split(';').filter(locale => locale.trim() !== process.env.FALLBACK_LOCALE);
    this.envPublicPaths = util.stripSpecific(process.env.PUBLIC_PATHS, ';').split(';').map(item => item.trim());
    this.envAdminPaths = util.stripSpecific(process.env.ADMIN_PATHS, ';').split(';').map(item => item.trim());
    this.envRoles = store.getters.getRoles;
    const {auth} = store.state;
    this.user = auth.user;

    // Set this.envRoles
    if (isLog) debug('envRoles:', this.envRoles);
  }

  /**
   * Is authentication
   * @return Boolean
   */
  isAuth() {
    return !!this.store.getters.isAuth;
  }

  /**
   * Is administrator
   * @return Boolean
   */
  isAdmin() {
    return this.user ? this.user.isAdmin : false;
  }

  /**
   * Get my role
   * @return String
   */
  getMyRole() {
    return this.store.getters.getMyRole;
  }

  /**
   * Is access right for path
   * @param path
   * @return Boolean
   */
  isAuthAccess(path) {
    const notAccess = (!this.isAuth() && !this.publicPaths().includes(path)) ||
      (this.isAuth() && !this.isAdmin() && this.adminPaths().includes(path));
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
      if (this.isAuth() && this.isAdmin()) return true;
      if (this.isAuth() && !this.isAdmin() && !this.envAdminPaths.includes(item.to)) return true;
      return false;
    });
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

}

export default AuthClient;
