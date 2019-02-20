
const {readJsonFileSync, appRoot} = require('../lib');

const idName = '_id';

// Get generated fake data
let fakeData = readJsonFileSync(`${appRoot}/seeds/fake-data.json`) || {};
const userKey = fakeData['users'][0][idName];
const roleKey = fakeData['roles'][0][idName];
const teamKey = fakeData['teams'][0][idName];

const getUser = `{
  getUser(key: "${userKey}") {
    ${idName}
    email
    firstName
    lastName
    fullName
    role{
      ${idName}
      name
    }
    teams{
      ${idName}
      name
    }
  }
}`;

const findUser = `{
  findUser(query: {${idName}: "${userKey}"}) {
    ${idName}
    email
    firstName
    lastName
    fullName
    role{
      ${idName}
      name
    }
    teams{
      ${idName}
      name
    }
  }
}`;

const getRole = `{
  getRole(key: "${roleKey}") {
    ${idName}
    name
    users{
      ${idName}
      email
      fullName
    }
  }
}`;

const findRole = `{
  findRole(query: {${idName}: "${roleKey}"}) {
    ${idName}
    name
    users{
      ${idName}
      email
      fullName
    }
  }
}`;

const getTeam = `{
  getTeam(key: "${teamKey}") {
    ${idName}
    name
    members{
      ${idName}
      email
      fullName
    }
  }
}`;

const findTeam = `{
  findTeam(query: {${idName}: "${teamKey}"}) {
    ${idName}
    name
    members{
      ${idName}
      email
      fullName
    }
  }
}`;
// members

module.exports = {
  getUser,
  findUser,
  getRole,
  findRole,
  getTeam,
  findTeam
};
