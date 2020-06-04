const {readJsonFileSync, appRoot} = require('../lib');
const loPick = require('lodash/pick');

// Get generated fake data
let fakeData = readJsonFileSync(`${appRoot}/seeds/fake-data.json`) || {};
//--- Users --//
const usersFakeData = fakeData['users'];
const userFakeData = usersFakeData[0];
const userFakeData2 = usersFakeData[1];
const idFieldUser = 'id' in userFakeData ? 'id' : '_id';
const userId = userFakeData[idFieldUser];
//--- userProfiles --//
const userProfilesFakeData = fakeData['userProfiles'];
const userProfileFakeData = userProfilesFakeData.find(profile => profile[idFieldUser] === userFakeData.profileId);
//--- Roles --//
const rolesFakeData = fakeData['roles'];
const roleFakeData = rolesFakeData[0];
const idFieldRole = 'id' in roleFakeData ? 'id' : '_id';
const roleId = roleFakeData[idFieldRole];
//--- Teams --//
const teamsFakeData = fakeData['teams'];
const teamFakeData = teamsFakeData[0];
const idFieldTeam = 'id' in teamFakeData ? 'id' : '_id';
const teamId = teamFakeData[idFieldTeam];
//--- logMessages --//
const logMessagesFakeData = fakeData['logMessages'];
const logMessageFakeData = logMessagesFakeData[0];
const idFieldLogMessage = 'id' in logMessageFakeData ? 'id' : '_id';
const logMessageId = logMessageFakeData[idFieldLogMessage];
//--- chatMessages --//
const chatMessagesFakeData = fakeData['chatMessages'];
const chatMessageFakeData = chatMessagesFakeData[0];
const idFieldChatMessage = 'id' in chatMessageFakeData ? 'id' : '_id';
const chatMessageId = chatMessageFakeData[idFieldChatMessage];



const _usersForTeam = (teamId) => {
  let teams = {};
  fakeData['userTeams'].forEach(userTeam => {
    if (!teams[userTeam.teamId]) {
      teams[userTeam.teamId] = [];
    }
    teams[userTeam.teamId].push(userTeam.userId);
  });
  return teams[teamId] ? teams[teamId] : [];
};

const _teamsForUser = (userId) => {
  let users = {};
  fakeData['userTeams'].forEach(userTeam => {
    if (!users[userTeam.userId]) {
      users[userTeam.userId] = [];
    }
    users[userTeam.userId].push(userTeam.teamId);
  });
  return users[userId] ? users[userId] : [];
};


//--- User --//
const rolesForUser = rolesFakeData.filter(role => {
  return (role[idFieldRole] === userFakeData['roleId']);
}).map(role => {
  return loPick(role, [idFieldRole, 'name']);
});

const teamsForUser = () => {
  const _userId = userFakeData[idFieldUser];
  const _teamIdsForUser = _teamsForUser(_userId);
  return teamsFakeData.filter(team => _teamIdsForUser.indexOf(team[idFieldTeam]) >= 0).map(team => {
    return loPick(team, [idFieldTeam, 'name']);
  });
};

//--- Role --//
const usersForRole = usersFakeData.filter(user => {
  return (roleFakeData[idFieldRole] === user['roleId']);
}).map(user => {
  let _user = loPick(user, [idFieldUser, 'email']);
  Object.assign(_user, {fullName: `${user.firstName} ${user.lastName}`});
  return _user;
});

//--- Team --//
const usersForTeam = () => {
  const _teamId = teamFakeData[idFieldTeam];
  const _userIdsForTeam = _usersForTeam(_teamId);
  return usersFakeData.filter(user => _userIdsForTeam.indexOf(user[idFieldUser]) >= 0).map(user => {
    let _user = loPick(user, [idFieldUser, 'email']);
    Object.assign(_user, {fullName: `${user.firstName} ${user.lastName}`});
    return _user;
  });
};

let getUser = () => {
  const item = Object.create(null);
  item.getUser = {
    [idFieldUser]: userId,
    email: userFakeData.email,
    fullName: `${userFakeData.firstName} ${userFakeData.lastName}`,
    profile: {
      personalPhone: userProfileFakeData.personalPhone,
      personalWebSite: userProfileFakeData.personalWebSite,
      jobCompanyName: userProfileFakeData.jobCompanyName,
    },
    role: rolesForUser[0],
    teams: teamsForUser()
  };
  return item;
};

