import util from '~/plugins/lib/util';

/**
 * Get auth services
 * @param envServices
 * @return {Array}
 */
const authServices = (envServices) => {
  return util.stripSpecific(envServices, ';').split(';').map(service => {
    const all = ['find', 'get', 'create', 'update', 'patch', 'remove'];
    const items = service.trim().split('.').map(item => item.trim());
    return {[items[0]]: items[1] === '*' ? all : util.stripSpecific(items[1], ',').split(',').map(item => item.trim())};
  });
};

/**
 * Get auth paths
 * @param envPaths
 * @return {Array}
 */
const authPaths = (envPaths) => {
  return util.stripSpecific(envPaths, ';').split(';').map(item => item.trim());
};

/**
 * Get auth roles
 * @param envRoles
 * @return {Array}
 */
const authRoles = (envRoles) => {
  return util.stripSpecific(envRoles, ';').split(';').map(role => {
    const items = role.trim().split(':').map(item => item.trim());
    return {[items[0]]: items[1]};
  });
};

/**
 * Get locales
 * @param envLocales
 * @return {Array}
 */
const locales = (envLocales) => {
  return util.stripSpecific(envLocales, ';').split(';').map(item => item.trim());
};

export default () => ({
  config: {
    //--- LOCALES ---//
    locales: locales(process.env.LOCALES),
    locale: (process.env.LOCALE || 'en').trim(),
    fallbackLocale: (process.env.FALLBACK_LOCALE || 'en').trim(),
    //--- DATABASE ---//
    mongodb: process.env.MONGODB.trim(),
    //--- AUTH ---//
    isVerifySignup: util.isTrue(process.env.IS_VERIFY_SIGNUP),
    roles: authRoles(process.env.ROLES),
    publicPaths: authPaths(process.env.PUBLIC_PATHS),
    adminPaths: authPaths(process.env.ADMIN_PATHS),
    publicServices: authServices(process.env.PUBLIC_SERVICES),
    adminServices: authServices(process.env.ADMIN_SERVICES),
    //--- SYSTEM ---//
    nodeEnv: process.env.NODE_ENV.trim(),
    debug: process.env.DEBUG.trim(),
    baseUrl: process.env.BASE_URL.trim(),
    homePath: process.env.HOME_PATH.trim(),
    //--- SECRETS ---//
    githubId: process.env.GITHUB_ID.trim(),
    githubSecret: process.env.GITHUB_SECRET.trim(),
    googleId: process.env.GOOGLE_ID.trim(),
    googleSecret: process.env.GOOGLE_SECRET.trim(),
    //--- PERSONAL-DATA ---//
    isAvatar: util.isTrue(process.env.PERSONAL_IS_AVATAR),
    logoImage: process.env.PERSONAL_ICON.trim(),
    logoTitle: process.env.PERSONAL_LOGO_TITLE.trim(),
    copyright: process.env.PERSONAL_COPYRIGHT.trim(),
    website: process.env.PERSONAL_WEBSITE.trim(),
    email: process.env.PERSONAL_EMAIL.trim(),
    githubProject: process.env.PERSONAL_GITHUB_PROJECT.trim()
  },
  snackbar: {
    show: false,
    text: 'Test success!',
    color: 'purple',
    timeout: 6000
  },
  theme: {
    primary: 'indigo',
    dark: false
  }
});
