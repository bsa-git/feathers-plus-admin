const assert = require('assert');
const {inspector, appRoot} = require('../../src/plugins/lib');
const {serviceHelper, graphqlQuery, graphqlExpected} = require('../../src/plugins/test-helpers');
const app = require(`${appRoot}/src/app`);
const debug = require('debug')('app:graphql.test');

const isLog = false;

const isTest = true;
const isSeed = true;

let graphql;
const port = app.get('port') || 3030;

describe('<<< Test services/graphql.test.js >>>', () => {

  let server;

  before(function (done) {
    server = app.listen(port);
    server.once('listening', () => {
      setTimeout(() => done(), 500);
    });
  });

  after(function (done) {
    server.close();
    setTimeout(() => done(), 500);
  });

  if(!isTest) {
    debug('<<< Test Test services/graphql.test.js - NOT >>>');
    return;
  }

  describe('--- Save fake data to services ---', function () {
    if (isSeed) {
      it('registered the all services', () => {
        const errPath = serviceHelper.checkServicesRegistered(app);
        assert.ok(errPath === '', `Service '${errPath}' not registered`);
      });

      it('Save fakes to services', async () => {
        const errPath = await serviceHelper.saveFakesToServices(app);
        assert.ok(errPath === '', `Not save fakes to services - '${errPath}'`);
      });
    }
  });

  describe('--- Run requests for GraphQl ---', function () {

    it('Registered the \'graphql\' service', () => {
      graphql = app.service('/graphql');
      assert.ok(graphql, 'Registered the service');
    });

    it('Run \'getUser\' request for GraphQl', async () => {
      const response = await graphql.find({query: {query: graphqlQuery['getUser']}});
      if (isLog) inspector('Response for \'getUser\' query:', response);
      // inspector('Response for \'getUser\' query:', response);
      if (isLog) inspector('Expected for \'getUser\' query:', graphqlExpected['getUser']);
      // inspector('Expected for \'getUser\' query:', graphqlExpected['getUser']);
      assert.deepStrictEqual(response, graphqlExpected['getUser']);
    });

    it('Run \'findUser\' request for GraphQl', async () => {
      const response = await graphql.find({query: {query: graphqlQuery['findUser']}});
      if (isLog) inspector('Response for \'findUser\' query:', response.data);
      if (isLog) inspector('Expected for \'findUser\' query:', graphqlExpected['findUser']);
      assert.deepStrictEqual(response.data, graphqlExpected['findUser']);
    });

    it('Run \'getRole\' request for GraphQl', async () => {
      const response = await graphql.find({query: {query: graphqlQuery['getRole']}});
      if (isLog) inspector('Response for \'getRole\' query:', response);
      if (isLog) inspector('Expected for \'getRole\' query:', graphqlExpected['getRole']);
      assert.deepStrictEqual(response, graphqlExpected['getRole']);
    });

    it('Run \'findRole\' request for GraphQl', async () => {
      const response = await graphql.find({query: {query: graphqlQuery['findRole']}});
      if (isLog) inspector('Response for \'findRole\' query:', response);
      if (isLog) inspector('Expected for \'findRole\' query:', graphqlExpected['findRole']);
      assert.deepStrictEqual(response.data, graphqlExpected['findRole']);
    });

    it('Run \'getTeam\' request for GraphQl', async () => {
      const response = await graphql.find({query: {query: graphqlQuery['getTeam']}});
      if (isLog) inspector('Response for \'getTeam\' query:', response);
      if (isLog) inspector('Expected for \'getTeam\' query:', graphqlExpected['getTeam']);
      assert.deepStrictEqual(response, graphqlExpected['getTeam']);
    });

    it('Run \'findTeam\' request for GraphQl', async () => {
      const response = await graphql.find({query: {query: graphqlQuery['findTeam']}});
      if (isLog) inspector('Response for \'findTeam\' query:', response);
      if (isLog) inspector('Expected for \'findTeam\' query:', graphqlExpected['findTeam']);
      assert.deepStrictEqual(response.data, graphqlExpected['findTeam']);
    });

    it('Run \'getLogMessage\' request for GraphQl', async () => {
      const response = await graphql.find({query: {query: graphqlQuery['getLogMessage']}});
      if (isLog) inspector('Response for \'getLogMessage\' query:', response);
      if (isLog) inspector('Expected for \'getLogMessage\' query:', graphqlExpected['getLogMessage']);
      assert.deepStrictEqual(response, graphqlExpected['getLogMessage']);
    });

    it('Run \'findLogMessage\' request for GraphQl', async () => {
      const response = await graphql.find({query: {query: graphqlQuery['findLogMessage']}});
      if (isLog) inspector('Response for \'findLogMessage\' query:', response);
      if (isLog) inspector('Expected for \'findLogMessage\' query:', graphqlExpected['findLogMessage']);
      assert.deepStrictEqual(response.data, graphqlExpected['findLogMessage']);
    });

    it('Run \'getChatMessage\' request for GraphQl', async () => {
      const response = await graphql.find({query: {query: graphqlQuery['getChatMessage']}});
      if (isLog) inspector('Response for \'getChatMessage\' query:', response);
      if (isLog) inspector('Expected for \'getChatMessage\' query:', graphqlExpected['getChatMessage']);
      assert.deepStrictEqual(response, graphqlExpected['getChatMessage']);
    });

    it('Run \'findChatMessage\' request for GraphQl', async () => {
      const response = await graphql.find({query: {query: graphqlQuery['findChatMessage']}});
      if (isLog) inspector('Response for \'findChatMessage\' query:', response);
      if (isLog) inspector('Expected for \'findChatMessage\' query:', graphqlExpected['findChatMessage']);
      assert.deepStrictEqual(response.data, graphqlExpected['findChatMessage']);
    });
  });
});
