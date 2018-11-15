
// mongoose.js - Mongoose adapter
const mongoose = require('mongoose');
// !code: imports // !end
// !code: init // !end

module.exports = function (app) {
  mongoose.Promise = global.Promise;
  mongoose.connect(app.get('mongodb'), { useNewUrlParser: true })
    .then(({ connection }) => {
      // eslint-disable-next-line no-console
      console.log(`connected to "${connection.name}" database at ${connection.host}:${connection.port}`);
      return connection;
    })
    .catch(error => {
      // eslint-disable-next-line no-console
      console.log(error);
      process.exit(1);
    });
  // !code: func_init // !end

  app.set('mongooseClient', mongoose);
  // !code: more // !end
};

// !code: funcs // !end
// !code: end // !end
