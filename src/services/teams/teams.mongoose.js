
/* eslint quotes: 0 */
// Defines Mongoose model for service `teams`. (Can be re-generated.)
const merge = require('lodash.merge');
// eslint-disable-next-line no-unused-vars
const mongoose = require('mongoose');
// !code: imports // !end
// !code: init // !end

let moduleExports = merge({},
  // !<DEFAULT> code: model
  {
    name: {
      type: String,
      minLength: 2,
      maxLength: 30,
      unique: true
    },
    description: String,
    memberIds: [
      {
        type: mongoose.Schema.Types.ObjectId
      }
    ]
  },
  // !end
  // !code: moduleExports // !end
);

// !code: exports // !end
module.exports = moduleExports;

// !code: funcs // !end
// !code: end // !end
