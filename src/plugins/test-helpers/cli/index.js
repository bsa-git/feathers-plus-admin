
const authenticationBase = require('./authentication.base.js');
const authenticationServices = require('./authentication.services.js');
const ensureCanSeedData = require('./ensure-can-seed-data');
const expandSpecsForTest = require('./expand-specs-for-test');

module.exports = {
  authenticationBase,
  authenticationServices,
  ensureCanSeedData,
  expandSpecsForTest,
};
