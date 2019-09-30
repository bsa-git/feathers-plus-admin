
const assert = require('assert');
const {appRoot} = require('../../../../src/plugins/lib');
const accountsProfileData = require(`${appRoot}/src/services/users/hooks/accounts-profile-data`);

describe('<<< Test users/hooks/accounts-profile-data.unit.test.js >>>', () => {
  // eslint-disable-next-line no-unused-vars
  let contextBefore, contextAfterPaginated,
    // eslint-disable-next-line no-unused-vars
    contextAfter, contextAfterMultiple;

  beforeEach(() => {
    contextBefore = {
      type: 'before',
      params: { provider: 'socketio' },
      data: {

      }
    };

    contextAfter = {
      type: 'after',
      params: { provider: 'socketio' },
      result: {

      }
    };

    contextAfterMultiple = {
      type: 'after',
      params: { provider: 'socketio' },
      result: [

      ]
    };

    contextAfterPaginated = {
      type: 'after',
      method: 'find',
      params: { provider: 'socketio' },
      result: {
        data: [

        ]
      }
    };
    contextAfterPaginated.result.total = contextAfterPaginated.result.data.length;
  });

  it('Hook exists', () => {
    assert(typeof accountsProfileData === 'function', 'Hook is not a function.');
  });

  it('Test hook for correct google accounts profile data', () => {
    contextBefore.method = 'create';
    const contextGoogleData = {
      googleId: '110341449488589699610',
      google: {
        profile: {
          _raw: `{
            "emails": [{"type": "account", "value": "Daphnee.Schultz@hotmail.com"}],
            "name": {"givenName": "Yasmin", "familyName": "Walter"}
          }`
        },
        accessToken: 'ya29.GluhBo2a0n0w8Mu6Xd470_9V8dX0Jl9ApaWwQImpU9jOXSWsWwDj1vFERoMuCxJwGJsTbXPZpoR6WKfBpjW_2untfNnjez5obLNspSnjHLEOyoW2iRxZ50eJIajf',
        refreshToken: '02772375-654c-5073-bec7-2d4caf4c4d41'
      }
    };
    const resultGoogleData = {
      googleId: '110341449488589699610',
      email: 'Daphnee.Schultz@hotmail.com',
      firstName: 'Yasmin',
      lastName: 'Walter',
      googleAccessToken: 'ya29.GluhBo2a0n0w8Mu6Xd470_9V8dX0Jl9ApaWwQImpU9jOXSWsWwDj1vFERoMuCxJwGJsTbXPZpoR6WKfBpjW_2untfNnjez5obLNspSnjHLEOyoW2iRxZ50eJIajf',
      googleRefreshToken: '02772375-654c-5073-bec7-2d4caf4c4d41'
    };
    contextBefore.data = contextGoogleData;
    accountsProfileData()(contextBefore);
    assert.deepEqual(contextBefore.data, resultGoogleData);
  });

  it('Test hook for correct github accounts profile data', () => {
    contextBefore.method = 'create';
    const contextGithubData = {
      githubId: '10347814',
      github: {
        profile: {
          emails: [{value: 'Chasity3@yahoo.com'}],
          displayName: 'Maeve Legros',
        },
        accessToken: '7a10d709f8c93a2d8dc71923da6d3c4254874a33',
        refreshToken: 'e122d4cf-55fc-5d0f-9b48-b009230a426a'
      }
    };
    const resultGithubData = {
      githubId: '10347814',
      email: 'Chasity3@yahoo.com',
      firstName: 'Maeve',
      lastName: 'Legros',
      githubAccessToken: '7a10d709f8c93a2d8dc71923da6d3c4254874a33',
      githubRefreshToken: 'e122d4cf-55fc-5d0f-9b48-b009230a426a'
    };
    contextBefore.data = contextGithubData;
    accountsProfileData()(contextBefore);
    assert.deepEqual(contextBefore.data, resultGithubData);
  });
});
