
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
moduleExports.before.update = [commonHooks.disallow('external')];
moduleExports.before.patch = iff(
  commonHooks.isProvider('external'),
  commonHooks.preventChanges(true,
    [
      'isVerified',
      'verifyToken',
      'verifyShortToken',
      'verifyExpires',
      'verifyChanges',
      'resetToken',
      'resetShortToken',
      'resetExpires'
    ]),
  hashPassword(),
  authenticate('jwt')
);
//---- AFTER ---
moduleExports.after.create = iff(!isTest && isVerifySignup, hookToEmailYourVerification, verifyHooks.removeVerification());
//---------------
// !end
module.exports = moduleExports;

// !code: funcs // !end
// !code: end // !end
