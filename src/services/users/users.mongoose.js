
/* eslint quotes: 0 */
// Defines Mongoose model for service `users`. (Can be re-generated.)
const merge = require('lodash.merge');
// eslint-disable-next-line no-unused-vars
const mongoose = require('mongoose');
// !code: imports // !end
// !code: init // !end

let moduleExports = merge({},
  // !<DEFAULT> code: model
  {
    email: {
      type: String,
      unique: true
    },
    password: String,
    firstName: String,
    lastName: String,
    roleId: mongoose.Schema.Types.ObjectId,
    googleId: String,
    githubId: String,
    googleAccessToken: String,
    googleRefreshToken: String,
    githubAccessToken: String,
    githubRefreshToken: String
  },
  // !end
  // !code: moduleExports // !end
);

// !code: exports // !end
module.exports = moduleExports;

// !code: funcs // !end
// !code: end // !end
