const config = require('../../../config/default.json');

module.exports = function isTestEnv () {
  let env = (config.tests || {}).environmentsAllowingSeedData || [];
  return env.includes(process.env.NODE_ENV);
};
