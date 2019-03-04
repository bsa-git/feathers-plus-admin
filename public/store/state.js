export default () => ({
  locales: process.env.LOCALES.split(';'),
  locale: process.env.LOCALE || 'en',
  fallbackLocale: process.env.FALLBACK_LOCALE || 'en',
  config: {
    //--- SYSTEM ---//
    debug: process.env.DEBUG,
    baseUrl: process.env.BASE_URL,
    homePath: process.env.HOME_PATH,
    //--- PERSONAL-DATA ---//
    logoImage: process.env.PERSONAL_LOGO_IMAGE,
    logoTitle: process.env.PERSONAL_LOGO_TITLE,
    copyright: process.env.PERSONAL_COPYRIGHT,
    website: process.env.PERSONAL_WEBSITE,
    email: process.env.PERSONAL_EMAIL,
    githubProject: process.env.PERSONAL_GITHUB_PROJECT
  },
  snackbar: {
    show: false,
    text: 'Test success!',
    color: 'purple',
  },
  theme: {
    primary: 'indigo',
    dark: false
  }
});
