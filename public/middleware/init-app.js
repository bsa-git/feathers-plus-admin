export default async function (context) {
  try {
    // if (context.isClient && config.debug) {
    //   console.log('ini-app.middleware - OK.');
    // }
    // // Set config for context and store
    // context.config = config;
    // context.store.commit(types.SET_CONFIG, config);

    // Check maintenance mode
    if (context.route.path === '/') {
      context.redirect('/admin');
    }

    // Get request data
    // const http = new Http(context);
    // if (http.isServerHost()) {
    //   if (http.isPost() || http.isPut()) {
    //     context.requestData = await http.getRequestData();
    //   }
    // }
  } catch (e) {
    context.error(e);
  }
}
