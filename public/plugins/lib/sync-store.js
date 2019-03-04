import cookies from 'browser-cookies';
import util from '~/plugins/lib/util';

/**
 * setThemePrimary
 * @param ct {Object}
 */
const setThemePrimary = (ct) => {
  const storeThemePrimary = ct.store.state.theme.primary;
  const serverCookie = (process.server && !process.static)? util.readCookie(ct.req.headers.cookie, 'theme_primary'): storeThemePrimary;
  const cookiesThemePrimary = process.server ? serverCookie : cookies.get('theme_primary');
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
  const serverCookie = (process.server && !process.static)? util.readCookie(ct.req.headers.cookie, 'theme_dark'): storeThemeDark;
  const cookiesThemeDark = process.server ? serverCookie : cookies.get('theme_dark');
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
  const storeLocale = ct.store.state.locale;
  const serverCookie = (process.server && !process.static)? util.readCookie(ct.req.headers.cookie, 'locale'): storeLocale;
  const cookiesLocale = process.server ? serverCookie : cookies.get('locale');
  if (process.client && !cookiesLocale) {
    cookies.set('locale', storeLocale);
  } else if (cookiesLocale !== storeLocale) {
    ct.store.commit('SET_LANG', cookiesLocale);
  }
};

export default {
  setThemePrimary,
  setThemeDark,
  setLocale
};