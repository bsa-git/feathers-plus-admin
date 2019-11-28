
// require('@babel/polyfill');
import vueI18n from '~/plugins/localization/vue-i18n';
import veeValidate from '~/plugins/validators/vee-validate';
import syncStore from '~/plugins/lib/sync-store';
import util from '~/plugins/lib/util';
import HttpBox from '~/plugins/lib/http.client.class';
import Avatar from '~/plugins/lib/avatar.class';
import Service from '~/plugins/lib/service-client.class';
import colors from 'vuetify/lib/util/colors';
const debug = require('debug')('app:plugin.index');

export default async (context, inject) => {

  debug(`Start on ${process.server ? 'server' : 'client'}`);

  // Inject to app
  inject('util', util);
  inject('HttpBox', HttpBox);
  inject('Avatar', Avatar);
  inject('Service', Service);
  inject('colors', colors);
  inject('redirect', context.redirect);

  // Set Vue plugins
  vueI18n(context);
  veeValidate(context);
  // Check auth
  await context.store.dispatch('checkAuth');
  // Set store
  syncStore.setThemePrimary(context);
  syncStore.setThemeDark(context);
  syncStore.setLocale(context);
};
