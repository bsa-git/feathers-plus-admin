import useragent from 'express-useragent';
import i18n from '~/middleware/i18n';
import AuthClient from '~/plugins/auth/auth-client.class';
import createLogMessage from '~/plugins/service-helpers/create-log-message';

const debug = require('debug')('app:middleware.init-app');
const isLog = false;
const isDebug = true;

export default async function (context) {
  try {
    // Init locales
    i18n(context);

    // Get context content
    const {$t, store, redirect, route} = context;

    // Create auth client
    const authClient = new AuthClient(store);
    if(isDebug) debug(`Start on ${process.server ? 'server' : 'client'}; <<Path>>: ${route.path} <<isAuth>>: ${authClient.isAuth}; <<myRole>>: ${authClient.getMyRole? authClient.getMyRole : 'No'}`);
    if(isLog) debug('<<user>>:', authClient.user);

    // Check auth access for route.path
    if (!authClient.isAccess(route.path)) {
      debug(`This path '${route.path}' is not available. Not enough rights.`);
      store.commit('SHOW_ERROR', `${$t('error.not_enough_rights')}.`);
      const fullPath = (store.state.config.locale === store.state.config.fallbackLocale) ? '/user/login' : `/${store.state.config.locale}/user/login`;
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
    createLogMessage(store)('ERROR-CLIENT', {error: e});
  }
}
