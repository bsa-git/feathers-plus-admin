
// Hooks for service `teams`. (Can be re-generated.)
const commonHooks = require('feathers-hooks-common');
const { authenticate } = require('@feathersjs/authentication').hooks;
// !code: imports
//---------------
const loConcat = require('lodash/concat');
//---------------
// !end

// !<DEFAULT> code: used
// eslint-disable-next-line no-unused-vars
const { iff } = commonHooks;
// eslint-disable-next-line no-unused-vars
const { create, update, patch, validateCreate, validateUpdate, validatePatch } = require('./teams.validate');
// !end

// !code: init // !end

let moduleExports = {
  before: {
    // Your hooks should include:
    //   all   : authenticate('jwt')
    // !<DEFAULT> code: before
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
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

// !code: exports
//---------------
// Add schema validate
moduleExports.before.create = loConcat([validateCreate()], moduleExports.before.create);
moduleExports.before.update = loConcat([validateUpdate()], moduleExports.before.update);
moduleExports.before.patch = loConcat([validatePatch()], moduleExports.before.patch);
//---------------
// !end
module.exports = moduleExports;

// !code: funcs // !end
// !code: end // !end
