const {readJsonFileSync, appRoot} = require('../lib');

const idName = '_id';

// Get generated fake data
let fakeData = readJsonFileSync(`${appRoot}/seeds/fake-data.json`) || {};
//--- Users --//
const usersFakeData = fakeData['users'];
const userFakeData = usersFakeData[0];
const userKey = userFakeData[idName];
//--- Roles --//
const rolesFakeData = fakeData['roles'];
const roleFakeData = rolesFakeData[0];
const roleKey = roleFakeData[idName];
//--- Teams --//
const teamsFakeData = fakeData['teams'];
const teamFakeData = teamsFakeData[0];
const teamKey = teamFakeData[idName];

//--- User --//
const userRolesFakeData = rolesFakeData.filter(role => {
  return (role[idName] === userFakeData['roleId']);
});
const userTeamsFakeData = fakeData['teams'].filter(team => {
  return team.memberIds.includes(userFakeData[idName]);
}).map(team => {
  delete team.memberIds;
  return team;
});

//--- Role --//
const roleUsersFakeData = usersFakeData.filter(user => {
  return (roleFakeData[idName] === user['roleId']);
}).map(user => {
  let _user = {};
  _user[idName] = user[idName];
  Object.assign(_user, {email: user.email, fullName: `${user.firstName} ${user.lastName}`});
  return _user;
});

//--- Team --//
const teamUsersFakeData = usersFakeData.filter(user => {
  // return (roleFakeData[idName] === user['roleId']);
  return teamFakeData.memberIds.includes(user[idName]);
}).map(user => {
  let _user = {};
  _user[idName] = user[idName];
  Object.assign(_user, {email: user.email, fullName: `${user.firstName} ${user.lastName}`});
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
getUser.getUser[idName] = userKey;

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
findUser[0].findUser[0][idName] = userKey;

let getRole = {
  getRole: {
    name: roleFakeData.name,
    users: roleUsersFakeData
  }
};
getRole.getRole[idName] = roleKey;

let findRole = [{
  findRole: [{
    name: roleFakeData.name,
    users: roleUsersFakeData
  }]
}];
findRole[0].findRole[0][idName] = roleKey;

let getTeam = {
  getTeam: {
    name: teamFakeData.name,
    members: teamUsersFakeData
  }
};
getTeam.getTeam[idName] = teamKey;

let findTeam = [{
  findTeam: [{
    name: teamFakeData.name,
    members: teamUsersFakeData
  }]
}];
findTeam[0].findTeam[0][idName] = teamKey;


module.exports = {
  getUser,
  findUser,
  getRole,
  findRole,
  getTeam,
  findTeam
};
