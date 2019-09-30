
const { Verifier } = require('@feathersjs/authentication-oauth2');
// const isArray = require('lodash/isArray');
const {inspector} = require('../lib');
const debug = require('debug')('app:plugins.auth.verifiers');

const isLog = false;
const isDebug = false;

class Oauth2Verifier extends Verifier {

  constructor (app, options = {}) {
    options.emailField = options.emailField || 'email';
    super(app, options);
  }

  verify (req, accessToken, refreshToken, profile, done) {
    if(isDebug) debug('<<verifiers>> Start verifiers');
    if(isDebug) debug('Checking credentials');
    const options = this.options;
    const query = {
      $or: [
        { [options.idField]: profile.id },
        { [options.emailField]: {$in: profile.emails.map(emailObj => emailObj.value)} }
      ],
      $limit: 1
    };
    const data = { profile, accessToken, refreshToken };
    let existing;

    // Check request object for an existing entity
    if (req && req[options.entity]) {
      existing = req[options.entity];
    }

    // Check the request that came from a hook for an existing entity
    if (!existing && req && req.params && req.params[options.entity]) {
      existing = req.params[options.entity];
    }

    // If there is already an entity on the request object (ie. they are
    // already authenticated) attach the profile to the existing entity
    // because they are likely "linking" social accounts/profiles.
    if (existing) {
      return this._updateEntity(existing, data)
        .then(entity => {
          if(isLog) inspector('plugins.auth.verifiers.existing.entity:', existing, '; data:', data);
          done(null, entity);
        })
        .catch(error => error ? done(error) : done(null, error));
    }

    // Find or create the user since they could have signed up via facebook.
    if(isDebug) inspector('plugins.auth.verifiers.find.query:', query);
    this.service
      .find({ query })
      .then(this._normalizeResult)
      .then(entity => {
        if(entity){
          if(isLog) inspector('plugins.auth.verifiers.find.entity.updateEntity:', entity, '; data:', data);
          return this._updateEntity(entity, data);
        }else {
          if(isLog) inspector('plugins.auth.verifiers.no.find.entity.createEntity.data:', data);
          return this._createEntity(data);
        }
      })
      .then(entity => {
        if(isLog) inspector('plugins.auth.verifiers.update|create->entity:', entity);
        let id;
        if(Array.isArray(entity)){
          id = entity[0][this.service.id];
        }else {
          id = entity[this.service.id];
        }
        const payload = { [`${this.options.entity}Id`]: id };
        if(isDebug) debug('payload:', payload);
        done(null, entity, payload);
      })
      .catch(error => error ? done(error) : done(null, error));
  }
}

exports.Oauth2Verifier = Oauth2Verifier;
