
const {readJsonFileSync, appRoot} = require('../lib');

// Get generated fake data
let fakeData = readJsonFileSync(`${appRoot}/seeds/fake-data.json`) || {};

const idFieldUser = 'id' in fakeData['users'][0] ? 'id' : '_id';
const idFieldRole = 'id' in fakeData['roles'][0] ? 'id' : '_id';
const idFieldTeam = 'id' in fakeData['teams'][0] ? 'id' : '_id';

const userId = fakeData['users'][0][idFieldUser];
const roleId = fakeData['roles'][0][idFieldRole];
const teamId = fakeData['teams'][0][idFieldTeam];

const getUser = `{
  getUser(key: "${userId}") {
    ${idFieldUser}
    email
    fullName
    profile{
      personalPhone
      personalWebSite
      addressFull
      jobCompanyName
    }
    role{
      ${idFieldRole}
      name
    }
    teams{
      ${idFieldTeam}
      name
    }
  }
}`;

const findUser = `{
  findUser(query: {${idFieldUser}: "${userId}"}) {
    ${idFieldUser}
    email
    fullName
    profile{
      personalPhone
      personalWebSite
      addressFull
      jobCompanyName
    }
    role{
      ${idFieldRole}
      name
    }
    teams{
      ${idFieldTeam}
      name
    }
  }
}`;

const getRole = `{
  getRole(key: "${roleId}") {
    ${idFieldRole}
    name
    users{
      ${idFieldUser}
      email
      fullName
    }
  }
}`;

const findRole = `{
  findRole(query: {${idFieldRole}: "${roleId}"}) {
    ${idFieldRole}
    name
    users{
      ${idFieldUser}
      email
      fullName
    }
  }
}`;

const getTeam = `{
  getTeam(key: "${teamId}") {
    ${idFieldTeam}
    name
    members{
      ${idFieldUser}
      email
      fullName
    }
  }
}`;

const findTeam = `{
  findTeam(query: {${idFieldTeam}: "${teamId}"}) {
    ${idFieldTeam}
    name
    members{
      ${idFieldUser}
      email
      fullName
    }
  }
}`;

module.exports = {
  getUser,
  findUser,
  getRole,
  findRole,
  getTeam,
  findTeam
};
