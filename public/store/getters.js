
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
};

export default getters;
