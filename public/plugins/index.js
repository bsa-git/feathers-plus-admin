
// require('@babel/polyfill');
import vueI18n from '~/plugins/localization/vue-i18n';
import veeValidate from '~/plugins/vuetify/vee-validate';
import syncStore from '~/plugins/lib/sync-store';
import util from '~/plugins/lib/util';
import HttpBox from '~/plugins/lib/http.client.class';
import Avatar from '~/plugins/lib/avatar.class';
import Service from '~/plugins/service-helpers/service-client.class';
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

  // Set store
  syncStore.setThemeDark(context);
  syncStore.setThemePrimary(context);
  syncStore.setLocale(context);
  syncStore.setNoticesCheckAt(context);
  syncStore.setChatCheckAt(context);
  syncStore.setChatSelectedItem(context);

  // Check auth
  await context.store.dispatch('checkAuth');
};
