
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
const verifyHooks = require('feathers-authentication-management').hooks;
const {AuthServer} = require('../../plugins');
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
const {preventChanges, discard, disallow, isProvider} = commonHooks;

const isTest = AuthServer.isTest();

const hookAddVerification = async (context) => {
  if(!isTest && !AuthServer.isContextExternalAccount(context)){
    let _context = await verifyHooks.addVerification()(context);
    if(!AuthServer.isAuthManager() && _context.data){
      _context.data.isVerified = true;
      _context.data.verifyToken = null;
      _context.data.verifyShortToken = null;
      _context.data.verifyExpires = null;
      _context.data.verifyChanges = {};
    }
    return _context;
  }else {
    return context;
  }
};

const hookToEmailYourVerification = (context) => {
  if(!isTest && !AuthServer.isContextExternalAccount(context) && AuthServer.isAuthManager()){
    accountNotifier(context.app).notifier('resendVerifySignup', context.result);
  }
  return context;
};

const hookRemoveVerification = (context) => {
  if(!isTest && !AuthServer.isContextExternalAccount(context)){
    return verifyHooks.removeVerification()(context);
  }else {
    return context;
  }
};

const discardFields = iff(!isTest && isProvider('external'), discard(
  // 'isVerified',
  'verifyToken',
  'verifyShortToken',
  'verifyExpires',
  'verifyChanges',
  'resetToken',
  'resetShortToken',
  'resetExpires',
  // 'googleId',
  // 'githubId',
  'googleAccessToken',
  'googleRefreshToken',
  'githubAccessToken',
  'githubRefreshToken'
));
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
    // !code: before
    //--------------
    all: [],
    find: [authenticate('jwt')],
    get: [authenticate('jwt')],
    create: [hashPassword()],
    // update: [ hashPassword(), authenticate('jwt') ],
    update: [authenticate('jwt')],
    // patch: [ hashPassword(), authenticate('jwt') ],
    patch: [authenticate('jwt')],
    remove: [authenticate('jwt')]
    //--------------
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
moduleExports.before.create = loConcat([accountsProfileData(), validateCreate()], moduleExports.before.create, hookAddVerification);
moduleExports.before.update = loConcat(iff(!isTest, disallow('external')), [validateUpdate()], moduleExports.before.update);
moduleExports.before.patch = loConcat(iff(!isTest && isProvider('external'), preventChanges(true,
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
)), [accountsProfileData(), validatePatch()], moduleExports.before.patch);

//---- AFTER ---
moduleExports.after.create = loConcat(hookToEmailYourVerification, hookRemoveVerification, moduleExports.after.create);
moduleExports.after.find = loConcat(discardFields, moduleExports.after.find);
moduleExports.after.get = loConcat(discardFields, moduleExports.after.get);
moduleExports.after.update = loConcat(discardFields, moduleExports.after.update);
moduleExports.after.patch = loConcat(discardFields, moduleExports.after.patch);
moduleExports.after.remove = loConcat(discardFields, moduleExports.after.remove);

//---------------
// !end
module.exports = moduleExports;

// !code: funcs // !end
// !code: end // !end
