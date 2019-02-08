
/* eslint quotes: 0 */
// Defines Sequelize model for service `users`. (Can be re-generated.)
const merge = require('lodash.merge');
const Sequelize = require('sequelize');
// eslint-disable-next-line no-unused-vars
const DataTypes = Sequelize.DataTypes;
// !code: imports // !end
// !code: init // !end

// Your model may need the following fields:
//   email:      { type: DataTypes.STRING, allowNull: false, unique: true },
//   password:   { type: DataTypes.STRING, allowNull: false },
//   googleId:   { type: DataTypes.STRING },
//   githubId:   { type: DataTypes.STRING },
let moduleExports = merge({},
  // !<DEFAULT> code: sequelize_model
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.TEXT
    },
    firstName: {
      type: DataTypes.STRING
    },
    lastName: {
      type: DataTypes.STRING
    },
    roleId: {
      type: DataTypes.INTEGER
    },
    googleId: {
      type: DataTypes.TEXT
    },
    githubId: {
      type: DataTypes.TEXT
    },
    googleAccessToken: {
      type: DataTypes.TEXT
    },
    googleRefreshToken: {
      type: DataTypes.TEXT
    },
    githubAccessToken: {
      type: DataTypes.TEXT
    },
    githubRefreshToken: {
      type: DataTypes.TEXT
    }
  },
  // !end
  // !code: moduleExports // !end
);

// !code: exports // !end
module.exports = moduleExports;

// !code: funcs // !end
// !code: end // !end
