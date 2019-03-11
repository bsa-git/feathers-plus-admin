
const cli = require('./cli');
const adapterInfo = require('./adapter-info');
const seedService = require('./seed-service');
const graphqlQuery = require('./graphql-query');
const graphqlExpected = require('./graphql-expected');

module.exports = Object.assign({},
  {
    adapterInfo,
    seedService,
    graphqlQuery,
    graphqlExpected
  },
  cli
);
