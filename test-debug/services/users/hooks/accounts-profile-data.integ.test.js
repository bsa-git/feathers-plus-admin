
const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const {readJsonFileSync, appRoot} = require('../../../../src/plugins/lib');
const accountsProfileData = require(`${appRoot}/src/services/users/hooks/accounts-profile-data`);

// Get generated fake data
// eslint-disable-next-line no-unused-vars
const fakeData = readJsonFileSync(`${appRoot}/seeds/fake-data.json`) || {};
const fakeDataUser = (fakeData['users'] || [])[0] || {email: 'test@example.com'};

describe('<<< Test users/hooks/accounts-profile-data.integ.test.js >>>', () => {
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

  it('Test hook for correct google accounts profile data from fakeDataUser', async () => {
    params.provider = undefined;
    const contextGoogleData = {
      googleId: fakeDataUser.googleId,
      google: {
        profile: {
          _raw: `{
            "emails": [{"type": "account", "value": "${fakeDataUser.email}"}],
            "name": {"givenName": "${fakeDataUser.firstName}", "familyName": "${fakeDataUser.lastName}"}
          }`
        },
        accessToken: fakeDataUser.googleAccessToken,
        refreshToken: fakeDataUser.googleRefreshToken
      }
    };
    const resultGoogleData = {
      googleId: fakeDataUser.googleId,
      email: fakeDataUser.email,
      firstName: fakeDataUser.firstName,
      lastName: fakeDataUser.lastName,
      googleAccessToken: fakeDataUser.googleAccessToken,
      googleRefreshToken: fakeDataUser.googleRefreshToken
    };
    const result = await service.create(contextGoogleData, params);
    assert.deepEqual(resultGoogleData, result);
  });

  it('Test hook for correct github accounts profile data from fakeDataUser', async () => {
    params.provider = undefined;
    const contextGithubData = {
      githubId: fakeDataUser.githubId,
      github: {
        profile: {
          emails: [{value: fakeDataUser.email}],
          displayName: `${fakeDataUser.firstName} ${fakeDataUser.lastName}`,
        },
        accessToken: fakeDataUser.githubAccessToken,
        refreshToken: fakeDataUser.githubRefreshToken
      }
    };
    const resultGithubData = {
      githubId: fakeDataUser.githubId,
      email: fakeDataUser.email,
      firstName: fakeDataUser.firstName,
      lastName: fakeDataUser.lastName,
      githubAccessToken: fakeDataUser.githubAccessToken,
      githubRefreshToken: fakeDataUser.githubRefreshToken
    };
    const result = await service.create(contextGithubData, params);
    assert.deepEqual(resultGithubData, result);
  });
});
