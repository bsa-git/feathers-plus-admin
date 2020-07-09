
// fgraphql populate hook for service `teams`. (Can be re-generated.)
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
      members: {},
    }
  },
  // All resolver fields 2 levels deep.
  twoLevels: {
    query: {
      members: {
        fullName: {},
        role: {},
        profile: {},
        teams: {},
      },
    }
  },
  // !code: queries // !end
};

async function teamsPopulate (context) {
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
    recordType: 'Team',
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
let moduleExports = teamsPopulate;

// !code: exports // !end
module.exports = moduleExports;

// !code: funcs // !end
// !code: end // !end

/* For your information: all record and resolver fields 2 levels deep.
const twoLevelsFields = {
  query: {
    id: 1,
    _id: 1,
    name: 1,
    alias: 1,
    description: 1,
    members: {
      _args: {},
      id: 1,
      _id: 1,
      email: 1,
      password: 1,
      firstName: 1,
      lastName: 1,
      avatar: 1,
      roleId: 1,
      profileId: 1,
      active: 1,
      isVerified: 1,
      verifyToken: 1,
      verifyShortToken: 1,
      verifyExpires: 1,
      verifyChanges: 1,
      resetToken: 1,
      resetShortToken: 1,
      resetExpires: 1,
      googleId: 1,
      githubId: 1,
      googleAccessToken: 1,
      googleRefreshToken: 1,
      githubAccessToken: 1,
      githubRefreshToken: 1,
      loginAt: 1,
      fullName: {},
      role: {},
      profile: {},
      teams: {},
    },
  }
};
*/
