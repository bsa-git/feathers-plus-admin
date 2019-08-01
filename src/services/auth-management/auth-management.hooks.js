
// Hooks for service `authManagement`. (Can be re-generated.)
const commonHooks = require('feathers-hooks-common');
const { authenticate } = require('@feathersjs/authentication').hooks;
// !code: imports // !end

// !<DEFAULT> code: used
// eslint-disable-next-line no-unused-vars
const { iff } = commonHooks;
// eslint-disable-next-line no-unused-vars
const { create, update, patch, validateCreate, validateUpdate, validatePatch } = require('./auth-management.validate');
// !end

// !code: init
//------------
const isAction = (...args) => hook => args.includes(hook.data.action);
//------------
// !end

let moduleExports = {
  before: {
    // Your hooks should include:
    //   all   : authenticate('jwt')
    // !code: before
    //--------------
    all: [],
    find: [],
    get: [],
    create: [iff(isAction('passwordChange', 'identityChange'), authenticate('jwt'))],
    update: [],
    patch: [],
    remove: []
    //--------------
    // !end
  },

  after: {
    // !<DEFAULT> code: after
    all: [],
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

// !code: exports // !end
module.exports = moduleExports;

// !code: funcs // !end
// !code: end // !end
