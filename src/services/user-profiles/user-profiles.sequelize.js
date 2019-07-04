
/* eslint quotes: 0 */
// Defines Sequelize model for service `userProfiles`. (Can be re-generated.)
const merge = require('lodash.merge');
const Sequelize = require('sequelize');
// eslint-disable-next-line no-unused-vars
const DataTypes = Sequelize.DataTypes;
// !code: imports // !end
// !code: init // !end

let moduleExports = merge({},
  // !<DEFAULT> code: sequelize_model
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    personalPhone: {
      type: DataTypes.TEXT
    },
    personalWebSite: {
      type: DataTypes.TEXT
    },
    addressSuite: {
      type: DataTypes.TEXT
    },
    addressStreet: {
      type: DataTypes.TEXT
    },
    addressCity: {
      type: DataTypes.TEXT
    },
    addressState: {
      type: DataTypes.TEXT
    },
    addressStateAbbr: {
      type: DataTypes.TEXT
    },
    addressCountry: {
      type: DataTypes.TEXT
    },
    addressCountryCode: {
      type: DataTypes.TEXT
    },
    addressZipCode: {
      type: DataTypes.TEXT
    },
    addressLatitude: {
      type: DataTypes.TEXT
    },
    addressLongitude: {
      type: DataTypes.TEXT
    },
    jobCompanyName: {
      type: DataTypes.TEXT
    },
    jobTitle: {
      type: DataTypes.TEXT
    },
    jobType: {
      type: DataTypes.TEXT
    },
    jobPhone: {
      type: DataTypes.TEXT
    },
    jobWebSite: {
      type: DataTypes.TEXT
    },
    jobEmail: {
      type: DataTypes.STRING
    }
  },
  // !end
  // !code: moduleExports // !end
);

// !code: exports // !end
module.exports = moduleExports;

// !code: funcs // !end
// !code: end // !end
