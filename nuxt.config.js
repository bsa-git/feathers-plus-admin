require('@babel/polyfill');
const pkg = require('./package');
const Dotenv = require('dotenv-webpack');
const routerBase = process.env.DEPLOY_ENV === 'GH_PAGES' ? '/feathers-plus-admin/': '/';

module.exports = {
  mode: 'spa',
  srcDir: 'public',
  buildDir: 'nuxt-dist',
  generate: {
    dir: 'docs'
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
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }
    ],
    script: [
      { src: '/static/js/polyfills/polyfill.min.js' }
    ],
  },
  router: {
    base: routerBase,
    middleware: 'init-app'
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    '~/assets/style/app.styl'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    // { src: '@/plugins/polyfills/babel-polyfill', ssr: false },
    '@/plugins/ui-framework/vuetify',
    '@/plugins/validators/vee-validate'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [],
  /*
  ** Build configuration
  */
  build: {
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
