
// Application hooks that run for every service. (Can be re-generated.)
const commonHooks = require('feathers-hooks-common');
// eslint-disable-next-line no-unused-vars
const auth = require('./hooks/auth');
// eslint-disable-next-line no-unused-vars
const constraints = require('./hooks/constraints');
// eslint-disable-next-line no-unused-vars
const myLog = require('./hooks/my-log');
// eslint-disable-next-line no-unused-vars
const normalize = require('./hooks/normalize');
// !<DEFAULT> code: imports
const log = require('./hooks/log');
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
const loConcat = require('lodash/concat');
// Add hooks
// moduleExports.before.all = loConcat(moduleExports.before.all, [myLog(), auth.userRightsCheck()]);
// moduleExports.after.all = loConcat([normalizeQuery(), myLog()], moduleExports.after.all);
moduleExports.before.all = loConcat([myLog(), auth.userRightsCheck(), constraints()]);
moduleExports.after.all = loConcat([normalize(), constraints(), myLog()]);
//---------------
// !end
module.exports = moduleExports;

// !code: funcs // !end
// !code: end // !end
