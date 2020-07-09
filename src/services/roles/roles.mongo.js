
/* eslint quotes: 0 */
// Defines the MongoDB $jsonSchema for service `roles`. (Can be re-generated.)
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
      name: {
        faker: "name.title",
        bsonType: "string"
      },
      alias: {
        faker: {
          exp: "\"is\" + rec.name.replace(/ /gi, \"\")"
        },
        bsonType: "string"
      },
      description: {
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
