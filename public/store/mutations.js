
const mutations = {

  //--- SNACKBAR ---//

  SET_SNACKBAR (state, snackbar) {
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
