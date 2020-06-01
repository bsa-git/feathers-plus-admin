const localStorage = require('./local-storage');
const loginJwt = require('./login-jwt');
const loginLocal = require('./login-local');
const makeClient = require('./make-client');
const verifiers = require('./verifiers');
const AuthServer = require('./auth-server.class');
const Channel = require('./channel.class');
const checkUserUniqueness = require('./checkUserUniqueness');
module.exports = {
  localStorage,
  loginLocal,
  loginJwt,
  makeClient,
  verifiers,
  AuthServer,
  Channel,
  checkUserUniqueness
};
