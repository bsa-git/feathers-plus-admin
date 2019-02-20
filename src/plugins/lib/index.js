
const doesFileExist = require('./does-file-exist');
const readJsonFileSync = require('./read-json-file-sync');
const util = require('./util');

module.exports = Object.assign({},
  {
    doesFileExist,
    readJsonFileSync,
  },
  util,
);
