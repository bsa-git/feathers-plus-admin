
// Define the Feathers schema for service `roles`. (Can be re-generated.)
// !code: imports // !end
// !code: init // !end

// Define the model using JSON-schema
let schema = {
  // !<DEFAULT> code: schema_header
  title: 'Roles',
  description: 'Roles database.',
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
    // 'name'
    //-----------------------
    // !end
  ],
  // Fields with unique values.
  uniqueItemProperties: [
    // !code: schema_unique
    //-----------------------
    'name'
    //-----------------------
    // !end
  ],

  // Fields in the model.
  properties: {
    // !code: schema_properties
    //-------------------------
    id: {type: 'ID'},
    _id: {type: 'ID'},
    name: {faker: 'name.title'},
    description: {faker: 'lorem.sentence'}
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
    name: 'Role',
    service: {
      sort: {name: 1},
    },
    // sql: {
    //   sqlTable: 'Roles',
    //   uniqueKey: '_id',
    //   sqlColumn: {
    //     __authorId__: '__author_id__',
    //   },
    // },
    //----------------------
    // !end
    discard: [
      // !code: graphql_discard // !end
    ],
    add: {
      // !code: graphql_add
      //-------------------
      users: {type: '[User!]', args: false, relation: {ourTable: '_id', otherTable: 'roleId'}},
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
