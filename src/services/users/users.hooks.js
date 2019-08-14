
// Hooks for service `users`. (Can be re-generated.)
const commonHooks = require('feathers-hooks-common');
const { authenticate } = require('@feathersjs/authentication').hooks;
// eslint-disable-next-line no-unused-vars
const { hashPassword, protect } = require('@feathersjs/authentication-local').hooks;
// eslint-disable-next-line no-unused-vars
const accountsProfileData = require('./hooks/accounts-profile-data');
// eslint-disable-next-line no-unused-vars
const usersPopulate = require('./users.populate');
// !code: imports
//---------------
const loConcat = require('lodash/concat');
const {AuthServer} = require('../../plugins/auth');
const verifyHooks = require('feathers-authentication-management').hooks;
const accountNotifier = require('../auth-management/notifier');
//---------------
// !end

// !<DEFAULT> code: used
// eslint-disable-next-line no-unused-vars
const { iff } = commonHooks;
// eslint-disable-next-line no-unused-vars
const { create, update, patch, validateCreate, validateUpdate, validatePatch } = require('./users.validate');
// !end

// !code: init
//------------
// const { preventChanges, discard, disallow, isProvider } = commonHooks;
const {preventChanges,  discard, disallow, isProvider } = commonHooks;
const hookToEmailYourVerification = (context) => {
  accountNotifier(context.app).notifier('resendVerifySignup', context.result);
};
const isVerifySignup = AuthServer.getAuthConfig().isVerifySignup;
const isTest = AuthServer.isTest();
//------------
// !end

let moduleExports = {
  before: {
    // Your hooks should include:
    //   find  : authenticate('jwt')
    //   get   : authenticate('jwt')
    //   create: hashPassword()
    //   update: hashPassword(), authenticate('jwt')
    //   patch : hashPassword(), authenticate('jwt')
    //   remove: authenticate('jwt')
    // !<DEFAULT> code: before
    all: [],
    find: [ authenticate('jwt') ],
    get: [ authenticate('jwt') ],
    create: [ hashPassword() ],
    update: [ hashPassword(), authenticate('jwt') ],
    patch: [ hashPassword(), authenticate('jwt') ],
    remove: [ authenticate('jwt') ]
    // !end
  },

  after: {
    // Your hooks should include:
    //   all   : protect('password') /* Must always be the last hook */
    // !<DEFAULT> code: after
    all: [ protect('password') /* Must always be the last hook */ ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
    // !end
  },

  error: {
    // !<DEFAULT> code: error
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
    // !end
  },
  // !code: moduleExports // !end
};

// !code: exports
//---------------
// Add hooks
//---- BEFORE ---
moduleExports.before.create = loConcat([accountsProfileData(), validateCreate()], moduleExports.before.create, iff(!isTest && isVerifySignup, verifyHooks.addVerification()));
moduleExports.before.update = loConcat(iff(!isTest, disallow('external')), [validateUpdate()], moduleExports.before.update);
moduleExports.before.patch = loConcat(iff(!isTest && isProvider('external'), preventChanges(true,
  'isVerified',
  'verifyToken',
  'verifyShortToken',
  'verifyExpires',
  'verifyChanges',
  'resetToken',
  'resetShortToken',
  'resetExpires'
)), [validatePatch()], moduleExports.before.patch);

//---- AFTER ---
moduleExports.after.all = loConcat(iff(!isTest && isProvider('external'), discard(
  'isVerified',
  'verifyToken',
  'verifyShortToken',
  'verifyExpires',
  'verifyChanges',
  'resetToken',
  'resetShortToken',
  'resetExpires',
  'googleId',
  'githubId',
  'googleAccessToken',
  'googleRefreshToken',
  'githubAccessToken',
  'githubRefreshToken'
)), moduleExports.after.all);
moduleExports.after.create = loConcat(iff(!isTest && isVerifySignup, hookToEmailYourVerification, verifyHooks.removeVerification()), moduleExports.after.create);
//---------------
// !end
module.exports = moduleExports;

// !code: funcs // !end
// !code: end // !end
