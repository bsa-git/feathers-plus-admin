
// fgraphql populate hook for service `users`. (Can be re-generated.)
const runTime = require('@feathers-plus/graphql/lib/run-time');
const { fgraphql, serialize } = require('feathers-hooks-common');
const { parse } = require('graphql');
// !<DEFAULT> code: graphql
const schema = require('../../services/graphql/graphql.schemas');
const resolvers = require('../../services/graphql/service.resolvers');
// !end
// !code: imports // !end
// !code: init // !end

const queries = {
  // No populate
  none: {},
  // All resolver fields 1 level deep.
  oneLevel: {
    query: {
      fullName: {},
      role: {},
      teams: {},
    }
  },
  // All resolver fields 2 levels deep.
  twoLevels: {
    query: {
      fullName: {
      },
      role: {
        users: {},
      },
      teams: {
        members: {},
      },
    }
  },
  // !code: queries // !end
};

async function usersPopulate (context) {
  // eslint-disable-next-line no-unused-vars
  const params = context.params;
  let query, options, serializer;

  if (params.$populate) { return context; } // another populate is calling this service

  // !<DEFAULT> code: populate
  // Example: always the same query
  ({ query, options, serializer } = queries.foo);

  // Example: select query based on user being authenticated or not
  ({ query, options, serializer } = queries[params.user ? queries.foo : queries.bar]);

  // Example: select query based on the user role
  if (params.user && params.user.roles.includes('foo')) {
    ({ query, options, serializer } = queries.foo);
  }

  // Example: allow client to provide the query
  if (params.$populateQuery) {
    ({ query, options, serializer } = params.$populateQuery);
  }

  // Populate the data.
  let newContext = await fgraphql({
    parse,
    runTime,
    schema,
    resolvers,
    recordType: 'User',
    query,
    options,
  })(context);

  // Prune and sanitize the data.
  if (serializer) {
    newContext = serialize(serializer)(newContext);
  }

  // End the hook.
  return newContext;
  // !end
}

// !code: more // !end
let moduleExports = usersPopulate;

// !code: exports // !end
module.exports = moduleExports;

// !code: funcs // !end
// !code: end // !end

/* For your information: all record and resolver fields 2 levels deep.
const twoLevelsFields = {
  query: {
    id: 1,
    _id: 1,
    email: 1,
    password: 1,
    firstName: 1,
    lastName: 1,
    avatar: 1,
    roleId: 1,
    googleId: 1,
    githubId: 1,
    googleAccessToken: 1,
    googleRefreshToken: 1,
    githubAccessToken: 1,
    githubRefreshToken: 1,
    fullName: {
      _args: {},
    },
    role: {
      _args: {},
      id: 1,
      _id: 1,
      name: 1,
      description: 1,
      users: {},
    },
    teams: {
      _args: {},
      id: 1,
      _id: 1,
      name: 1,
      description: 1,
      members: {},
    },
  }
};
*/
