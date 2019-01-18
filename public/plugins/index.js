
import vueI18n from '~/plugins/localization/vue-i18n';
import vuetify from '~/plugins/ui-framework/vuetify';
import veeValidate from '~/plugins/validators/vee-validate';
import syncStore from '~/plugins/lib/sync-store';
import util from '~/plugins/lib/util';
import HttpBox from '~/plugins/lib/http.client.class';
import colors from 'vuetify/es5/util/colors';
const debug = require('debug')('app:plugin.index');

export default async (context, inject) => {

  debug(`Start on ${process.server ? 'server' : 'client'}`);

  // Inject to app
  inject('util', util);
  inject('HttpBox', HttpBox);
  inject('colors', colors);

  // Set Vue plugins
  vueI18n(context);
  vuetify(context);
  veeValidate(context);
  // Check auth
  await context.store.dispatch('checkAuth');
  // Set store
  syncStore.setThemePrimary(context);
  syncStore.setThemeDark(context);
  syncStore.setLocale(context);

};
