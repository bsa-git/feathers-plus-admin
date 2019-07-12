
const jsonFile = require('jsonfile');
const { join } = require('path');

module.exports = function writeJsonFileSync(path, obj, options) {
  let _options = {spaces: 2};
  Object.assign(_options, options);

  if (Array.isArray(path)) {
    path = join(...path);
  }
  return jsonFile.writeFileSync(path, obj, _options);
};
