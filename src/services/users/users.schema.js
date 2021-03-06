
// Define the Feathers schema for service `users`. (Can be re-generated.)
// !code: imports // !end
// !code: init // !end

// Define the model using JSON-schema
let schema = {
  // !<DEFAULT> code: schema_header
  title: 'Users',
  description: 'Users database.',
  // !end
  // !code: schema_definitions
  //--------------------------
  fakeRecords: 3,
  //--------------------------
  // !end

  // Required fields.
  required: [
    // !code: schema_required
    //-----------------------
    // 'email',
    // 'firstName',
    // 'lastName',
    // 'roleId'
    //-----------------------
    // !end
  ],
  // Fields with unique values.
  uniqueItemProperties: [
    // !code: schema_unique
    //---------------------
    'email',
    'profileId'
    //---------------------
    // !end
  ],

  // Fields in the model.
  properties: {
    // !code: schema_properties
    //-------------------------
    id: {type: 'ID'},
    _id: {type: 'ID'},
    email: {type: 'string', format: 'email', minLength: 8, maxLength: 40, faker: 'internet.email'},
    password: {type: 'string', faker: {exp: 'rec.email.slice(0, rec.email.indexOf("@"))'}},
    firstName: {type: 'string', minLength: 2, maxLength: 20, faker: 'name.firstName'},
    lastName: {type: 'string', minLength: 2, maxLength: 40, faker: 'name.lastName'},
    avatar: {type: 'string', faker: 'internet.avatar'},
    roleId: {type: 'ID', faker: {fk: 'roles:random'}},
    profileId: {type: 'ID', faker: {fk: 'userProfiles:next'}},
    //----------------------------------------------
    active: {type: 'boolean'},
    isVerified: { type: 'boolean' },
    verifyToken: { type: 'string' },
    verifyShortToken: { type: 'string' },
    verifyExpires: { type: 'string', format: 'date-time'}, // or a long integer
    verifyChanges: { type: 'object'}, // an object (key-value map), e.g. { field: "value" }
    resetToken: { type: 'string' },
    resetShortToken: { type: 'string' },
    resetExpires: { type: 'string', format: 'date-time'}, // or a long integer
    //----------------------------------------------
    googleId: {type: 'string', chance: 'natural'},
    githubId: {type: 'string', chance: 'natural'},
    googleAccessToken: {type: 'string', chance: 'guid'},
    googleRefreshToken: {type: 'string', chance: 'guid'},
    githubAccessToken: {type: 'string', chance: 'guid'},
    githubRefreshToken: {type: 'string', chance: 'guid'},
    //-------------------------
    loginAt: { type: 'string', format: 'date-time'}, // or a long integer
    // !end
  },
  // !code: schema_more // !end
};

// Define optional, non-JSON-schema extensions.
let extensions = {
  // GraphQL generation.
  graphql: {
    // !code: graphql_header
    //----------------------
    name: 'User',
    service: {
      sort: {lastName: 1, firstName: 1},
    },
    // sql: {
    //   sqlTable: 'Users',
    //   uniqueKey: '_id',
    //   sqlColumn: {
    //     __authorId__: '__author_id__',
    //   },
    // },
    //----------------------
    // !end
    discard: [
      // !code: graphql_discard
      //-----------------------
      'password'
      //-----------------------
      // !end
    ],
    add: {
      // !code: graphql_add
      //-------------------
      fullName: {type: 'String!', args: false},
      role: {type: 'Role', args: true, relation: {ourTable: 'roleId', otherTable: '_id'}},
      profile: {type: 'UserProfile', args: true, relation: {ourTable: 'profileId', otherTable: '_id'}},
      teams: {type: '[Team!]', args: false},
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
