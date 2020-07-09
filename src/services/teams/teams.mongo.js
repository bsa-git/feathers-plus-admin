
/* eslint quotes: 0 */
// Defines the MongoDB $jsonSchema for service `teams`. (Can be re-generated.)
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
        minLength: 2,
        maxLength: 30,
        faker: "commerce.productName",
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
