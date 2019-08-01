
import cookies from 'browser-cookies';
import typeOf from '~/plugins/lib/type-of';
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

  SHOW_SUCCESS (state, value) {
    if(typeOf.isString(value)){
      state.snackbar =  {show: true, color: 'success', text: value};
    }else {
      state.snackbar =  {show: true, color: 'success', text: value.text, timeout: value.timeout};
    }
  },

  SHOW_INFO (state, value) {
    if(typeOf.isString(value)){
      state.snackbar =  {show: true, color: 'info', text: value};
    }else {
      state.snackbar =  {show: true, color: 'info', text: value.text, timeout: value.timeout};
    }
  },

  SHOW_WARNING (state, value) {
    if(typeOf.isString(value)){
      state.snackbar =  {show: true, color: 'warning', text: value};
    }else {
      state.snackbar =  {show: true, color: 'warning', text: value.text, timeout: value.timeout};
    }
  },

  SHOW_ERROR (state, value) {
    if(typeOf.isString(value)){
      state.snackbar =  {show: true, color: 'error', text: value};
    }else {
      state.snackbar =  {show: true, color: 'error', text: value.text, timeout: value.timeout};
    }
  },
};

export default mutations;
