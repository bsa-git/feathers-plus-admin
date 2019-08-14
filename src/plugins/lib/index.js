
const doesFileExist = require('./does-file-exist');
const readJsonFileSync = require('./read-json-file-sync');
const writeJsonFileSync = require('./write-json-file-sync');
const util = require('./util');
const typeOf = require('./type-of');
const langHelpers = require('./lang-helpers');

module.exports = Object.assign({},
  {
    doesFileExist,
    readJsonFileSync,
    writeJsonFileSync
  },
  util,
  typeOf,
  langHelpers
);
