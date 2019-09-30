// const debug = require('debug')('app:store.getters');
//
// const isLog = true;
// const isDebug = true;


const getters = {

  getConfig(state) {
    return state.config;
  },

  getSnackBar(state) {
    return state.snackbar;
  },

  getTheme(state) {
    return state.theme;
  },

  isAuth(state) {
    return !!state.auth.accessToken;
  },

  isAdmin(state, getters) {
    return getters.isMyRole('isAdmin');
  },

  isMyRole: (state, getters) => (isRole = '') => {
    return getters.getMyRole === getters.getRoles(isRole);
  },

  getMyRole(state) {
    const role = state.auth.payload ? state.auth.payload.role : '';
    return role ? role : '';
  },

  /**
   * Get roles
   * exx. { isAdmin: 'Administrator', isGuest: 'Guest' }
   * @param state
   * @param isRole
   * @return {Object}
   */
  getRoles: (state) => (isRole = '') => {
    const _roles = {};
    state.config.roles.forEach(role => {
      Object.assign(_roles, role);
    });
    // return _roles;
    return isRole ? _roles[isRole] : _roles;
  },

  isEnvRole: (state, getters) => (roleName = '') => {
    const names = Object.values(getters.getRoles());
    const result = (names.indexOf(roleName) !== -1);
    return result;
  },

  getUser(state) {
    return state.auth.user;
  },

  isExternalAccount(state){
    let isAccount = false;
    state.config.externalAccounts.forEach(account => {
      const accountId = `${account}Id`;
      isAccount = (state.auth.user && state.auth.user[accountId])? !!state.auth.user[accountId] : false;
      if(isAccount) return;
    });
    return isAccount;
  },

  isUserExternalAccount: (state) => (user) => {
    let isAccount = false;
    state.config.externalAccounts.forEach(account => {
      const accountId = `${account}Id`;
      isAccount = (user && user[accountId])? !!user[accountId] : false;
      if(isAccount) return;
    });
    return isAccount;
  }
};

export default getters;
