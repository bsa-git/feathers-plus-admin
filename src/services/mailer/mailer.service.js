
// Initializes the `mailer` service on path `/mailer`. (Can be re-generated.)
const createService = require('./mailer.class');
const hooks = require('./mailer.hooks');
// !code: imports
// const Mailer = require('feathers-mailer');
// const smtpTransport = require('nodemailer-smtp-transport');
// !end
// !code: init // !end

let moduleExports = function (app) {

  let paginate = app.get('paginate');
  // !code: func_init // !end

  let options = {
    paginate,
    // !code: options_more
    app,
    mailer: {
      service: 'gmail',
      auth: {
        user: process.env.GMAIL,
        pass: process.env.GMAIL_PASSWORD
      }
    }
    // !end
  };
  // !code: options_change // !end

  // Initialize our service with any options it requires
  // !<DEFAULT> code: extend
  app.use('/mailer', createService(options));
  // !end

  // Get our initialized service so that we can register hooks
  const service = app.service('mailer');

  service.hooks(hooks);
  // !code: func_return // !end
};

// !code: exports // !end
module.exports = moduleExports;

// !code: funcs // !end
// !code: end // !end
