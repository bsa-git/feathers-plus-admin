
const {readJsonFileSync, appRoot} = require('../lib');

// Get generated fake data
let fakeData = readJsonFileSync(`${appRoot}/seeds/fake-data.json`) || {};

const idFieldUser = 'id' in fakeData['users'][0] ? 'id' : '_id';
const idFieldRole = 'id' in fakeData['roles'][0] ? 'id' : '_id';
const idFieldTeam = 'id' in fakeData['teams'][0] ? 'id' : '_id';
const idFieldLogMessage = 'id' in fakeData['logMessages'][0] ? 'id' : '_id';
const idFieldChatMessage = 'id' in fakeData['chatMessages'][0] ? 'id' : '_id';

const userId = fakeData['users'][0][idFieldUser];
const roleId = fakeData['roles'][0][idFieldRole];
const teamId = fakeData['teams'][0][idFieldTeam];
const logMessageId = fakeData['logMessages'][0][idFieldLogMessage];
const chatMessageId = fakeData['chatMessages'][0][idFieldChatMessage];

const getUser = `{
  getUser(key: "${userId}") {
    ${idFieldUser}
    email
    fullName
    profile{
      personalPhone
      personalWebSite
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

const getLogMessage = `{
  getLogMessage(key: "${logMessageId}") {
    ${idFieldLogMessage}
    gr
    pr
    name
    msg
    owner{
      ${idFieldUser}
      email
      fullName
    }
    user{
      ${idFieldUser}
      email
      fullName
    }
  }
}`;

const findLogMessage = `{
  findLogMessage(query: {${idFieldLogMessage}: "${logMessageId}"}) {
    ${idFieldLogMessage}
    gr
    pr
    name
    msg
    owner{
      ${idFieldUser}
      email
      fullName
    }
    user{
      ${idFieldUser}
      email
      fullName
    }
  }
}`;

const getChatMessage = `{
  getChatMessage(key: "${chatMessageId}") {
    ${idFieldChatMessage}
    msg
    team{
      ${idFieldTeam}
      name
      description
    }
    owner{
      ${idFieldUser}
      email
      fullName
    }
    user{
      ${idFieldUser}
      email
      fullName
    }
  }
}`;

const findChatMessage = `{
  findChatMessage(query: {${idFieldChatMessage}: "${chatMessageId}"}) {
    ${idFieldChatMessage}
    msg
    team{
      ${idFieldTeam}
      name
      description
    }
    owner{
      ${idFieldUser}
      email
      fullName
    }
    user{
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
  findTeam,
  getLogMessage,
  findLogMessage,
  getChatMessage,
  findChatMessage
};
