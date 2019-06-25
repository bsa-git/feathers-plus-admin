const assert = require('assert');
const {readJsonFileSync, inspector, appRoot} = require('../../src/plugins/lib');
const app = require(`${appRoot}/src/app`);
const {seedService, graphqlQuery, graphqlExpected} = require(`${appRoot}/src/plugins/test-helpers`);
const debug = require('debug')('app:graphql.test');

// Get generated fake data
const fakes = readJsonFileSync(`${appRoot}/seeds/fake-data.json`) || {};

const isLog = false;
const isSeed = true;
let graphql;

const port = app.get('port') || 3030;

describe('<<< Test \'graphql\' service >>>', () => {
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

  describe('--- Save fake data to services ---', function () {
    if (isSeed) {
      it('registered the \'roles\' service', () => {
        const service = app.service('roles');
        assert.ok(service, 'Registered the service');
      });

      it('Save fake data to \'roles\' service', async () => {
        // Seed service data
        const results = await seedService(app, 'roles');
        if (Array.isArray(results)) {
          results.forEach((result, index) => {
            let fake = fakes['roles'][index];
            delete result.createdAt;
            delete result.updatedAt;
            delete result['__v'];
            assert.deepEqual(result, fake);
          });
        } else {
          debug('seedService.results:', results);
          assert.ok(false);
        }
      });

      it('registered the \'users\' service', () => {
        const service = app.service('users');
        assert.ok(service, 'Registered the service');
      });

      it('Save fake data to \'users\' service', async () => {
        // Seed service data
        const results = await seedService(app, 'users');
        if (Array.isArray(results)) {
          results.forEach((result, index) => {
            let fake = fakes['users'][index];
            delete fake.password;
            delete result.password;
            delete result.createdAt;
            delete result.updatedAt;
            delete result['__v'];
            assert.deepEqual(result, fake);
          });
        } else {
          debug('seedService.results:', results);
          assert.ok(false);
        }
      });

      it('registered the \'teams\' service', () => {
        const service = app.service('teams');
        assert.ok(service, 'Registered the service');
      });

      it('Save fake data to \'teams\' service', async () => {
        // Seed service data
        const results = await seedService(app, 'teams');
        if (Array.isArray(results)) {
          results.forEach((result, index) => {
            let fake = fakes['teams'][index];
            delete result.createdAt;
            delete result.updatedAt;
            delete result['__v'];
            assert.deepEqual(result, fake);
          });
        } else {
          debug('seedService.results:', results);
          assert.ok(false);
        }
      });

      it('registered the \'userTeams\' service', () => {
        const service = app.service('user-teams');
        assert.ok(service, 'Registered the service');
      });

      it('Save fake data to \'userTeams\' service', async () => {
        // Seed service data
        const results = await seedService(app, 'userTeams');
        if (Array.isArray(results)) {
          results.forEach((result, index) => {
            let fake = fakes['userTeams'][index];
            delete result.createdAt;
            delete result.updatedAt;
            delete result['__v'];
            assert.deepEqual(result, fake);
          });
        } else {
          debug('seedService.results:', results);
          assert.ok(false);
        }
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
      if (isLog) inspector('Expected for \'getUser\' query:', graphqlExpected['getUser']);
      assert.deepEqual(response, graphqlExpected['getUser']);
    });

    it('Run \'findUser\' request for GraphQl', async () => {
      const response = await graphql.find({query: {query: graphqlQuery['findUser']}});
      if (isLog) inspector('Response for \'findUser\' query:', response);
      if (isLog) inspector('Expected for \'findUser\' query:', graphqlExpected['findUser']);
      assert.deepEqual(response.data, graphqlExpected['findUser']);
    });

    it('Run \'getRole\' request for GraphQl', async () => {
      const response = await graphql.find({query: {query: graphqlQuery['getRole']}});
      if (isLog) inspector('Response for \'getRole\' query:', response);
      if (isLog) inspector('Expected for \'getRole\' query:', graphqlExpected['getRole']);
      assert.deepEqual(response, graphqlExpected['getRole']);
      // assert.ok(true);
    });

    it('Run \'findRole\' request for GraphQl', async () => {
      const response = await graphql.find({query: {query: graphqlQuery['findRole']}});
      if (isLog) inspector('Response for \'findRole\' query:', response);
      if (isLog) inspector('Expected for \'findRole\' query:', graphqlExpected['findRole']);
      assert.deepEqual(response.data, graphqlExpected['findRole']);
      // assert.ok(true);
    });

    it('Run \'getTeam\' request for GraphQl', async () => {
      const response = await graphql.find({query: {query: graphqlQuery['getTeam']}});
      if (isLog) inspector('Response for \'getTeam\' query:', response);
      if (isLog) inspector('Expected for \'getTeam\' query:', graphqlExpected['getTeam']);
      assert.deepEqual(response, graphqlExpected['getTeam']);
      // assert.ok(true);
    });

    it('Run \'findTeam\' request for GraphQl', async () => {
      const response = await graphql.find({query: {query: graphqlQuery['findTeam']}});
      if (isLog) inspector('Response for \'findTeam\' query:', response);
      if (isLog) inspector('Expected for \'findTeam\' query:', graphqlExpected['findTeam']);
      assert.deepEqual(response.data, graphqlExpected['findTeam']);
      // assert.ok(true);
    });
  });
});
