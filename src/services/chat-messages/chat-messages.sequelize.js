
/* eslint quotes: 0 */
// Defines Sequelize model for service `chatMessages`. (Can be re-generated.)
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
    teamId: {
      type: DataTypes.INTEGER
    },
    ownerId: {
      type: DataTypes.INTEGER
    },
    userId: {
      type: DataTypes.INTEGER
    },
    msg: {
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
