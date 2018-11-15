
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
    // !code: schema_unique // !end
  ],

  // Fields in the model.
  properties: {
    // !code: schema_properties
    //-------------------------
    id: {type: 'ID'},
    email: {type: 'string', format: 'email', minLength: 8, maxLength: 40, faker: 'internet.email'},
    firstName: {type: 'string', minLength: 2, maxLength: 20, faker: 'name.firstName'},
    lastName: {type: 'string', minLength: 2, maxLength: 40, faker: 'name.lastName'},
    password: {type: 'string', faker: {exp: 'rec.email.slice(0, rec.email.indexOf("@"))'}},
    roleId: {type: 'ID', faker: {fk: 'roles:random'}}
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
      fullName: { type: 'String!', args: false },
      role: { type: 'Role', args: true, relation: { ourTable: 'roleId', otherTable: '_id' } },
      teams: { type: '[Team!]', args: true, relation: { ourTable: '_id', otherTable: 'memberIds' }, sort: { name: 1 } },
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
