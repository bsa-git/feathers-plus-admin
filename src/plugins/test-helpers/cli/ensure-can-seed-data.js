
const { join } = require('path');
const doesFileExist = require('../../lib/does-file-exist');

const connectionStrings = ['mongodb', 'mysql', 'nedb', 'postgres', 'rethinkdb', 'sqlite', 'mssql'];
let canSeedData;
let initialized = false;

module.exports = function ensureCanSeedData(appRootPath) {
  if (!initialized) {
    initialized = true;
    canSeedData = check(appRootPath);
  }

  return canSeedData;
};

function check(appRootPath) {
  // Get default config. Note node-config does not demand a default.json if a default.js exists.
  const defaultPath = join(appRootPath, 'config', 'default.json');
  if (!doesFileExist(defaultPath)) {
    return 'config/default.json not found. Cannot run test requiring seed data. (ensureCanSeedData)';
  }

  const defaultConfig = require(defaultPath);

  // Ensure environment allows seed data
  let seedEnvs = defaultConfig.tests && defaultConfig.tests.environmentsAllowingSeedData ?
    defaultConfig.tests.environmentsAllowingSeedData : [];
  seedEnvs = Array.isArray(seedEnvs) ? seedEnvs : [seedEnvs];

  const nodeEnv = process.env.NODE_ENV;
  if (seedEnvs.indexOf(nodeEnv) === -1) {
    return `Cannot seed data for tests when NODE_ENV=${nodeEnv}. (ensureCanSeedData)`;
  }

  // Get environment config. Node-config would have thrown if its missing but we still check.
  const envPath = join(appRootPath, 'config', `${nodeEnv}.json`);
  if (!doesFileExist(envPath)) {
    return `config/${nodeEnv}.json not found. Cannot run test requiring seed data. (ensureCanSeedData)`;
  }

  const envConfig = require(envPath);

  // Check environment config overrides all connection strings in the default config
  connectionStrings.forEach(str => {
    if (defaultConfig[str] && !envConfig[str]) {
      return `No connection string for "${str}" in config/${nodeEnv}.json. (ensureCanSeedData)`;
    }
  });

  // Check faked data exists
  const seedPath = join(appRootPath, 'seeds', 'fake-data.json');
  if (!doesFileExist(seedPath)) {
    return 'seeds/fake-data.json not found. Cannot run test requiring seed data. (ensureCanSeedData)';
  }

  const fakedData = require(seedPath);

  if (!Object.keys(fakedData).length) {
    return 'seeds/fake-data.json has no data. Cannot run test requiring seed data. (ensureCanSeedData)';
  }

  return '';
}
