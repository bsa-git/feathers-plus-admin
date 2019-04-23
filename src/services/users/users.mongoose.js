
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
      minLength: 8,
      maxLength: 40,
      unique: true
    },
    password: String,
    firstName: {
      type: String,
      minLength: 2,
      maxLength: 20
    },
    lastName: {
      type: String,
      minLength: 2,
      maxLength: 40
    },
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
