import Vue from 'vue';
import VueI18n from 'vue-i18n';
// import util from '~/plugins/lib/util';

Vue.use(VueI18n);

export default (context) => {
  const app = context.app;
  const config = context.store.state.config;
  // Set i18n instance on app
  // This way we can use it in middleware and pages asyncData/fetch
  app.i18n = new VueI18n({
    locale: config.locale,
    fallbackLocale: config.fallbackLocale,
    messages: {
      'en': require('~/plugins/localization/locales/en.json'),
      'ru': require('~/plugins/localization/locales/ru.json')
    }
  });
  context.$t = VueI18n.prototype.t.bind(app.i18n);

  app.i18n.path = (link) => {
    const _link = app.$util.stripSlashes(link);
    if (app.i18n.locale === app.i18n.fallbackLocale) {
      return `/${_link}`;
    }
    return `/${app.i18n.locale}/${_link}`;
  };
};
