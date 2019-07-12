const {readJsonFileSync, writeJsonFileSync, inspector, appRoot} = require('../lib');
const Auth = require(`${appRoot}/src/plugins/auth/auth-server.class`);
const dotenv = require('dotenv');// Loads environment variables from .env file.
const chalk = require('chalk');

dotenv.load(); // Load environment variables

const isDebug = true;
const isLog = false;

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


const rolesUpdate = () => {
  const roles = Object.values(Auth.getRoles());
  if(isLog) inspector('fake-service.rolesUpdate.roles:', roles);
  roles.forEach((role, index) => {
    fakeDataRoles[index]['name'] = role;
  });
  if(isLog) inspector('fake-service.rolesUpdate.fakeDataRoles:', fakeDataRoles);
  if(isDebug) console.log(chalk.yellow('Roles Update: OK'));
};

const usersUpdate = () => {
  // Set  roleId for users
  fakeDataUsers[0]['roleId'] = fakeDataRole[idFieldRole];
  // Set profileId for users
  fakeDataUserProfiles.forEach((profile, index) => {
    fakeDataUsers[index]['profileId'] = profile[idFieldUserProfile];
  });
  if(isLog) inspector('fake-service.usersUpdate.fakeDataUsers:', fakeDataUsers);
  if(isDebug) console.log(chalk.yellow('Users Update: OK'));
};

const userTeamsUpdate = () => {
  fakeDataTeams.forEach((team, index) => {
    fakeDataUserTeams[index]['teamId'] = team[idFieldTeam];
  });
  fakeDataUserTeams[0]['userId'] = fakeDataUsers[0][idFieldUser];
  if(isLog) inspector('fake-service.userTeamsUpdate.fakeDataUserTeams:', fakeDataUserTeams);
  if(isDebug) console.log(chalk.yellow('UserTeams Update: OK'));
};

const fakeDataUpdate = () => {
  Object.assign(fakeData, {
    users: fakeDataUsers,
    roles: fakeDataRoles,
    teams: fakeDataTeams,
    userTeams: fakeDataUserTeams,
    userProfiles: fakeDataUserProfiles,
  });
  writeJsonFileSync(`${appRoot}/seeds/fake-data.json`, fakeData);
};

if(isDebug) console.log(chalk.yellow('Start: Fake-Service!'));
rolesUpdate();
usersUpdate();
userTeamsUpdate();
fakeDataUpdate();
if(isDebug) console.log(chalk.yellow('Finish: Fake-Service!'));
