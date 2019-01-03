import Vue from 'vue';
import VueI18n from 'vue-i18n';
import util from '~/plugins/lib/util';
import cookies from 'browser-cookies';

Vue.use(VueI18n);

/**
 * setLocale
 * @param st {Object}
 */
const setLocale = (st) => {
  const cookiesLocale = cookies.get('locale');
  const storeLocale = st.state.locale;
  if (!cookiesLocale) {
    cookies.set('locale', storeLocale);
  } else if (cookiesLocale !== storeLocale) {
    st.commit('SET_LANG', cookiesLocale);
  }
};

export default ({app, store}) => {

  setLocale(store);

  // Set i18n instance on app
  // This way we can use it in middleware and pages asyncData/fetch
  app.i18n = new VueI18n({
    locale: store.state.locale,
    fallbackLocale: process.env.FALLBACK_LOCALE || 'en',
    messages: {
      'en': require('~/plugins/localization/locales/en.json'),
      'ru': require('~/plugins/localization/locales/ru.json')
    }
  });

  app.i18n.path = (link) => {
    const _link = util.stripSlashes(link);
    if (app.i18n.locale === app.i18n.fallbackLocale) {
      return `/${_link}`;
    }
    return `/${app.i18n.locale}/${_link}`;
  };
};
