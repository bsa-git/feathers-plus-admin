export default async function (context) {
  try {
    // GoTo '/admin'
    if (context.route.path === '/') {
      context.redirect('/admin');
    }
  } catch (e) {
    context.error(e);
  }
}
