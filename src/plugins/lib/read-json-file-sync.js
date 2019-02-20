
const jsonFile = require('jsonfile');
const { join } = require('path');
const doesFileExist = require('./does-file-exist');

module.exports = function readJsonFileSync(path) {
  if (Array.isArray(path)) {
    path = join(...path);
  }

  return !doesFileExist(path) ? null :  jsonFile.readFileSync(path, { throw: false });
};
