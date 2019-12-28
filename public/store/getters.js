import colors from 'vuetify/lib/util/colors';
import themeColorOptions from '~/api/app/theme-color-options.json';

const getters = {

  getConfig: (state) => {
    return state.config;
  },

  getSnackBar: (state) => {
    return state.snackbar;
  },

  getTheme: (state) => {
    return state.theme;
  },

  getPrimaryColor: (state) => {
    const theme = state.theme;
    // Get primary color
    const optColor = themeColorOptions.find(option => option.key === theme.primary);
    let subColor = optColor? optColor.value[theme.name] : '';
    subColor = subColor.replace('-', '');
    const primaryColor = subColor? colors[theme.primary][subColor] : colors[theme.primary]['base'];
    return primaryColor;
  },

  getPrimaryBaseColor: (state) => {
    const theme = state.theme;
    // Get primary base color
    const primaryColor = colors[theme.primary].base;
    return primaryColor;
  },

  isAuth: (state) => {
    return !!state.auth.accessToken;
  },

  isYouAuth: (state) => (userId) => {
    const idField = state.users.idField;
    const user = state.auth.user;
    const myUserId = user ? user[idField] : '';
    return userId === myUserId;
  },

  isAdmin(state, getters) {
    return getters.isMyRole('isAdmin');
  },

  isMyRole: (state, getters) => (isRole = '') => {
    return getters.getMyRole === getters.getRoles(isRole);
  },

  getMyRole: (state) => {
    const role = state.auth.payload ? state.auth.payload.role : '';
    return role ? role : '';
  },

  /**
   * Get roles
   * e.g. { isAdmin: 'Administrator', isGuest: 'Guest', isSuperRole: 'superRole' }
   * @param state
   * @param isRole
   * @return {Object}
   */
  getRoles: (state) => (isRole = '') => {
    const _roles = {};
    state.config.roles.forEach(role => {
      Object.assign(_roles, role);
    });
    return isRole ? _roles[isRole] : _roles;
  },

  /**
   * Get base roles
   * e.g. { isAdmin: 'Administrator', isGuest: 'Guest' }
   * @param state
   * @param isBaseRole
   * @return {Object}
   */
  getBaseRoles: (state) => (isBaseRole = '') => {
    const _roles = {};
    state.config.baseRoles.forEach(role => {
      Object.assign(_roles, role);
    });
    return isBaseRole ? _roles[isBaseRole] : _roles;
  },

  isEnvRole: (state, getters) => (roleName = '') => {
    const names = Object.values(getters.getRoles());
    const result = (names.indexOf(roleName) >= 0);
    return result;
  },

  isBaseRole: (state, getters) => (roleName = '') => {
    const names = Object.values(getters.getBaseRoles());
    const result = (names.indexOf(roleName) >= 0);
    return result;
  },

  getUser: (state) => {
    return state.auth.user;
  },

  isExternalAccount: (state) => {
    const found = state.config.externalAccounts.find(function (account) {
      const accountId = `${account}Id`;
      return (state.auth.user && state.auth.user[accountId]) ? !!state.auth.user[accountId] : false;
    });
    return !!found;
  },

  isUserExternalAccount: (state) => (user) => {
    const found = state.config.externalAccounts.find(function (account) {
      const accountId = `${account}Id`;
      return (user && user[accountId]) ? !!user[accountId] : false;
    });
    return !!found;
  },

  //--- ECHARTS ---//
  getDemoRadarData ({ echarts }) {
    return echarts.demoRadarData;
  }
};

export default getters;
