
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

  getUser(state) {
    return state.auth.user;
  },
};

export default getters;
