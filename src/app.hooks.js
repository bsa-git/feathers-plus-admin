
// Application hooks that run for every service. (Can be re-generated.)
const commonHooks = require('feathers-hooks-common');
// eslint-disable-next-line no-unused-vars
const normalizeQuery = require('./hooks/normalize-query');
// !code: imports
//---------------
const log = require('./hooks/log');
const {userRightsCheck} = require('./hooks/auth');
// const normalizeQuery = require('./hooks/normalize-query');
const loConcat = require('lodash/concat');
//---------------
// !end

// !<DEFAULT> code: used
// eslint-disable-next-line no-unused-vars
const { iff } = commonHooks;
// !end
// !code: init // !end

let moduleExports = {
  before: {
    // !<DEFAULT> code: before
    all: [ log() ],
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
    all: [ log() ],
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
    all: [ log() ],
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
moduleExports.before.all = loConcat(moduleExports.before.all, [userRightsCheck()]);
moduleExports.after.all = loConcat([normalizeQuery()], moduleExports.after.all);
//---------------
// !end
module.exports = moduleExports;

// !code: funcs // !end
// !code: end // !end
