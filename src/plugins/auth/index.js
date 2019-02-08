
const localStorage = require('./auth/local-storage');
const loginJwt = require('./auth/login-jwt');
const loginLocal = require('./auth/login-local');
const makeClient = require('./auth/make-client');
const verifiers = require('./verifiers.js');
module.exports = {
  localStorage,
  loginLocal,
  loginJwt,
  makeClient,
  verifiers,
};
