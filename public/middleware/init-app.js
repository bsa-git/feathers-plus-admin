
import useragent from 'express-useragent'

export default function (context) {
  try {
    // GoTo '/admin'
    if (context.route.path === '/') {
      context.redirect('/admin');
    }
    // Set userAgent for context
    const userAgent = useragent.parse(navigator.userAgent);
    context.userAgent = userAgent;

  } catch (e) {
    context.error(e);
  }
}
