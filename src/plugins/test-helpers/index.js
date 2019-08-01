
const cli = require('./cli');
const adapterInfo = require('./adapter-info');
const seedService = require('./seed-service');
const graphqlQuery = require('./graphql-query');
const graphqlExpected = require('./graphql-expected');
const isTestEnv = require('./is-test-env');

module.exports = Object.assign({},
  {
    adapterInfo,
    seedService,
    graphqlQuery,
    graphqlExpected,
    isTestEnv
  },
  cli
);
