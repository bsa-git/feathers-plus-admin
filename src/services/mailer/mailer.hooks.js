
// Hooks for service `mailer`. (Can be re-generated.)
const commonHooks = require('feathers-hooks-common');
// !code: imports // !end

// !<DEFAULT> code: used
// eslint-disable-next-line no-unused-vars
const { iff } = commonHooks;
// eslint-disable-next-line no-unused-vars
const { create, update, patch, validateCreate, validateUpdate, validatePatch } = require('./mailer.validate');
// !end

// !code: init // !end

let moduleExports = {
  before: {
    // !code: before
    //---------------
    all: [commonHooks.disallow('external')],
    // all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
    //---------------
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
