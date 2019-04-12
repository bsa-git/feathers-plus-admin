import useragent from 'express-useragent';
import i18n from '~/middleware/i18n';
import util from '~/plugins/lib/util';
const debug = require('debug')('app:middleware.init-app');

const isLog = false;

export default async function (context) {
  try {
    // Init locales
    i18n(context);

    // Redirect to login
    const {$t, store, redirect, route} = context;
    const {auth} = store.state;
    const isAuth = !!auth.user;
    // The delay is needed to fully create a user object in store
    await util.delayTime(1);
    const isAdmin = auth.user ? auth.user.isAdmin : false;
    debug(`Start on ${process.server ? 'server' : 'client'}; <<isAuth>>: ${isAuth}; <<isAdmin>>: ${isAdmin}`);

    if(isLog) debug('<<user>>:', auth.user);

    if ((!isAuth && !auth.publicPages.includes(route.path)) ||
      (isAuth && !isAdmin && auth.adminPages.includes(route.path))) {
      debug(`This path '${route.path}' is not available. Not enough rights.`);
      store.commit('SHOW_ERROR', `${$t('error.not_enough_rights')}.`);
      const fullPath = (store.state.locale === store.state.fallbackLocale) ? '/user/login' : `/${store.state.locale}/user/login`;
      return redirect(fullPath);
    }

    // GoTo homePath
    if (context.route.path === '/') {
      const config = context.store.getters.getConfig;
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
