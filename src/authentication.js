
// Configure authentication. (Can be re-generated.)
const authentication = require('@feathersjs/authentication');
const jwt = require('@feathersjs/authentication-jwt');
const local = require('@feathersjs/authentication-local');
const oauth2 = require('@feathersjs/authentication-oauth2');
const GoogleStrategy = require('passport-google-oauth20');
const GithubStrategy = require('passport-github');

// !code: imports
//---------------
const {verifiers, AuthServer} = require('./plugins/auth');
const auth = require('./hooks/auth');
const verifyHooks = require('feathers-authentication-management').hooks;
const commonHooks = require('feathers-hooks-common');
const debug = require('debug')('app:authentication');
//---------------
// !end
// !code: init
//------------
const isDebug = false;
const { iff } = commonHooks;
//------------
// !end

let moduleExports = function (app) {
  const config = app.get('authentication');
  // !code: func_init
  //-----------------
  const isVerifySignup = AuthServer.getAuthConfig().isVerifySignup;
  if(isDebug) debug('isVerifySignup:', isVerifySignup);
  //-----------------
  // !end

  // Set up authentication with the secret
  app.configure(authentication(config));
  app.configure(jwt());
  app.configure(local());
  // !code: loc_1 // !end

  app.configure(oauth2(Object.assign({
    name: 'google',
    Strategy: GoogleStrategy,
    // !code: google_options // !end
  }, config.google)));

  app.configure(oauth2(Object.assign({
    name: 'github',
    Strategy: GithubStrategy,
    // !code: github_options // !end
  }, config.github)));

  // !code: loc_2
  //--------------
  // Override  oauth2 for google
  app.configure(oauth2(Object.assign({
    name: 'google',
    Strategy: GoogleStrategy,
    Verifier: verifiers.Oauth2Verifier,
    emailField: 'email'
  }, config.google)));
  // Override  oauth2 for github
  app.configure(oauth2(Object.assign({
    name: 'github',
    Strategy: GithubStrategy,
    Verifier: verifiers.Oauth2Verifier,
    emailField: 'email'
  }, config.github)));
  //--------------
  // !end

  // The `authentication` service is used to create a JWT.
  // The before `create` hook registers strategies that can be used
  // to create a new valid JWT (e.g. local or oauth2)
  app.service('authentication').hooks({
    before: {
      create: [
        // !code: before_create
        authentication.hooks.authenticate(config.strategies),
        // Add data to payload
        auth.payloadExtension(),
        // Add isVerified for verify user`s email
        iff(isVerifySignup, verifyHooks.isVerified())
        // !end
      ],
      remove: [
        // !<DEFAULT> code: before_remove
        authentication.hooks.authenticate('jwt'),
        // !end
      ],
      // !code: before // !end
    },
    // !code: after // !end
  });
  // !code: func_return // !end
};

// !code: exports // !end
module.exports = moduleExports;

// !code: funcs // !end
// !code: end // !end
