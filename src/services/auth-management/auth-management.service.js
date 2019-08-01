
// Initializes the `authManagement` service on path `/auth-management`. (Can be re-generated.)
const createService = require('./auth-management.class');
const hooks = require('./auth-management.hooks');
// !code: imports
// const authManagement = require('feathers-authentication-management');
// const notifier = require('./notifier');
// !end
// !code: init // !end

let moduleExports = function (app) {

  let paginate = app.get('paginate');
  // !code: func_init // !end

  let options = {
    paginate,
    // !code: options_more
    app
    // !end
  };
  // !code: options_change // !end

  // Initialize our service with any options it requires
  // !code: extend
  //--------------
  app.use('/auth-management', createService(options));
  //--------------
  // !end

  // Get our initialized service so that we can register hooks
  const service = app.service('auth-management');

  service.hooks(hooks);
  // !code: func_return // !end
};

// !code: exports // !end
module.exports = moduleExports;

// !code: funcs // !end
// !code: end // !end
