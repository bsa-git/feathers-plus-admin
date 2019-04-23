const getters = {

  getConfig(state) {
    return state.config;
  },

  getSnackBar(state) {
    return state.snackbar;
  },

  isAuth(state) {
    return !!state.auth.accessToken;
  },

  isAdmin(state, getters) {
    return getters.isMyRole('isAdmin');
  },

  isMyRole: (state, getters) => (myRole = '') => {
    return getters.getMyRole === getters.getRoles[myRole];
  },

  getMyRole(state) {
    const role = state.auth.payload ? state.auth.payload.role : '';
    return role ? role : 'No';
  },

  /**
   * Get roles
   * exx. { isAdmin: 'Administrator', isGlobalConfiguration: 'Global Configuration Officer' }
   * @param state
   * @return {Object}
   */
  getRoles(state) {
    const _roles = {};
    state.config.roles.forEach(role => {
      Object.assign(_roles, role);
    });
    return _roles;
  },

  getUser(state) {
    return state.auth.user;
  },
};

export default getters;
