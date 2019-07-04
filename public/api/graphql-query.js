// Get generated fake data
import fakeData from '~~/seeds/fake-data.json';

const idFieldUser = 'id' in fakeData['users'][0] ? 'id' : '_id';
const idFieldRole = 'id' in fakeData['roles'][0] ? 'id' : '_id';
const idFieldTeam = 'id' in fakeData['teams'][0] ? 'id' : '_id';

const userId = fakeData['users'][0][idFieldUser];
const roleId = fakeData['roles'][0][idFieldRole];
const teamId = fakeData['teams'][0][idFieldTeam];

let getUser = `{
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
      description
    }
    teams{
      ${idFieldTeam}
      name
      description
    }
  }
}`;

let getRole = `{
  getRole(key: "${roleId}") {
    ${idFieldRole}
    name
    description
    users{
      ${idFieldUser}
      email
      fullName
    }
  }
}`;

let getTeam = `{
  getTeam(key: "${teamId}") {
    ${idFieldTeam}
    name
    description
    members{
      ${idFieldUser}
      email
      fullName
    }
  }
}`;

let findUser = `{
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
      description
    }
    teams{
      ${idFieldTeam}
      name
      description
    }
  }
}`;

let findRole = `{
  findRole(query: {${idFieldRole}: "${roleId}"}) {
    ${idFieldRole}
    name
    description
    users{
      ${idFieldUser}
      email
      fullName
    }
  }
}`;

let findTeam = `{
  findTeam(query: {${idFieldTeam}: "${teamId}"}) {
    ${idFieldTeam}
    name
    description
    members{
      ${idFieldUser}
      email
      fullName
    }
  }
}`;

export default {
  getUser,
  getRole,
  getTeam,
  findUser,
  findRole,
  findTeam,
};
