
const mutations = {

  //--- LOCALE ---//

  SET_LANG(state, locale) {
    if (state.locales.indexOf(locale) !== -1) {
      state.locale = locale;
    }
  },

  //--- SNACKBAR ---//

  SET_SNACK_BAR (state, snackbar) {
    state.snackbar =  Object.assign(state.snackbar, snackbar);
  },

  SHOW_SUCCESS (state, text) {
    state.snackbar =  {show: true, color: 'success', text};
  },

  SHOW_INFO (state, text) {
    state.snackbar =  {show: true, color: 'info', text};
  },

  SHOW_ERROR (state, text) {
    state.snackbar =  {show: true, color: 'error', text};
  },
};

export default mutations;
