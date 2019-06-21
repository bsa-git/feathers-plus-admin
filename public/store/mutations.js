
import cookies from 'browser-cookies';
const debug = require('debug')('app:store.mutations');

const isLog = false;

const mutations = {

  //--- LOCALE ---//
  SET_LANG(state, locale) {
    const locales = state.config.locales;
    if(isLog) debug('SET_LANG.state.config.locales', locales);
    if ( Array.isArray(locales) && locales.indexOf(locale) >= 0) {
      state.config.locale = locale;
      if( process.client && cookies.get('locale') !== locale){
        cookies.set('locale', locale);
      }
    }
  },

  //--- THEME ---//
  SET_THEME_PRIMARY(state, color) {
    state.theme.primary = color;
    if(process.client && cookies.get('theme_primary') !== color){
      cookies.set('theme_primary', color);
    }
  },

  SET_THEME_DARK(state, isDark) {
    state.theme.dark = isDark;
    const _isDark = isDark? '1':'0';
    if(process.client && cookies.get('theme_dark') !== _isDark){
      cookies.set('theme_dark', _isDark);
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

  SHOW_WARNING (state, text) {
    state.snackbar =  {show: true, color: 'warning', text};
  },

  SHOW_ERROR (state, text) {
    state.snackbar =  {show: true, color: 'error', text};
  },
};

export default mutations;
