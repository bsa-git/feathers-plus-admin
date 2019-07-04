
/* eslint quotes: 0 */
// Defines Mongoose model for service `userProfiles`. (Can be re-generated.)
const merge = require('lodash.merge');
// eslint-disable-next-line no-unused-vars
const mongoose = require('mongoose');
// !code: imports // !end
// !code: init // !end

let moduleExports = merge({},
  // !<DEFAULT> code: model
  {
    personalPhone: String,
    personalWebSite: String,
    addressSuite: String,
    addressStreet: String,
    addressCity: String,
    addressState: String,
    addressStateAbbr: String,
    addressCountry: String,
    addressCountryCode: String,
    addressZipCode: String,
    addressLatitude: String,
    addressLongitude: String,
    jobCompanyName: String,
    jobTitle: String,
    jobType: String,
    jobPhone: String,
    jobWebSite: String,
    jobEmail: {
      type: String,
      minLength: 8,
      maxLength: 40
    }
  },
  // !end
  // !code: moduleExports // !end
);

// !code: exports // !end
module.exports = moduleExports;

// !code: funcs // !end
// !code: end // !end
