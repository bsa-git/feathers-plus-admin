
// Define the Feathers schema for service `userProfiles`. (Can be re-generated.)
// !code: imports // !end
// !code: init // !end

// Define the model using JSON-schema
let schema = {
  // !<DEFAULT> code: schema_header
  title: 'UserProfiles',
  description: 'UserProfiles database.',
  // !end
  // !code: schema_definitions
  //--------------------------
  fakeRecords: 3,
  //--------------------------
  // !end

  // Required fields.
  required: [
    // !code: schema_required // !end
  ],
  // Fields with unique values.
  uniqueItemProperties: [
    // !code: schema_unique // !end
  ],

  // Fields in the model.
  properties: {
    // !code: schema_properties
    //-------------------------
    id: {type: 'ID'},
    _id: {type: 'ID'},
    personalPhone: {type: 'string', format: 'phone', faker: 'phone.phoneNumberFormat'},
    personalWebSite: {type: 'string', format:'uri', faker: 'internet.url'},
    addressSuite: {type: 'string', faker: 'address.secondaryAddress'},
    addressStreet: {type: 'string', faker: 'address.streetAddress'},
    addressCity: {type: 'string', faker: 'address.city'},
    addressState: {type: 'string', faker: 'address.state'},
    addressStateAbbr: {type: 'string', faker: 'address.stateAbbr'},
    addressCountry: {type: 'string', faker: 'address.country'},
    addressCountryCode: {type: 'string', faker: 'address.countryCode'},
    addressZipCode: {type: 'string', format: 'zip_code', faker: 'address.zipCode'},
    addressLatitude: {type: 'string', format: 'lat', faker: 'address.latitude'},
    addressLongitude: {type: 'string', format: 'long', faker: 'address.longitude'},
    jobCompanyName: {type: 'string', faker: 'company.companyName'},
    jobTitle: {type: 'string', faker: 'name.jobTitle'},
    jobType: {type: 'string', faker: 'name.jobType'},
    jobPhone: {type: 'string', format: 'phone',faker: 'phone.phoneNumberFormat'},
    jobWebSite: {type: 'string', format:'uri', faker: 'internet.url'},
    jobEmail: {type: 'string', format: 'email', minLength: 8, maxLength: 40, faker: 'internet.exampleEmail'},
    //-------------------------
    // !end
  },
  // !code: schema_more // !end
};

// Define optional, non-JSON-schema extensions.
let extensions = {
  // GraphQL generation.
  graphql: {
    // !code: graphql_header
    name: 'UserProfile',
    service: {
      sort: { _id: 1 },
    },
    // sql: {
    //   sqlTable: 'UserProfiles',
    //   uniqueKey: '_id',
    //   sqlColumn: {
    //     __authorId__: '__author_id__',
    //   },
    // },
    // !end
    discard: [
      // !code: graphql_discard // !end
    ],
    add: {
      // !code: graphql_add
      //-------------------
      addressFull: {type: 'String!', args: false},
      user: {type: 'User!', args: false, relation: {ourTable: '_id', otherTable: 'profileId'}},
      //-------------------
      // !end
    },
    // !code: graphql_more // !end
  },
};

// !code: more // !end

let moduleExports = {
  schema,
  extensions,
  // !code: moduleExports // !end
};

// !code: exports // !end
module.exports = moduleExports;

// !code: funcs // !end
// !code: end // !end
