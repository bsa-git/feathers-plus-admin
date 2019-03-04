const resolve = require('path').resolve;
const {Nuxt, Builder} = require('nuxt');
const genSpecs = require('../../feathers-gen-specs.json');
const testNodeEnv = process.env.NODE_ENV === genSpecs.app.environmentsAllowingSeedData;

// Add nuxt.js middleware
module.exports = function (app) {

  // Else NodeEnv == 'test' then return
  if (testNodeEnv) return;
  // Setup nuxt.js
  let nuxtConfig = {};
  try {
    nuxtConfig = require('../../nuxt.config.js');
  } catch (e) {
    console.log(e.message);
    throw e;
  }
  nuxtConfig.rootDir = resolve(__dirname, '..', '..');
  nuxtConfig.dev = process.env.NODE_ENV !== 'production';

  const nuxt = new Nuxt(nuxtConfig);

  if (nuxtConfig.dev) {
    const builder = new Builder(nuxt);

    builder.build().then(() => process.emit('nuxt:build:done'));
  } else {
    process.nextTick(() => process.emit('nuxt:build:done'));
  }

  const nuxtMiddleware = function (req, res) {
    nuxt.render(req, res);
  };

  app.use(nuxtMiddleware);

};
