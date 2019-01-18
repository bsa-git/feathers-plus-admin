require('@babel/polyfill');
const pkg = require('./package');
const Dotenv = require('dotenv-webpack');
const routerBase = process.env.DEPLOY_ENV === 'GH_PAGES' ? '/feathers-plus-admin/' : '/';

module.exports = {
  mode: 'spa',// universal|spa
  srcDir: 'public',
  buildDir: 'nuxt-dist',
  generate: {
    dir: 'docs',
    routes: [
      '/ru/error/403',
      '/ru/error/404',
      '/ru/error/500',
      '/ru/service/actions/create',
      '/ru/service/actions/delete',
      '/ru/service/actions/read',
      '/ru/service/actions/update',
      '/ru/service/admins/management',
      '/ru/service/admins/settings',
      '/ru/user/login',
      '/ru/user/profile',
      '/ru/user/sign-up',
      '/ru/widgets/chart',
      '/ru/widgets/social',
      '/ru/widgets/statistic',
      '/ru/widgets/widget-list',
      '/ru/dashboard'
    ]
  },
  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      {charset: 'utf-8'},
      {'http-equiv': 'X-UA-Compatible', content: 'IE=edge'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: pkg.description}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/static/favicon.ico'},
      {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'},
      {rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.0.13/css/all.css'}
    ],
    script: [
      {src: '/static/js/polyfills/polyfill.min.js'}
    ],
  },
  router: {
    base: routerBase,
    middleware: ['init-app', 'i18n']
  },
  /*
  ** Customize the progress-bar color
  */
  loading: {color: '#fff'},

  /*
  ** Global CSS
  */
  css: [
    '~/assets/style/vuetify.styl',
    '~/assets/style/app.styl'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: ['@/plugins/index'],

  /*
  ** Nuxt.js modules
  */
  modules: [],
  /*
  ** Build configuration
  */
  build: {
    // devtool: 'eval-source-map', //'inline-source-map', 'eval-source-map'
    /*
    ** You can extend webpack config here
    */
    plugins: [
      new Dotenv({
        path: './.env', // Path to .env file (this is the default)
        systemvars: true // It makes it possible to work in production mode on Heroku hosting
      })
    ]
  }
};
