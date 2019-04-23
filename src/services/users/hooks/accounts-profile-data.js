// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const {checkContext, getItems, replaceItems} = require('feathers-hooks-common');
const {inspector} = require('../../../plugins/lib');
const debug = require('debug')('app:accounts-profile-data.hook');

const isLog = false;
const isDebug = false;

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
    let isAccount = false;

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

      if (isLog) inspector('getProfileData.record:', record);

      // Google account
      if(record.google){
        if(isDebug) debug(`${context.type} app.service('${context.path}').${context.method}().`, 'Google account');
        isAccount = true;
        _raw = JSON.parse(record.google.profile._raw);
        newRecord.googleId = record.googleId;
        newRecord.email = _raw.emails.find(email => {
          return email.type === 'account';
        }).value;
        newRecord.firstName = _raw.name.givenName;
        newRecord.lastName = _raw.name.familyName;
        // newRecord.googleTokens = {accessToken: record.google.accessToken};
        newRecord.googleAccessToken = record.google.accessToken;
        if(record.google.refreshToken){
          newRecord.googleRefreshToken = record.google.refreshToken;
        }
        return newRecord;

        // GitHub account
      }else if(record.github){
        if(isDebug) debug(`${context.type} app.service('${context.path}').${context.method}(). `, 'Github account');
        isAccount = true;
        newRecord.githubId = record.githubId;
        newRecord.email = record.github.profile.emails[0].value;
        const names = record.github.profile.displayName.trim().split(' ');
        newRecord.firstName = names[0];
        if(names.length > 1){
          newRecord.lastName = names[1];
        }
        // newRecord.githubTokens = {accessToken: record.github.accessToken};
        newRecord.githubAccessToken = record.github.accessToken;
        if(record.github.refreshToken){
          newRecord.githubRefreshToken = record.github.refreshToken;
        }
        return newRecord;

        // No accounts
      }else {
        if(isDebug) debug(`${context.type} app.service('${context.path}').${context.method}(). `, 'No accounts');
        return record;
      }
    };

    let newRecords = [];

    if (Array.isArray(records)) {
      records.forEach(record => {
        newRecords.push(getProfileData(record));
      });
      if (isLog && isAccount) inspector('newRecords:', newRecords);
      replaceItems(context, newRecords);
    } else {
      const newRecord = getProfileData(records);
      if (isLog && isAccount) inspector('newRecords:', newRecords);
      replaceItems(context, newRecord);
    }

    // Place the modified records back in the context.
    // replaceItems(context, newRecords);
    // Best practice: hooks should always return the context.
    return context;
  };
};
