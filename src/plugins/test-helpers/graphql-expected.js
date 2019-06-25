const {readJsonFileSync, appRoot} = require('../lib');
const loPick = require('lodash/pick');

// Get generated fake data
let fakeData = readJsonFileSync(`${appRoot}/seeds/fake-data.json`) || {};
//--- Users --//
const usersFakeData = fakeData['users'];
const userFakeData = usersFakeData[0];
const idFieldUser = 'id' in userFakeData ? 'id' : '_id';
const userId = userFakeData[idFieldUser];
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
//--- userTeams --//
// const userTeamsFakeData = fakeData['userTeams'];
// const idFieldUserTeam = 'id' in userTeamsFakeData[0] ? 'id' : '_id';

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
  return  usersFakeData.filter(user => _userIdsForTeam.indexOf(user[idFieldUser]) >= 0).map(user => {
    let _user = loPick(user, [idFieldUser, 'email']);
    Object.assign(_user, {fullName: `${user.firstName} ${user.lastName}`});
    return _user;
  });
};


let getUser = {
  getUser: {
    email: userFakeData.email,
    firstName: userFakeData.firstName,
    lastName: userFakeData.lastName,
    fullName: `${userFakeData.firstName} ${userFakeData.lastName}`,
    role: rolesForUser[0],
    teams: teamsForUser()
  }
};
getUser.getUser[idFieldUser] = userId;

let findUser = [{
  findUser: [{
    email: userFakeData.email,
    firstName: userFakeData.firstName,
    lastName: userFakeData.lastName,
    fullName: `${userFakeData.firstName} ${userFakeData.lastName}`,
    role: rolesForUser[0],
    teams: teamsForUser()
  }]
}];
findUser[0].findUser[0][idFieldUser] = userId;

let getRole = {
  getRole: {
    name: roleFakeData.name,
    users: usersForRole
  }
};
getRole.getRole[idFieldRole] = roleId;

let findRole = [{
  findRole: [{
    name: roleFakeData.name,
    users: usersForRole
  }]
}];
findRole[0].findRole[0][idFieldRole] = roleId;

let getTeam = {
  getTeam: {
    name: teamFakeData.name,
    members: usersForTeam()
  }
};
getTeam.getTeam[idFieldTeam] = teamId;

let findTeam = [{
  findTeam: [{
    name: teamFakeData.name,
    members: usersForTeam()
  }]
}];
findTeam[0].findTeam[0][idFieldTeam] = teamId;


module.exports = {
  getUser,
  findUser,
  getRole,
  findRole,
  getTeam,
  findTeam
};
