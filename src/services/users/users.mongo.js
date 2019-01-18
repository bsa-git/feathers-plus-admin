
/* eslint quotes: 0 */
// Defines the MongoDB $jsonSchema for service `users`. (Can be re-generated.)
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
      email: {
        format: "email",
        minLength: 8,
        maxLength: 40,
        faker: "internet.email",
        bsonType: "string"
      },
      googleId: {
        bsonType: "string"
      },
      githubId: {
        bsonType: "string"
      },
      googleTokens: {
        bsonType: "object"
      },
      githubTokens: {
        bsonType: "object"
      },
      firstName: {
        minLength: 2,
        maxLength: 20,
        faker: "name.firstName",
        bsonType: "string"
      },
      lastName: {
        minLength: 2,
        maxLength: 40,
        faker: "name.lastName",
        bsonType: "string"
      },
      password: {
        faker: {
          exp: "rec.email.slice(0, rec.email.indexOf(\"@\"))"
        },
        bsonType: "string"
      },
      roleId: {
        faker: {
          fk: "roles:random"
        },
        bsonType: "objectId"
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
