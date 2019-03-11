
const merge = require('lodash.merge');
const { join } = require('path');
const doesFileExist = require('../../lib/does-file-exist');

let err;
let genSpecs;
let initialized = false;

module.exports = function expandSpecsForTest(appRootPath, options) {
  if (!initialized) {
    initialized = true;
    [err, genSpecs] = expand(appRootPath, options);
  }

  return { err, genSpecs };
};

function expand(appRootPath, { strats = {}, overriddenAuth = {} }) {
  strats = strats || [];
  strats = Array.isArray(strats) ? strats : [strats];

  // Get specs from feathers-plus/cli generations.
  const specsPath = join(appRootPath, 'feathers-gen-specs.json');
  if (!doesFileExist(specsPath)) {
    return ['feathers-gen-specs.json not found. Cannot run test. (expandSpecsForTests)', {}];
  }

  const genSpecs = require(specsPath);

  // Check authentication was generated
  if (strats.length && !genSpecs.authentication) {
    return ['Authentication has not been generated for this app. (expandSpecsForTests)', genSpecs];
  } else {
    // Check required strategies have been generated.
    const strategies = genSpecs.authentication.strategies || [];
    if(strats.every(incl => strategies.indexOf(incl) === -1)) {
      return ['Required authentication strategy has not been generated. (expandSpecsForTests)', genSpecs];
    }

    // Add user-entity service's path
    const usersName = genSpecs.authentication.entity;
    const usersService = genSpecs.services[usersName];
    const usersPath = usersService ? usersService.path : undefined;
    if (!usersPath) {
      return [`Authentication's user-entity ${usersName}'s path has not been generated. (expandSpecsForTests)`, genSpecs];
    }

    genSpecs.authentication._entityPath = usersPath;
  }

  // Define which methods have authentication
  genSpecs._authByMethod = {};

  Object.keys(genSpecs.services).forEach(name => {
    const serviceSpec = genSpecs.services[name];
    if (serviceSpec.adapter !== 'custom') {
      const isAuthEntity = serviceSpec.isAuthEntity;
      const auth = isAuthEntity || serviceSpec.requiresAuth ? 'auth' : 'noauth';
      genSpecs._authByMethod[name] = {
        // create must be first
        create: isAuthEntity ? 'noauth' : auth, find: auth, get: auth, patch: auth, update: auth, remove: auth
      };
    }
  });

  merge(genSpecs._authByMethod, overriddenAuth);

  // Move rest to end of providers
  const providers = genSpecs.app.providers;
  const i = providers.indexOf('rest');
  if (i !== -1) {
    providers.splice(providers.length - 1, 0, providers.splice(i, 1)[0]);
  }

  return ['', genSpecs];
}

// function includesSome(array, includes) {
//   return includes.some(incl => array.indexOf(incl) !== -1);
// }
