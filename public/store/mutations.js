
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
    state.theme.name = isDark? 'dark' : 'light';
    const _isDark = isDark? '1':'0';
    if(process.client && cookies.get('theme_dark') !== _isDark){
      cookies.set('theme_dark', _isDark);
      cookies.set('theme_name', state.theme.name);
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

  //--- ECHARTS ---//
  INCREMENT_DEMO_RADAR_DATA ({ echarts }, { amount = 1, index = 0 }) {
    let data = echarts.demoRadarData;
    let metric = data[index];
    metric.value = Math.max(Math.min(metric.value + amount, metric.max), 0);
    if (isLog) debug('mutations.INCREMENT_DEMO_RADAR_DATA.value:', metric.value);
  },
};

export default mutations;
