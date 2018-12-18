
import useragent from 'express-useragent';

export default function (context) {
  try {
    // GoTo '/admin'
    if (context.route.path === '/') {
      const config = context.store.getters.getConfig();
      context.redirect(config.homePath);
    }
    // Set userAgent for context
    let userAgent;
    if(process.server){
      userAgent = context.req.useragent;
    }else {
      userAgent = useragent.parse(navigator.userAgent);
    }

    context.userAgent = userAgent;

  } catch (e) {
    context.error(e);
  }
}
