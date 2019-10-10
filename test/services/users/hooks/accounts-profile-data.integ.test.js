
const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const loPick = require('lodash/pick');
const {readJsonFileSync, appRoot} = require('../../../../src/plugins/lib');
const accountsProfileData = require(`${appRoot}/src/services/users/hooks/accounts-profile-data`);
const debug = require('debug')('app:accounts-profile-data.integ.test');

const isTest = true;

// Get generated fake data
// eslint-disable-next-line no-unused-vars
const fakeData = readJsonFileSync(`${appRoot}/seeds/fake-data.json`) || {};
const fakeDataUser = (fakeData['users'] || [])[0] || {email: 'test@example.com'};

describe('<<< Test users/hooks/accounts-profile-data.integ.test.js >>>', () => {

  if(!isTest) {
    debug('<<< Test users/hooks/accounts-profile-data.integ.test.js - NOT >>>');
    return;
  }

  let app, params;
  // eslint-disable-next-line no-unused-vars
  let service;

  beforeEach(() => {
    app = feathers();

    app.use('/test-service', {
      async create(data) {
        return data;
      }
    });

    app.service('/test-service').hooks({
      before: {
        create: accountsProfileData()
      }
    });

    service = app.service('/test-service');
    params = {
      user: fakeDataUser
    };
  });


  it('Hook exists', () => {
    assert(typeof accountsProfileData === 'function', 'Hook is not a function.');
  });

  it('Test hook for correct create google accounts profile data from fakeDataUser', async () => {
    params.provider = undefined;
    const contextGoogleData = {
      googleId: fakeDataUser.googleId,
      google: {
        profile: {
          emails: [{value: fakeDataUser.email, type: 'account'}],
          name: {givenName: fakeDataUser.firstName, familyName: fakeDataUser.lastName},
          _json: {image: {url: fakeDataUser.avatar}}
        },
        accessToken: fakeDataUser.googleAccessToken,
        refreshToken: fakeDataUser.googleRefreshToken
      },
      roleId: fakeDataUser.roleId,
      profileId: fakeDataUser.profileId
    };
    const resultGoogleData = {
      googleId: fakeDataUser.googleId,
      email: fakeDataUser.email,
      firstName: fakeDataUser.firstName,
      lastName: fakeDataUser.lastName,
      avatar: fakeDataUser.avatar,
      googleAccessToken: fakeDataUser.googleAccessToken,
      googleRefreshToken: fakeDataUser.googleRefreshToken,
      isVerified: true,
      roleId: fakeDataUser.roleId,
      profileId: fakeDataUser.profileId
    };
    let result = await service.create(contextGoogleData, params);
    result = Object.assign({}, loPick(result, Object.keys(resultGoogleData)));
    assert.deepStrictEqual(result, resultGoogleData);
  });

  it('Test hook for correct create github accounts profile data from fakeDataUser', async () => {
    params.provider = undefined;
    const contextGithubData = {
      githubId: fakeDataUser.githubId,
      github: {
        profile: {
          displayName: `${fakeDataUser.firstName} ${fakeDataUser.lastName}`,
          _json: {email: fakeDataUser.email, avatar_url: fakeDataUser.avatar}
        },
        accessToken: fakeDataUser.githubAccessToken,
        refreshToken: fakeDataUser.githubRefreshToken
      },
      roleId: fakeDataUser.roleId,
      profileId: fakeDataUser.profileId
    };
    const resultGithubData = {
      githubId: fakeDataUser.githubId,
      email: fakeDataUser.email,
      firstName: fakeDataUser.firstName,
      lastName: fakeDataUser.lastName,
      avatar: fakeDataUser.avatar,
      githubAccessToken: fakeDataUser.githubAccessToken,
      githubRefreshToken: fakeDataUser.githubRefreshToken,
      isVerified: true,
      roleId: fakeDataUser.roleId,
      profileId: fakeDataUser.profileId
    };
    let result = await service.create(contextGithubData, params);
    result = Object.assign({}, loPick(result, Object.keys(resultGithubData)));
    assert.deepStrictEqual(result, resultGithubData);
  });

  it('Test hook for correct patch google accounts profile data from fakeDataUser', async () => {
    params.provider = undefined;
    const contextGoogleData = {
      googleId: fakeDataUser.googleId,
      google: {
        profile: {
          emails: [{value: fakeDataUser.email, type: 'account'}],
          name: {givenName: fakeDataUser.firstName, familyName: fakeDataUser.lastName},
          _json: {image: {url: fakeDataUser.avatar}}
        },
        accessToken: fakeDataUser.googleAccessToken,
        refreshToken: fakeDataUser.googleRefreshToken
      },
      roleId: fakeDataUser.roleId,
      profileId: fakeDataUser.profileId
    };
    const resultGoogleData = {
      googleId: fakeDataUser.googleId,
      email: fakeDataUser.email,
      firstName: fakeDataUser.firstName,
      lastName: fakeDataUser.lastName,
      avatar: fakeDataUser.avatar,
      googleAccessToken: fakeDataUser.googleAccessToken,
      googleRefreshToken: fakeDataUser.googleRefreshToken,
    };
    let result = await service.create(contextGoogleData, params);
    result = Object.assign({}, loPick(result, Object.keys(resultGoogleData)));
    assert.deepStrictEqual(result, resultGoogleData);
  });

  it('Test hook for correct patch github accounts profile data from fakeDataUser', async () => {
    params.provider = undefined;
    const contextGithubData = {
      githubId: fakeDataUser.githubId,
      github: {
        profile: {
          displayName: `${fakeDataUser.firstName} ${fakeDataUser.lastName}`,
          _json: {email: fakeDataUser.email, avatar_url: fakeDataUser.avatar}
        },
        accessToken: fakeDataUser.githubAccessToken,
        refreshToken: fakeDataUser.githubRefreshToken
      },
      roleId: fakeDataUser.roleId,
      profileId: fakeDataUser.profileId
    };
    const resultGithubData = {
      githubId: fakeDataUser.githubId,
      email: fakeDataUser.email,
      firstName: fakeDataUser.firstName,
      lastName: fakeDataUser.lastName,
      avatar: fakeDataUser.avatar,
      githubAccessToken: fakeDataUser.githubAccessToken,
      githubRefreshToken: fakeDataUser.githubRefreshToken,
    };
    let result = await service.create(contextGithubData, params);
    result = Object.assign({}, loPick(result, Object.keys(resultGithubData)));
    assert.deepStrictEqual(result, resultGithubData);
  });
});
