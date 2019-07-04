
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
      password: {
        faker: {
          exp: "rec.email.slice(0, rec.email.indexOf(\"@\"))"
        },
        bsonType: "string"
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
      avatar: {
        faker: "internet.avatar",
        bsonType: "string"
      },
      roleId: {
        faker: {
          fk: "roles:random"
        },
        bsonType: "objectId"
      },
      profileId: {
        faker: {
          fk: "userProfiles:next"
        },
        bsonType: "objectId"
      },
      googleId: {
        chance: "natural",
        bsonType: "string"
      },
      githubId: {
        chance: "natural",
        bsonType: "string"
      },
      googleAccessToken: {
        chance: "guid",
        bsonType: "string"
      },
      googleRefreshToken: {
        chance: "guid",
        bsonType: "string"
      },
      githubAccessToken: {
        chance: "guid",
        bsonType: "string"
      },
      githubRefreshToken: {
        chance: "guid",
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
