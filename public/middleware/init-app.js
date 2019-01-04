import useragent from 'express-useragent';
const debug = require('debug')('app:middleware.init-app');

export default async function (context) {
  try {
    debug(`Start on ${process.server ? 'server' : 'client'}`);
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
