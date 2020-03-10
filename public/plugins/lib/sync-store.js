import cookies from 'browser-cookies';
import util from '~/plugins/lib/util';
// import themeColorOptions from '~/api/data/theme-color-options.json';

const debug = require('debug')('app:plugins.sync-store');
const isDebug = false;

/**
 * setThemePrimary
 * @param ct {Object}
 */
const setThemePrimary = (ct) => {
  const storeThemePrimary = ct.store.state.theme.primary;
  const serverCookieThemePrimary = (process.server && !process.static) ? util.readCookie(ct.req.headers.cookie, 'theme_primary') : storeThemePrimary;
  const cookiesThemePrimary = process.server ? serverCookieThemePrimary : cookies.get('theme_primary');
  if (process.client && !cookiesThemePrimary) {
    cookies.set('theme_primary', storeThemePrimary);
  } else if (cookiesThemePrimary !== storeThemePrimary) {
    ct.store.commit('SET_THEME_PRIMARY', cookiesThemePrimary);
  }
};

/**
 * setThemeDark
 * @param ct {Object}
 */
const setThemeDark = (ct) => {
  const storeThemeDark = ct.store.state.theme.dark ? '1' : '0';
  const serverCookieThemeDark = (process.server && !process.static) ? util.readCookie(ct.req.headers.cookie, 'theme_dark') : storeThemeDark;
  const cookiesThemeDark = process.server ? serverCookieThemeDark : cookies.get('theme_dark');
  if (process.client && cookiesThemeDark === null) {
    cookies.set('theme_dark', storeThemeDark);
  } else if (cookiesThemeDark !== storeThemeDark) {
    ct.store.commit('SET_THEME_DARK', util.isTrue(cookiesThemeDark));
  }
};

/**
 * setLocale
 * @param ct {Object}
 */
const setLocale = (ct) => {
  const storeLocale = ct.store.state.config.locale;
  const serverCookie = (process.server && !process.static) ? util.readCookie(ct.req.headers.cookie, 'locale') : storeLocale;
  const cookiesLocale = process.server ? serverCookie : cookies.get('locale');
  if (process.client && !cookiesLocale) {
    cookies.set('locale', storeLocale);
  } else if (cookiesLocale !== storeLocale) {
    ct.store.commit('SET_LANG', cookiesLocale);
  }
};

/**
 * Set notices checkAt
 * @param ct {Object}
 */
const setNoticesCheckAt = (ct) => {
  const storeNoticesCheckAt = ct.store.state.notices.checkAt;
  const serverCookieNoticesCheckAt = (process.server && !process.static) ? util.readCookie(ct.req.headers.cookie, 'notices_checkAt') : storeNoticesCheckAt;
  const cookiesNoticesCheckAt = process.server ? serverCookieNoticesCheckAt : cookies.get('notices_checkAt');
  if (process.client && !cookiesNoticesCheckAt) {
    cookies.set('notices_checkAt', storeNoticesCheckAt);
  } else if (cookiesNoticesCheckAt !== storeNoticesCheckAt) {
    ct.store.commit('SET_NOTICES_CHECKAT', cookiesNoticesCheckAt);
  }
};

/**
 * Init vuetify
 * @param ctVue {Object}
 * @param isUpdateColor {Boolean}
 */
const initVuetify = function (ctVue, isUpdateColor = false) {
  // Get store theme
  const theme = ctVue.$store.state.theme;
  if (isDebug) debug('initVuetify.theme:', theme);
  // Get color
  const color = ctVue.$store.getters['getPrimaryColor'];
  if (isDebug) debug('initVuetify.primaryColor:', color);
  // Set theme dark
  ctVue.$vuetify.theme.dark = theme.dark;
  // Set theme primary
  ctVue.$vuetify.theme.themes.dark.primary = color;
  ctVue.$vuetify.theme.themes.light.primary = color;
  // Update color
  if(isUpdateColor){
    const themeSettings = ctVue.$refs.appRightDrawer.$refs.appThemeSettings;
    let themeColor = themeSettings.themeColor;
    if(themeColor !== 'indigo'){
      themeSettings.updateThemeColor();
    }
  }
  // Set vuetify lang
  ctVue.$vuetify.lang.t = (key, ...params) => ctVue.$t(key, params);
};

export default {
  setThemePrimary,
  setThemeDark,
  setLocale,
  setNoticesCheckAt,
  initVuetify
};
