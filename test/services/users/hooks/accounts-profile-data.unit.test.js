
const assert = require('assert');
const loPick = require('lodash/pick');
const {appRoot} = require('../../../../src/plugins/lib');
const accountsProfileData = require(`${appRoot}/src/services/users/hooks/accounts-profile-data`);
const debug = require('debug')('app:accounts-profile-data.unit.test');

const isTest = true;

describe('<<< Test users/hooks/accounts-profile-data.unit.test.js >>>', () => {

  if(!isTest) {
    debug('<<< Test users/hooks/accounts-profile-data.unit.test.js - NOT >>>');
    return;
  }

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

  it('Test hook for correct create google accounts profile data', () => {
    contextBefore.method = 'create';
    const contextGoogleData = {
      googleId: '110341449488589699610',
      google: {
        profile: {
          emails: [{value: 'Daphnee.Schultz@hotmail.com', type: 'account'}],
          name: {givenName: 'Yasmin', familyName: 'Walter'},
          _json: {image: {url: 'https://s3.amazonaws.com/uifaces/faces/twitter/jennyshen/128.jpg'}}
        },
        accessToken: 'ya29.GluhBo2a0n0w8Mu6Xd470_9V8dX0Jl9ApaWwQImpU9jOXSWsWwDj1vFERoMuCxJwGJsTbXPZpoR6WKfBpjW_2untfNnjez5obLNspSnjHLEOyoW2iRxZ50eJIajf',
        refreshToken: '02772375-654c-5073-bec7-2d4caf4c4d41'
      },
      roleId: '5d35a3684c00c1138ca4fac9',
      profileId: '5d35a3684c00c1138ca4fad1'
    };
    const resultGoogleData = {
      googleId: '110341449488589699610',
      email: 'Daphnee.Schultz@hotmail.com',
      firstName: 'Yasmin',
      lastName: 'Walter',
      avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/jennyshen/128.jpg',
      googleAccessToken: 'ya29.GluhBo2a0n0w8Mu6Xd470_9V8dX0Jl9ApaWwQImpU9jOXSWsWwDj1vFERoMuCxJwGJsTbXPZpoR6WKfBpjW_2untfNnjez5obLNspSnjHLEOyoW2iRxZ50eJIajf',
      googleRefreshToken: '02772375-654c-5073-bec7-2d4caf4c4d41',
      isVerified: true,
      roleId: '5d35a3684c00c1138ca4fac9',
      profileId: '5d35a3684c00c1138ca4fad1',
    };
    contextBefore.data = contextGoogleData;
    accountsProfileData()(contextBefore);
    const data = Object.assign({}, loPick(contextBefore.data, Object.keys(resultGoogleData)));
    assert.deepStrictEqual(data, resultGoogleData);
  });

  it('Test hook for correct create github accounts profile data', () => {
    contextBefore.method = 'create';
    const contextGithubData = {
      githubId: '10347814',
      github: {
        profile: {
          displayName: 'Maeve Legros',
          _json: {email: 'Chasity3@yahoo.com', avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/hermanobrother/128.jpg'}
        },
        accessToken: '7a10d709f8c93a2d8dc71923da6d3c4254874a33',
        refreshToken: 'e122d4cf-55fc-5d0f-9b48-b009230a426a'
      },
      roleId: '5d35a3684c00c1138ca4fac9',
      profileId: '5d35a3684c00c1138ca4fad1'
    };
    const resultGithubData = {
      githubId: '10347814',
      email: 'Chasity3@yahoo.com',
      firstName: 'Maeve',
      lastName: 'Legros',
      avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/hermanobrother/128.jpg',
      githubAccessToken: '7a10d709f8c93a2d8dc71923da6d3c4254874a33',
      githubRefreshToken: 'e122d4cf-55fc-5d0f-9b48-b009230a426a',
      isVerified: true,
      roleId: '5d35a3684c00c1138ca4fac9',
      profileId: '5d35a3684c00c1138ca4fad1',
    };
    contextBefore.data = contextGithubData;
    accountsProfileData()(contextBefore);
    const data = Object.assign({}, loPick(contextBefore.data, Object.keys(resultGithubData)));
    assert.deepStrictEqual(data, resultGithubData);
  });

  it('Test hook for correct patch google accounts profile data', () => {
    contextBefore.method = 'create';
    const contextGoogleData = {
      googleId: '110341449488589699610',
      google: {
        profile: {
          emails: [{value: 'Daphnee.Schultz@hotmail.com', type: 'account'}],
          name: {givenName: 'Yasmin', familyName: 'Walter'},
          _json: {image: {url: 'https://s3.amazonaws.com/uifaces/faces/twitter/jennyshen/128.jpg'}}
        },
        accessToken: 'ya29.GluhBo2a0n0w8Mu6Xd470_9V8dX0Jl9ApaWwQImpU9jOXSWsWwDj1vFERoMuCxJwGJsTbXPZpoR6WKfBpjW_2untfNnjez5obLNspSnjHLEOyoW2iRxZ50eJIajf',
        refreshToken: '02772375-654c-5073-bec7-2d4caf4c4d41'
      },
      roleId: '5d35a3684c00c1138ca4fac9',
      profileId: '5d35a3684c00c1138ca4fad1'
    };
    const resultGoogleData = {
      googleId: '110341449488589699610',
      email: 'Daphnee.Schultz@hotmail.com',
      firstName: 'Yasmin',
      lastName: 'Walter',
      avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/jennyshen/128.jpg',
      googleAccessToken: 'ya29.GluhBo2a0n0w8Mu6Xd470_9V8dX0Jl9ApaWwQImpU9jOXSWsWwDj1vFERoMuCxJwGJsTbXPZpoR6WKfBpjW_2untfNnjez5obLNspSnjHLEOyoW2iRxZ50eJIajf',
      googleRefreshToken: '02772375-654c-5073-bec7-2d4caf4c4d41',
    };
    contextBefore.data = contextGoogleData;
    accountsProfileData()(contextBefore);
    const data = Object.assign({}, loPick(contextBefore.data, Object.keys(resultGoogleData)));
    assert.deepStrictEqual(data, resultGoogleData);
  });

  it('Test hook for correct patch github accounts profile data', () => {
    contextBefore.method = 'create';
    const contextGithubData = {
      githubId: '10347814',
      github: {
        profile: {
          displayName: 'Maeve Legros',
          _json: {email: 'Chasity3@yahoo.com', avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/hermanobrother/128.jpg'}
        },
        accessToken: '7a10d709f8c93a2d8dc71923da6d3c4254874a33',
        refreshToken: 'e122d4cf-55fc-5d0f-9b48-b009230a426a'
      },
      roleId: '5d35a3684c00c1138ca4fac9',
      profileId: '5d35a3684c00c1138ca4fad1'
    };
    const resultGithubData = {
      githubId: '10347814',
      email: 'Chasity3@yahoo.com',
      firstName: 'Maeve',
      lastName: 'Legros',
      avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/hermanobrother/128.jpg',
      githubAccessToken: '7a10d709f8c93a2d8dc71923da6d3c4254874a33',
      githubRefreshToken: 'e122d4cf-55fc-5d0f-9b48-b009230a426a',
    };
    contextBefore.data = contextGithubData;
    accountsProfileData()(contextBefore);
    const data = Object.assign({}, loPick(contextBefore.data, Object.keys(resultGithubData)));
    assert.deepStrictEqual(data, resultGithubData);
  });
});
