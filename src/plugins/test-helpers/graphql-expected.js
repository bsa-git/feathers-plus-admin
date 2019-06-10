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

//--- User --//
const userRolesFakeData = rolesFakeData.filter(role => {
  return (role[idFieldRole] === userFakeData['roleId']);
}).map(role => {
  return loPick(role, [idFieldRole, 'name']);
});
const userTeamsFakeData = teamsFakeData.filter(team => {
  return team.memberIds.includes(userFakeData[idFieldUser]);
}).map(team => {
  return loPick(team, [idFieldTeam, 'name']);
});

//--- Role --//
const roleUsersFakeData = usersFakeData.filter(user => {
  return (roleFakeData[idFieldRole] === user['roleId']);
}).map(user => {
  let _user = loPick(user, [idFieldUser, 'email']);
  Object.assign(_user, {fullName: `${user.firstName} ${user.lastName}`});
  return _user;
});

//--- Team --//
const teamUsersFakeData = usersFakeData.filter(user => {
  return teamFakeData.memberIds.includes(user[idFieldUser]);
}).map(user => {
  let _user = loPick(user, [idFieldUser, 'email']);
  Object.assign(_user, {fullName: `${user.firstName} ${user.lastName}`});
  return _user;
});


let getUser = {
  getUser: {
    email: userFakeData.email,
    firstName: userFakeData.firstName,
    lastName: userFakeData.lastName,
    fullName: `${userFakeData.firstName} ${userFakeData.lastName}`,
    role: userRolesFakeData[0],
    teams: userTeamsFakeData
  }
};
getUser.getUser[idFieldUser] = userId;

let findUser = [{
  findUser: [{
    email: userFakeData.email,
    firstName: userFakeData.firstName,
    lastName: userFakeData.lastName,
    fullName: `${userFakeData.firstName} ${userFakeData.lastName}`,
    role: userRolesFakeData[0],
    teams: userTeamsFakeData
  }]
}];
findUser[0].findUser[0][idFieldUser] = userId;

let getRole = {
  getRole: {
    name: roleFakeData.name,
    users: roleUsersFakeData
  }
};
getRole.getRole[idFieldRole] = roleId;

let findRole = [{
  findRole: [{
    name: roleFakeData.name,
    users: roleUsersFakeData
  }]
}];
findRole[0].findRole[0][idFieldRole] = roleId;

let getTeam = {
  getTeam: {
    name: teamFakeData.name,
    members: teamUsersFakeData
  }
};
getTeam.getTeam[idFieldTeam] = teamId;

let findTeam = [{
  findTeam: [{
    name: teamFakeData.name,
    members: teamUsersFakeData
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
