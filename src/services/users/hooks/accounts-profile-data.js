// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const {checkContext, getItems, replaceItems} = require('feathers-hooks-common');
// const errors = require('@feathersjs/errors');
// const ajv = require('ajv')({allErrors: true});
// const createSchema = require('../users.validate').schema;
const debug = require('debug')('app:accounts-profile-data.service.hook');
const isArray = require('lodash/isArray');

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

    /*
    Modify records and/or context.
    */
    /**
     * getProfileData
     * @param record {Object}
     * @returns {Object}
     */
    const getProfileData = (record) => {
      let newRecord = {};
      let _raw = {};
      if(record.google){// Google account
        _raw = JSON.parse(record.google.profile._raw);
        if(record.googleId){
          newRecord.googleId = record.googleId;
        }
        newRecord.email = _raw.emails.find(email => {
          return email.type === 'account';
        }).value;
        newRecord.firstName = _raw.name.givenName;
        newRecord.lastName = _raw.name.familyName;
        newRecord.googleTokens = {accessToken: record.google.accessToken};
        return newRecord;
      }else if(record.github){// GitHub account
        if(record.githubId){
          newRecord.githubId = record.githubId;
        }
        newRecord.email = record.github.profile.emails[0].value;
        const names = record.github.profile.displayName.trim().split(' ');
        newRecord.firstName = names[0];
        if(names.length > 1){
          newRecord.lastName = names[1];
        }
        newRecord.githubTokens = {accessToken: record.github.accessToken};
        return newRecord;
      }else {// No accounts
        return record;
      }
    };

    let newRecords = [];
    // debug('getItems(context).records:', records);

    if (isArray(records)) {
      records.forEach(record => {
        newRecords.push(getProfileData(record));
      });
      debug('newRecords:', newRecords);
      replaceItems(context, newRecords);
    } else {
      const newRecord = getProfileData(records);
      debug('newRecord:', newRecord);
      replaceItems(context, newRecord);
    }

    // Place the modified records back in the context.
    // replaceItems(context, newRecords);
    // Best practice: hooks should always return the context.
    return context;
  };
};
