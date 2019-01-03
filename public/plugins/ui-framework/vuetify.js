import Vue from 'vue';
import Vuetify from 'vuetify';
import cookies from 'browser-cookies';
import util from '~/plugins/lib/util';
import colors from 'vuetify/es5/util/colors';

/**
 * setThemePrimary
 * @param st {Object}
 */
const setThemePrimary = (st) => {
  const cookiesThemePrimary = cookies.get('theme_primary');
  const storeThemePrimary = st.state.theme.primary;
  if (!cookiesThemePrimary) {
    cookies.set('theme_primary', storeThemePrimary);
  } else if (cookiesThemePrimary !== storeThemePrimary) {
    st.commit('SET_THEME_PRIMARY', cookiesThemePrimary);
  }
};

/**
 * setThemeDark
 * @param st {Object}
 */
const setThemeDark = (st) => {
  const cookiesThemeDark = cookies.get('theme_dark');
  const storeThemeDark = st.state.theme.dark ? '1' : '0';
  if (cookiesThemeDark === null) {
    cookies.set('theme_dark', storeThemeDark);
  } else if (cookiesThemeDark !== storeThemeDark) {
    st.commit('SET_THEME_DARK', util.isTrue(cookiesThemeDark));
  }
};


export default ({app, store}) => {

  setThemePrimary(store);
  setThemeDark(store);

  const config = {
    lang: {
      t: (key, ...params) => app.i18n.t(key, params)
    },
    theme: {
      primary: colors.indigo.base,
      secondary: colors.indigo.lighten4,
      accent: colors.indigo.base,
    },
    options: {
      themeVariations: ['primary', 'secondary', 'accent'],
      extra: {
        mainToolbar: {
          color: 'primary',
        },
        sideToolbar: {},
        sideNav: 'primary',
        mainNav: 'primary lighten-1',
        bodyBg: '',
        pageBg: colors.grey['lighten-5']
      }
    }
  };

  Vue.use(Vuetify, config);
};
