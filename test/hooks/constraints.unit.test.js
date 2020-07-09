const assert = require('assert');
const {AuthServer, readJsonFileSync, seedService, inspector, appRoot} = require('../../src/plugins/index');
const constraints = require(`${appRoot}/src/hooks/constraints`);
const app = require(`${appRoot}/src/app`);
const debug = require('debug')('app:constraints.unit.test');

const isDebug = false;
const isLog = false;
const isTest = true;
const isSeed = true;

// Get generated fake data
const fakes = readJsonFileSync(`${appRoot}/seeds/fake-data.json`) || {};
const roleGuest = fakes['roles'].find(role => role.alias === 'isGuest');


describe('<<< Test /hooks/constraints.unit.test.js >>>', () => {

  if (!isTest) {
    debug('<< Test /hooks/constraints.unit.test.js - NOT >>');
    return;
  }

  // eslint-disable-next-line no-unused-vars
  let contextBefore, contextAfterPaginated,
    // eslint-disable-next-line no-unused-vars
    contextAfter, contextAfterMultiple;

  beforeEach(() => {
    contextBefore = {
      app,
      type: 'before',
      params: {provider: 'socketio'},
      data: {}
    };

    contextAfter = {
      app,
      type: 'after',
      params: {provider: 'socketio'},
      result: {}
    };

    contextAfterMultiple = {
      app,
      type: 'after',
      params: {provider: 'socketio'},
      result: []
    };

    contextAfterPaginated = {
      app,
      type: 'after',
      method: 'find',
      params: {provider: 'socketio'},
      result: {
        data: []
      }
    };
    contextAfterPaginated.result.total = contextAfterPaginated.result.data.length;
  });

  describe('--- Save fake data to services ---', function () {
    if (isSeed) {
      it('registered the \'users\' service', () => {
        const service = app.service('users');
        assert.ok(service, 'Registered the service');
      });

      it('Save fake data to \'users\' service', async () => {
        // Seed service data
        const results = await seedService(app, 'users');
        if (Array.isArray(results)) {
          assert.ok(results.length === fakes['users'].length);
        } else {
          if(isLog) debug('seedService.results:', results);
          assert.ok(false);
        }
      });

      it('registered the \'roles\' service', () => {
        const service = app.service('roles');
        assert.ok(service, 'Registered the service');
      });

      it('Save fake data to \'roles\' service', async () => {
        // Seed service data
        const results = await seedService(app, 'roles');
        if (Array.isArray(results)) {
          assert.ok(results.length === fakes['roles'].length);
        } else {
          if(isLog) debug('seedService.results:', results);
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
          assert.ok(results.length === fakes['teams'].length);
        } else {
          if(isLog) debug('seedService.results:', results);
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
          assert.ok(results.length === fakes['userTeams'].length);
        } else {
          if(isLog) debug('seedService.results:', results);
          assert.ok(false);
        }
      });

      it('registered the \'userProfiles\' service', () => {
        const service = app.service('user-profiles');
        assert.ok(service, 'Registered the service');
      });

      it('Save fake data to \'userProfiles\' service', async () => {
        // Seed service data
        const results = await seedService(app, 'userProfiles');
        if (Array.isArray(results)) {
          assert.ok(results.length === fakes['userProfiles'].length);
        } else {
          if(isLog) debug('seedService.results:', results);
          assert.ok(false);
        }
      });

      it('registered the \'logMessages\' service', () => {
        const service = app.service('log-messages');
        assert.ok(service, 'Registered the service');
      });

      it('Save fake data to \'logMessages\' service', async () => {
        // Seed service data
        const results = await seedService(app, 'logMessages');
        if (Array.isArray(results)) {
          assert.ok(results.length === fakes['logMessages'].length);
        } else {
          if(isLog) debug('seedService.results:', results);
          assert.ok(false);
        }
      });
    }
  });

  describe('--- Run constraints.unit.test ---', function () {
    it('Constraints hook exists', () => {
      assert(typeof constraints === 'function', 'Hook is not a function.');
    });

    it('Relationship error while deleting record from \'user-profiles\' service', async () => {
      try {

        const rec = fakes['users'][0];
        const idFieldUser = 'id' in rec ? 'id' : '_id';
        const profileId = rec.profileId;
        const service = app.service('user-profiles');

        contextBefore.path = 'user-profiles';
        contextBefore.method = 'remove';
        contextBefore.service = service;
        contextBefore.id = {
          [idFieldUser]: profileId
        };
        await constraints(true)(contextBefore);
        assert.ok(false, 'Protection did not work to write the data to service');
      } catch (ex) {
        if (isDebug) debug('Relationship error while deleting record from \'user-profiles\' service:', ex);
        // debug('Relationship error while deleting record from \'user-profiles\' service:', ex);
        // assert.ok(true);
        assert.strictEqual(ex.code, 400, 'unexpected error.code');
        assert.strictEqual(ex.message, 'Error deleting item from \'user-profiles\' service. You can not delete an item if it is referenced by other services.');
        assert.strictEqual(ex.name, 'BadRequest', 'unexpected error.name');
      }
    });

    it('Error creating unique values for \'userTeams\' service', async () => {
      try {
        // Seed service data
        const results1 = await seedService(app, 'roles');
        const results2 = await seedService(app, 'teams');
        const results3 = await seedService(app, 'users');
        const results4 = await seedService(app, 'userTeams');
        const results5 = await seedService(app, 'userProfiles');
        if (Array.isArray(results1) &&
          Array.isArray(results2) &&
          Array.isArray(results3) &&
          Array.isArray(results4) &&
          Array.isArray(results5)) {
          const rec = fakes['userTeams'][0];
          const service = app.service('user-teams');

          contextBefore.path = 'user-teams';
          contextBefore.method = 'create';
          contextBefore.service = service;
          contextBefore.data = {
            teamId: rec['teamId'],
            userId: rec['userId']
          };
          await constraints(true)(contextBefore);
          assert.ok(false, 'Protection did not work to write the unique data to service');
        } else {
          debug('seedService.results:', results);
          assert.ok(false, 'Error writing fake data to service');
        }
      } catch (ex) {
        if (isDebug) debug('Error unique values for \'userTeams\' service:', ex);
        assert.strictEqual(ex.code, 400, 'unexpected error.code');
        assert.strictEqual(ex.message, 'Values must be unique', 'unexpected error.message');
        assert.strictEqual(ex.name, 'BadRequest', 'unexpected error.name');
      }
    });

    it('Relationship error while creating record for \'userTeams\' service', async () => {
      try {

        const rec = fakes['teams'][0];
        const idFieldTeam = 'id' in rec ? 'id' : '_id';
        const teamId = rec[idFieldTeam];
        const userId = '000000000000000000000000';
        const service = app.service('user-teams');

        contextBefore.path = 'user-teams';
        contextBefore.method = 'create';
        contextBefore.service = service;
        contextBefore.data = {
          teamId: teamId,
          userId: userId
        };
        await constraints(true)(contextBefore);
        assert.ok(false, 'Protection did not work to write the data to service');
      } catch (ex) {
        if (isDebug) debug('Relationship error while creating record for \'userTeams\' service:', ex);
        const userId = '000000000000000000000000';
        assert.strictEqual(ex.code, 404, 'unexpected error.code');
        assert.strictEqual(ex.message, `No record found for id '${userId}'`);
        assert.strictEqual(ex.name, 'NotFound', 'unexpected error.name');
      }
    });

    it('Relationship error while creating record for \'userTeams\' service', async () => {
      try {

        const rec = fakes['users'][0];
        const idFieldUser = 'id' in rec ? 'id' : '_id';
        const userId = rec[idFieldUser];
        const teamId = '000000000000000000000000';
        const service = app.service('user-teams');

        contextBefore.path = 'user-teams';
        contextBefore.method = 'create';
        contextBefore.service = service;
        contextBefore.data = {
          teamId: teamId,
          userId: userId
        };
        await constraints(true)(contextBefore);
        assert.ok(false, 'Protection did not work to write the data to service');
      } catch (ex) {
        if (isDebug) debug('Relationship error while creating record for \'userTeams\' service:', ex);
        const teamId = '000000000000000000000000';
        assert.strictEqual(ex.code, 404, 'unexpected error.code');
        assert.strictEqual(ex.message, `No record found for id '${teamId}'`);
        assert.strictEqual(ex.name, 'NotFound', 'unexpected error.name');
      }
    });

    it('Relationship error while patching record for \'users\' service', async () => {
      try {

        const rec = fakes['users'][0];
        const idFieldUser = 'id' in rec ? 'id' : '_id';
        const userId = rec[idFieldUser];
        const roleId = '000000000000000000000000';
        const service = app.service('users');

        contextBefore.path = 'users';
        contextBefore.method = 'patch';
        contextBefore.service = service;
        contextBefore.data = {
          [idFieldUser]: userId,
          roleId: roleId
        };
        await constraints(true)(contextBefore);
        assert.ok(false, 'Protection did not work to write the data to service');
      } catch (ex) {
        if (isDebug) debug('Relationship error while patching record for \'users\' service:', ex);
        const roleId = '000000000000000000000000';
        assert.strictEqual(ex.code, 404, 'unexpected error.code');
        assert.strictEqual(ex.message, `No record found for id '${roleId}'`);
        assert.strictEqual(ex.name, 'NotFound', 'unexpected error.name');
      }
    });

    it('Error when removing a base record from \'roles\' service', async () => {

      const recAdmin = fakes['roles'].find(function (role) {
        return (role.name === AuthServer.getRoles('isAdministrator'));
      });

      const recGuest = fakes['roles'].find(function (role) {
        return (role.name !== AuthServer.getRoles('isGuest'));
      });

      const idFieldRole = 'id' in recAdmin ? 'id' : '_id';
      const roleAdminId = recAdmin[idFieldRole];
      const roleGuestId = recGuest[idFieldRole];

      try {
        contextBefore.path = 'roles';
        contextBefore.method = 'remove';
        contextBefore.service = app.service('roles');
        contextBefore.id = {
          [idFieldRole]: roleAdminId
        };
        await constraints(true)(contextBefore);
        assert.ok(false, 'Protection did not work to remove the data from service');
      } catch (ex) {
        if (isDebug) debug('Error when removing a Admin base record from \'roles\' service', ex);
        assert.strictEqual(ex.code, 400, 'unexpected error.code');
        assert.strictEqual(ex.message, 'Error deleting item from \'roles\' service. You can not delete an item if it is base role.');
        assert.strictEqual(ex.name, 'BadRequest', 'unexpected error.name');
      }

      try {
        contextBefore.path = 'roles';
        contextBefore.method = 'remove';
        contextBefore.service = app.service('roles');
        contextBefore.id = {
          [idFieldRole]: roleGuestId
        };
        await constraints(true)(contextBefore);
        assert.ok(false, 'Protection did not work to remove the data from service');
      } catch (ex) {
        if (isDebug) debug('Error when removing a Guest base record from \'roles\' service', ex);
        assert.strictEqual(ex.code, 400, 'unexpected error.code');
        assert.strictEqual(ex.message, 'Error deleting item from \'roles\' service. You can not delete an item if it is base role.');
        assert.strictEqual(ex.name, 'BadRequest', 'unexpected error.name');
      }
    });

    it('Set contextBefore.alias while creating record for \'roles\' service', async () => {
      const service = app.service('roles');
      contextBefore.path = 'roles';
      contextBefore.method = 'create';
      contextBefore.service = service;
      contextBefore.data = {
        name: 'My super role',
        description: 'Description for my super role',
      };
      await constraints(true)(contextBefore);
      if (isDebug) debug('Set contextBefore.alias while creating record for \'roles\' service.contextBefore:', contextBefore.data);
      assert.ok(contextBefore.data.alias, 'Protection did not work to write the data to service');
    });

    it('Set contextBefore.alias while creating record for \'teams\' service', async () => {
      const service = app.service('roles');
      contextBefore.path = 'teams';
      contextBefore.method = 'create';
      contextBefore.service = service;
      contextBefore.data = {
        name: 'My super team',
        description: 'Description for my super team',
      };
      await constraints(true)(contextBefore);
      if (isDebug) debug('Set contextBefore.alias while creating record for \'teams\' service.contextBefore:', contextBefore.data);
      assert.ok(contextBefore.data.alias, 'Protection did not work to write the data to service');
    });

    it('Set contextBefore.roleId while creating record for \'users\' service', async () => {
      const service = app.service('users');
      contextBefore.path = 'users';
      contextBefore.method = 'create';
      contextBefore.service = service;
      contextBefore.data = {
        email: 'my_email@test.com',
        password: 'my_email',
        firstName: 'myFirstName',
        lastName: 'myLastName'
      };
      await constraints(true)(contextBefore);
      if (isDebug) debug('Set contextBefore.roleId while creating record for \'users\' service.contextBefore:', contextBefore.data);
      assert.ok(contextBefore.data.roleId, 'Protection did not work to write the data to service');
    });

    it('Set contextBefore.profileId while creating record for \'users\' service', async () => {
      const service = app.service('users');
      contextBefore.path = 'users';
      contextBefore.method = 'create';
      contextBefore.service = service;
      contextBefore.data = {
        email: 'my_email@test.com',
        password: 'my_email',
        firstName: 'myFirstName',
        lastName: 'myLastName'
      };
      await constraints(true)(contextBefore);
      if (isDebug) debug('Set contextBefore.profileId while creating record for \'users\' service.contextBefore:', contextBefore.data);
      assert.ok(contextBefore.data.profileId, 'Protection did not work to write the data to service');
    });

    it('Set contextAfter.roleAlias while creating record for \'users\' service', async () => {
      const idField = 'id' in roleGuest ? 'id' : '_id';
      const service = app.service('users');
      contextAfter.path = 'users';
      contextAfter.method = 'create';
      contextAfter.service = service;
      contextAfter.result = {
        email: 'my_email@test.com',
        password: 'my_email',
        firstName: 'myFirstName',
        lastName: 'myLastName',
        roleId: roleGuest[idField]
      };
      await constraints(true)(contextAfter);
      if (isDebug) debug('Set contextAfter.roleAlias while creating record for \'users\' service.contextAfter:', contextAfter.result);
      assert.ok(contextAfter.result.roleAlias, 'Protection did not work to write the data to service');
    });



    it('Data integrity for \'user-teams\',\'user-profiles\' services, when removing a record from \'users\' service', async () => {
      const rec = fakes['users'][0];
      const idFieldUser = 'id' in rec ? 'id' : '_id';
      const userId = rec[idFieldUser];
      const userTeams = app.service('user-teams');
      const findUserTeamsBefore = await userTeams.find({query: {userId: userId}});
      if (isLog) inspector('Data integrity for \'user-teams\' service, when removing a record from \'users\' service.findUserTeamsBefore:', findUserTeamsBefore.data);
      const profileId = rec.profileId;
      const userProfiles = app.service('user-profiles');
      const findUserProfilesBefore = await userProfiles.find({query: {[idFieldUser]: profileId}});
      if (isLog) inspector('Data integrity for \'user-profiles\' service, when removing a record from \'users\' service.findUserProfilesBefore:', findUserProfilesBefore.data);

      contextAfter.path = 'users';
      contextAfter.method = 'remove';
      contextAfter.service = app.service('users');
      contextAfter.result = {
        [idFieldUser]: userId,
        profileId: profileId,
        roleAlias: roleGuest.alias
      };
      await constraints(true)(contextAfter);
      const findUserTeamsAfter = await userTeams.find({query: {userId: userId}});
      if (isLog) inspector('Data integrity for \'user-teams\' service, when removing a record from \'users\' service.findUserTeamsAfter:', findUserTeamsAfter.data);
      const findUserProfilesAfter = await userProfiles.find({query: {[idFieldUser]: profileId}});
      if (isLog) inspector('Data integrity for \'user-profiles\' service, when removing a record from \'users\' service.findUserProfilesAfter:', findUserProfilesAfter.data);
      assert.ok((findUserTeamsBefore.data.length > findUserTeamsAfter.data.length) &&
        (findUserProfilesBefore.data.length > findUserProfilesAfter.data.length), 'Protection did not work to removing the data from service');
    });

    it('Data integrity when removing a record from \'teams\' service', async () => {
      let teamId = null;
      let findResultsBefore = null;
      const rec = fakes['teams'][0];
      const idFieldTeam = 'id' in rec ? 'id' : '_id';
      const userTeams = app.service('user-teams');

      const _teamHandle = async team => {
        const _teamId = team[idFieldTeam];
        const _findResultsBefore = await userTeams.find({query: {teamId: _teamId}});
        if (!teamId && _findResultsBefore.data.length) {
          teamId = _teamId;
          findResultsBefore = _findResultsBefore;
          if (isLog && _findResultsBefore.data.length) inspector('Data integrity when removing a record from \'teams\' service.findResultsBefore:', _findResultsBefore.data);

          contextAfter.path = 'teams';
          contextAfter.method = 'remove';
          contextAfter.service = app.service('teams');
          contextAfter.result = {
            [idFieldTeam]: teamId
          };

          await constraints(true)(contextAfter);
          const findResultsAfter = await userTeams.find({query: {teamId: teamId}});
          if (isLog) inspector('Data integrity when removing a record from \'teams\' service.findResultsAfter:', findResultsAfter.data);
          assert.ok(findResultsBefore.data.length > findResultsAfter.data.length, 'Protection did not work to removing the data from service');
        }
      };

      // Find a team that is present in userTeams service
      for (let i = 0; i < fakes['teams'].length; i++) {
        const team = fakes['teams'][i];
        await _teamHandle(team);
      }
    });

    it('Data integrity when removing a record from \'roles\' service', async () => {

      const rec = fakes['roles'].find(function (role) {
        return (role.name !== AuthServer.getRoles('isAdministrator')) && (role.name !== AuthServer.getRoles('isGuest'));
      });

      // const rec = fakes['roles'][0];
      const idFieldRole = 'id' in rec ? 'id' : '_id';
      const roleId = rec[idFieldRole];
      const users = app.service('users');
      let findResultsBefore = await users.find({query: {roleId: roleId}});
      findResultsBefore = findResultsBefore.data;
      if (isLog) inspector('Data integrity when removing a record from \'roles\' service.findResultsBefore:', findResultsBefore);

      contextAfter.path = 'roles';
      contextAfter.method = 'remove';
      contextAfter.service = app.service('roles');
      contextAfter.result = {
        [idFieldRole]: roleId
      };
      await constraints(true)(contextAfter);
      let findResultsAfter = await users.find({query: {roleId: roleId}});
      findResultsAfter = findResultsAfter.data;
      if (isLog) inspector('Data integrity when removing a record from \'roles\' service.findResultsAfter:', findResultsAfter);
      assert.ok(findResultsBefore.length > findResultsAfter.length, 'Protection did not work to removing the data from service');
    });
  });
});
