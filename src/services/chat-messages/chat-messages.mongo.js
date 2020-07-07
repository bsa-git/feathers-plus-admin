
/* eslint quotes: 0 */
// Defines the MongoDB $jsonSchema for service `chatMessages`. (Can be re-generated.)
const merge = require('lodash.merge');
// !code: imports // !end
// !code: init // !end

let moduleExports = merge({},
  // !<DEFAULT> code: model
  {
    bsonType: "object",
    additionalProperties: false,
    properties: {
      _id: {
        bsonType: "objectId"
      },
      ownerId: {
        faker: {
          fk: "users:random"
        },
        bsonType: "objectId"
      },
      userId: {
        faker: {
          fk: "users:random"
        },
        bsonType: "objectId"
      },
      teamId: {
        faker: {
          fk: "teams:random"
        },
        bsonType: "objectId"
      },
      roleId: {
        faker: {
          fk: "roles:random"
        },
        bsonType: "objectId"
      },
      msg: {
        faker: "lorem.sentence",
        bsonType: "string"
      }
    }
  },
  // !end
  // !code: moduleExports // !end
);

// !code: exports // !end
module.exports = moduleExports;

// !code: funcs // !end
// !code: end // !end
