const {readJsonFileSync, writeJsonFileSync, inspector, appRoot} = require('../lib');
const Auth = require(`${appRoot}/src/plugins/auth/auth-server.class`);
const dotenv = require('dotenv');// Loads environment variables from .env file.
const chalk = require('chalk');

dotenv.load(); // Load environment variables

const isDebug = true;
const isLog = false;

// Get json log data
const jsonLogData = readJsonFileSync(`${appRoot}/public/api/app/app-log-msg.json`) || {};
const getLogData = (name) => {
  return jsonLogData.filter(item => !item.isConfig).find(item => item.name === name);
};
const logData = getLogData('TEST');

// Get generated fake data
let fakeData = readJsonFileSync(`${appRoot}/seeds/fake-data.json`) || {};

let fakeDataUsers = fakeData['users'];
let fakeDataUser = fakeDataUsers[0];
let idFieldUser = 'id' in fakeDataUser ? 'id' : '_id';

let fakeDataRoles = fakeData['roles'];
let fakeDataRole = fakeDataRoles[0];
let idFieldRole = 'id' in fakeDataRole ? 'id' : '_id';

let fakeDataTeams = fakeData['teams'];
let fakeDataTeam = fakeDataTeams[0];
let idFieldTeam = 'id' in fakeDataTeam ? 'id' : '_id';

let fakeDataUserTeams = fakeData['userTeams'];
// let fakeDataUserTeam = fakeDataUserTeams[0];
// let idFieldUserTeam = 'id' in fakeDataUserTeam ? 'id' : '_id';

let fakeDataUserProfiles = fakeData['userProfiles'];
let fakeDataUserProfile = fakeDataUserProfiles[0];
let idFieldUserProfile = 'id' in fakeDataUserProfile ? 'id' : '_id';

let fakeDataLogMessages = fakeData['logMessages'];

const rolesUpdate = () => {
  const roles = Object.values(Auth.getRoles());
  if(isLog) inspector('fake-service.rolesUpdate.roles:', roles);
  roles.forEach((role, index) => {
    fakeDataRoles[index]['name'] = role;
  });
  if(isLog) inspector('fake-service.rolesUpdate.fakeDataRoles:', fakeDataRoles);
  if(isDebug) console.log(chalk.yellow('Roles Update: Ok'));
};

const usersUpdate = () => {
  // Set  roleId for users
  fakeDataUsers[0]['roleId'] = fakeDataRole[idFieldRole];
  // Set profileId for users
  fakeDataUserProfiles.forEach((profile, index) => {
    fakeDataUsers[index]['profileId'] = profile[idFieldUserProfile];
  });

  Object.assign(fakeDataUsers, fakeDataUsers.map(user => {
    const nowDate = new Date(0);// Date.now()
    user.loginAt = nowDate.toJSON();
    user.active = true,
    user.isVerified = true;
    user.verifyToken = '';
    user.verifyShortToken = '';
    user.verifyExpires = nowDate.toJSON();
    user.verifyChanges = {};
    user.resetToken = '';
    user.resetShortToken = '';
    user.resetExpires = nowDate.toJSON();
    return user;
  }));

  if(isLog) inspector('fake-service.usersUpdate.fakeDataUsers:', fakeDataUsers);
  if(isDebug) console.log(chalk.yellow('Users Update: Ok'));
};

const userTeamsUpdate = () => {
  fakeDataTeams.forEach((team, index) => {
    fakeDataUserTeams[index]['teamId'] = team[idFieldTeam];
  });
  fakeDataUserTeams[0]['userId'] = fakeDataUsers[0][idFieldUser];
  if(isLog) inspector('fake-service.userTeamsUpdate.fakeDataUserTeams:', fakeDataUserTeams);
  if(isDebug) console.log(chalk.yellow('UserTeams Update: Ok'));
};

const logMessagesUpdate = () => {
  fakeDataLogMessages[0]['gr'] = logData.gr;
  fakeDataLogMessages[0]['pr'] = logData.pr;
  fakeDataLogMessages[0]['name'] = logData.name;
  fakeDataLogMessages[0]['msg'] = JSON.stringify({message: fakeDataLogMessages[0]['msg']});
  if(isLog) inspector('fake-service.logMessagesUpdate.fakeDataLogMessages:', fakeDataLogMessages);
  if(isDebug) console.log(chalk.yellow('LogMessages Update: Ok'));
};

const fakeDataUpdate = () => {
  Object.assign(fakeData, {
    users: fakeDataUsers,
    roles: fakeDataRoles,
    teams: fakeDataTeams,
    userTeams: fakeDataUserTeams,
    userProfiles: fakeDataUserProfiles,
    logMessages: fakeDataLogMessages
  });
  writeJsonFileSync(`${appRoot}/seeds/fake-data.json`, fakeData);
};

if(isDebug) console.log(chalk.yellow('Start: Fake-Service!'));
// Services fake data update
rolesUpdate();
usersUpdate();
userTeamsUpdate();
logMessagesUpdate();
// All fake data update
fakeDataUpdate();
if(isDebug) console.log(chalk.yellow('Finish: Fake-Service!'));
