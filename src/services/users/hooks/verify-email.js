// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const {checkContext, getItems, replaceItems} = require('feathers-hooks-common');
const errors = require('@feathersjs/errors');
const ajv = require('ajv')({allErrors: true});
const createSchema = require('../users.validate').schema;
const debug = require('debug')('app:verify-email.service.hook');

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {

  // Return the actual hook.
  return (context) => {
    // Throw if the hook is being called from an unexpected location.
    checkContext(context, null, ['find', 'get', 'create', 'update', 'patch', 'remove']);

    // Get the authenticated user.
    // eslint-disable-next-line no-unused-vars
    const {user} = context.params;
    // Get the record(s) from context.data (before), context.result.data or context.result (after).
    // getItems always returns an array to simplify your processing.
    let records = getItems(context);

    // console.log('records');
    // debug('getItems(context).records:', records);

    /*
    Modify records and/or context.
    */
    const validateEmail = (email) => {
      const valid = ajv.validate(createSchema, {email});
      if (valid) {
        debug(`${context.type} app.service('${context.path}').${context.method}(). `, `Email '${email}' is valid`);
      }else {
        debug(`${context.type} app.service('${context.path}').${context.method}(). `, `Email '${email}' not valid`);
        throw new errors.BadRequest(`Invalid email: "${email}"`);
      }
    };
    if (Array.isArray(records)) {
      records.forEach(record => {
        validateEmail(record.email);
      });
    } else {
      validateEmail(records.email);
    }

    // Place the modified records back in the context.
    replaceItems(context, records);
    // Best practice: hooks should always return the context.
    return context;
  };
};

// Throw on unrecoverable error.
// eslint-disable-next-line no-unused-vars
function error(msg) {
  throw new Error(msg);
}
