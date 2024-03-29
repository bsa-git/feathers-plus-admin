// require('@babel/polyfill');
const pkg = require('./package');
const DotEnvWebpack = require('dotenv-webpack');
const loConcat = require('lodash/concat');

const appMenu = require('./public/api/app/app-menu');
const routerBase = process.env.DEPLOY_ENV === 'GH_PAGES' ? '/feathers-plus-admin/' : '/';
const generateDir = process.env.DEPLOY_ENV === 'GH_PAGES' ? 'docs' : 'docs-dist';

const isDev = process.env.NODE_ENV === 'development';

let getRoutePaths = null;

if (process.env.DEPLOY_ENV) {
  const dotEnv = require('dotenv');// Loads environment variables from .env file.
  dotEnv.load(); // Load environment variables
  // const result = require('dotenv').config();
  // if (result.error) {
  //   throw result.error;
  // }

  /**
   * Get route paths for generate mode
   * @param menu
   * @return Array
   */
  getRoutePaths = (menu) => {
    const locales = process.env.LOCALES.split(';').filter(locale => locale !== process.env.FALLBACK_LOCALE);
    let paths = [];
    let localePaths = [];
    menu.forEach(item => {
      if (item.to) {
        paths.push(item.to);
      }
      if (item.items) {
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
    return localePaths;
  };
}

module.exports = {
  mode: 'spa',// universal|spa
  srcDir: 'public',
  buildDir: 'nuxt-dist',
  telemetry: false,
  generate: {
    dir: generateDir,
    // routes: [
    //   '/ru/error/403',
    //   '/ru/error/404',
    //   '/ru/error/500',
    //   '/ru/service/actions/create',
    //   '/ru/service/actions/delete',
    //   '/ru/service/actions/read',
    //   '/ru/service/actions/update',
    //   '/ru/service/admins/management',
    //   '/ru/service/admins/settings',
    //   '/ru/user/login',
    //   '/ru/user/profile',
    //   '/ru/user/sign-up',
    //   '/ru/widgets/chart',
    //   '/ru/widgets/social',
    //   '/ru/widgets/statistic',
    //   '/ru/widgets/widget-list',
    //   '/ru/dashboard'
    // ]
    // getRoutePaths(appMenu);
    routes: getRoutePaths ? getRoutePaths(appMenu) : []
  },
  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/static/favicon.ico' },
      // {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'},
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto: 100,300,400,500,700,900' },
      // https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900" rel="stylesheet
      { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.0.13/css/all.css' },
      // {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Playball'}
    ],
    script: [
      // {src: '/static/js/polyfills/polyfill.min.js'}
      // {src: 'https://polyfill.io/v3/polyfill.min.js?features=default%2Ces6'}
    ],
  },
  router: {
    base: routerBase,
    // middleware: ['init-app', 'i18n'],
    middleware: ['init-app']
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    // '~/assets/style/vuetify.styl',
    // '~/assets/style/app.styl'
    // '~/assets/style/vuetify.sass',
    // '~/assets/style/app.sass'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: ['@/plugins/index'],

  /*
  ** Nuxt.js modules
  */
  buildModules: ['@nuxtjs/vuetify', '@nuxtjs/svg'],

  /*
  ** Doc: https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    customVariables: ['~/assets/style/app.sass'],
    defaultAssets: {
      font: {
        family: 'Roboto'
      },
      icons: 'mdi'
    },
    optionsPath: '~/plugins/vuetify/vuetify.options.js'
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, { isClient }) {
      // Extend only webpack config for client-bundle
      if (isClient) {
        config.devtool = 'eval-source-map'; // eval-source-map source-map
        // console.log('config.module.rules', config.module.rules.find(aRule => aRule.test === /\\.jsx?$/));
      }
      config.module.rules.push({
        test: /\.xml$/,
        loader: 'xml-loader',
        options: {
          name: '[path][name].[ext]'
        }
      });
    },
    plugins: [// new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /de|fr|hu/)
      new DotEnvWebpack({
        path: './.env', // Path to .env file (this is the default)
        systemvars: true // It makes it possible to work in production mode on Heroku hosting
      }),
    ],
    transpile: ['vue-echarts', 'resize-detector']
  },
  render: {
    // resourceHints: false
  }
};
