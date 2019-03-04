import useragent from 'express-useragent';
import i18n from '~/middleware/i18n';
const debug = require('debug')('app:middleware.init-app');

export default async function (context) {
  try {
    debug(`Start on ${process.server ? 'server' : 'client'}`);

    // Init locales
    i18n(context);

    // Redirect to login
    const { $t, store, redirect, route } = context;
    const { auth } = store.state;

    if (!auth.publicPages.includes(route.path) && !auth.payload) {
      debug(`This path '${route.path}' is not available. Not enough rights.`);
      store.commit('SHOW_WARNING', `${$t('error.not_enough_rights')}.`);
      const fullPath = (store.state.locale === store.state.fallbackLocale)? '/user/login':`/${store.state.locale}/user/login`;
      return redirect(fullPath);
    }

    // GoTo homePath
    if (context.route.path === '/') {
      const config = context.store.getters.getConfig();
      context.redirect(config.homePath);
    }
    // Set userAgent for context
    let userAgent;
    if (process.server) {
      userAgent = context.req.useragent;
    } else {
      userAgent = useragent.parse(navigator.userAgent);
    }
    context.userAgent = userAgent;
  } catch (e) {
    context.error(e);
  }
}
