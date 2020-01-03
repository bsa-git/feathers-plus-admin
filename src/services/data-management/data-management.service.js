
// Initializes the `dataManagement` service on path `/data-management`. (Can be re-generated.)
const createService = require('./data-management.class');
const hooks = require('./data-management.hooks');
// !code: imports // !end
// !code: init // !end

let moduleExports = function (app) {

  let paginate = app.get('paginate');
  // !code: func_init // !end

  let options = {
    paginate,
    // !code: options_more
    //--------------------
    app
    //--------------------
    // !end
  };
  // !code: options_change // !end

  // Initialize our service with any options it requires
  // !<DEFAULT> code: extend
  app.use('/data-management', createService(options));
  // !end

  // Get our initialized service so that we can register hooks
  const service = app.service('data-management');

  service.hooks(hooks);
  // !code: func_return // !end
};

// !code: exports // !end
module.exports = moduleExports;

// !code: funcs // !end
// !code: end // !end
