
/* eslint quotes: 0 */
// Defines the MongoDB $jsonSchema for service `userProfiles`. (Can be re-generated.)
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
      personalPhone: {
        format: "phone",
        faker: "phone.phoneNumberFormat",
        bsonType: "string"
      },
      personalWebSite: {
        format: "uri",
        faker: "internet.url",
        bsonType: "string"
      },
      addressSuite: {
        faker: "address.secondaryAddress",
        bsonType: "string"
      },
      addressStreet: {
        faker: "address.streetAddress",
        bsonType: "string"
      },
      addressCity: {
        faker: "address.city",
        bsonType: "string"
      },
      addressState: {
        faker: "address.state",
        bsonType: "string"
      },
      addressStateAbbr: {
        faker: "address.stateAbbr",
        bsonType: "string"
      },
      addressCountry: {
        faker: "address.country",
        bsonType: "string"
      },
      addressCountryCode: {
        faker: "address.countryCode",
        bsonType: "string"
      },
      addressZipCode: {
        format: "zip_code",
        faker: "address.zipCode",
        bsonType: "string"
      },
      addressLatitude: {
        format: "lat",
        faker: "address.latitude",
        bsonType: "string"
      },
      addressLongitude: {
        format: "long",
        faker: "address.longitude",
        bsonType: "string"
      },
      jobCompanyName: {
        faker: "company.companyName",
        bsonType: "string"
      },
      jobTitle: {
        faker: "name.jobTitle",
        bsonType: "string"
      },
      jobType: {
        faker: "name.jobType",
        bsonType: "string"
      },
      jobPhone: {
        format: "phone",
        faker: "phone.phoneNumberFormat",
        bsonType: "string"
      },
      jobWebSite: {
        format: "uri",
        faker: "internet.url",
        bsonType: "string"
      },
      jobEmail: {
        format: "email",
        minLength: 8,
        maxLength: 40,
        faker: "internet.exampleEmail",
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
