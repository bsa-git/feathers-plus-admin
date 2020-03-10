
const doesFileExist = require('./does-file-exist');
const readJsonFileSync = require('./read-json-file-sync');
const writeJsonFileSync = require('./write-json-file-sync');
const util = require('./util');
const typeOf = require('./type-of');
const langHelpers = require('./lang-helpers');
// const HookHelper = require('./hook-helper.class');

module.exports = Object.assign({},
  {
    doesFileExist,
    readJsonFileSync,
    writeJsonFileSync,
    // HookHelper
  },
  util,
  typeOf,
  langHelpers
);
