const loConcat = require('lodash/concat');
import feathersVuex from 'feathers-vuex';
import feathersClient from '~/plugins/lib/feathers-client';
import appMenu from '~/api/data/app-menu';

const { auth } = feathersVuex(feathersClient, { idField: '_id' });

/**
 * Get public paths for auth
 * @param menu
 * @return Array
 */
const getPublicPaths = (menu) => {
  const locales = process.env.LOCALES.split(';').filter(locale => locale !== process.env.FALLBACK_LOCALE);
  let paths = [];
  let localePaths = [];
  menu.forEach(item => {
    if (item.to && item.public) {
      paths.push(item.to);
    }
    if (item.items && item.public) {
      item.items.forEach((i) => {
        if (i.children) {
          i.children.forEach((child) => {
            if (child.to) paths.push(child.to);
          });
        }
        if (i.to) paths.push(i.to);
      });
    }
  });
  locales.forEach((locale) => {
    localePaths = loConcat(localePaths, paths.map(path => `/${locale}${path}`));
  });
  localePaths = loConcat(localePaths, paths);
  return localePaths;
};

const authPlugin = auth({
  userService: 'users',
  state: {
    publicPages: getPublicPaths(appMenu)
  }
});

export default authPlugin;