let findUser = () => {
  const items = [];
  const item = Object.create(null);
  item.findUser = [{
    [idFieldUser]: userId,
    email: userFakeData.email,
    fullName: `${userFakeData.firstName} ${userFakeData.lastName}`,
    profile: {
      personalPhone: userProfileFakeData.personalPhone,
      personalWebSite: userProfileFakeData.personalWebSite,
      jobCompanyName: userProfileFakeData.jobCompanyName,
    },
    role: rolesForUser[0],
    teams: teamsForUser()
  }];
  items.push(item);
  return items;
};

let getRole = () => {
  const item = Object.create(null);
  item.getRole = {
    [idFieldRole]: roleId,
    name: roleFakeData.name,
    users: usersForRole
  };
  return item;
};

let findRole = () => {
  const items = [];
  const item = Object.create(null);
  item.findRole = [{
    [idFieldRole]: roleId,
    name: roleFakeData.name,
    users: usersForRole
  }];
  items.push(item);
  return items;
};

let getTeam = () => {
  const item = Object.create(null);
  item.getTeam = {
    [idFieldTeam]: teamId,
    name: teamFakeData.name,
    members: usersForTeam()
  };
  return item;
};

let findTeam = () => {
  const items = [];
  const item = Object.create(null);
  item.findTeam = [{
    [idFieldTeam]: teamId,
    name: teamFakeData.name,
    members: usersForTeam()
  }];
  items.push(item);
  return items;
};

let getLogMessage = () => {
  const item = Object.create(null);
  item.getLogMessage = {
    [idFieldLogMessage]: logMessageId,
    gr: logMessageFakeData.gr,
    pr: logMessageFakeData.pr,
    name: logMessageFakeData.name,
    msg:  logMessageFakeData.msg,
    owner: {
      [idFieldUser]: userId,
      email: userFakeData.email,
      fullName: `${userFakeData.firstName} ${userFakeData.lastName}`
    },
    user: {
      [idFieldUser]: userId,
      email: userFakeData.email,
      fullName: `${userFakeData.firstName} ${userFakeData.lastName}`
    }
  };
  return item;
};

let findLogMessage = () => {
  const items = [];
  const item = Object.create(null);
  item.findLogMessage = [{
    [idFieldLogMessage]: logMessageId,
    gr: logMessageFakeData.gr,
    pr: logMessageFakeData.pr,
    name: logMessageFakeData.name,
    msg:  logMessageFakeData.msg,
    owner: {
      [idFieldUser]: userId,
      email: userFakeData.email,
      fullName: `${userFakeData.firstName} ${userFakeData.lastName}`
    },
    user: {
      [idFieldUser]: userId,
      email: userFakeData.email,
      fullName: `${userFakeData.firstName} ${userFakeData.lastName}`
    }
  }];
  items.push(item);
  return items;
};

let getChatMessage = () => {
  const item = Object.create(null);
  item.getChatMessage = {
    [idFieldChatMessage]: chatMessageId,
    msg:  chatMessageFakeData.msg,
    team: null,
    owner: {
      [idFieldUser]: userId,
      email: userFakeData.email,
      fullName: `${userFakeData.firstName} ${userFakeData.lastName}`
    },
    user: {
      [idFieldUser]: userFakeData2[idFieldUser],
      email: userFakeData2.email,
      fullName: `${userFakeData2.firstName} ${userFakeData2.lastName}`
    }
  };
  return item;
};

let findChatMessage = () => {
  const items = [];
  const item = Object.create(null);
  item.findChatMessage = [{
    [idFieldChatMessage]: chatMessageId,
    msg:  chatMessageFakeData.msg,
    team: null,
    owner: {
      [idFieldUser]: userId,
      email: userFakeData.email,
      fullName: `${userFakeData.firstName} ${userFakeData.lastName}`
    },
    user: {
      [idFieldUser]: userFakeData2[idFieldUser],
      email: userFakeData2.email,
      fullName: `${userFakeData2.firstName} ${userFakeData2.lastName}`
    }
  }];
  items.push(item);
  return items;
};

module.exports = {
  getUser: getUser(),
  findUser: findUser(),
  getRole: getRole(),
  findRole: findRole(),
  getTeam: getTeam(),
  findTeam: findTeam(),
  getLogMessage: getLogMessage(),
  findLogMessage: findLogMessage(),
  getChatMessage: getChatMessage(),
  findChatMessage: findChatMessage()
};
