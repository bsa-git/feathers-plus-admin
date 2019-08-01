
// Class for the custom service `authManagement` on path `/auth-management`. (Can be re-generated.)
/* eslint-disable no-unused-vars */

// !code: imports
//----------------
const authManagement = require('feathers-authentication-management');
const notifier = require('./notifier');
const {inspector} = require('../../plugins/lib');
const debug = require('debug')('app:service.auth-management.class');
//----------------
// !end
// !code: init
//------------
const isLog = false;
const isDebug = false;
//------------
// !end

class Service {
  constructor (options) {
    this.options = options || {};
    // !code: constructor1
    //--------------------
    this.app = this.options.app;
    // Initialize our service with any options it requires
    this.app.configure(authManagement(notifier(this.app)));
    this.authManagement = this.app.service('authManagement');
    if(isDebug) debug('service initialized');
    //--------------------
    // !end
  }

  // !<DEFAULT> code: find
  async find (params) {
    return [];
  }
  // !end

  // !<DEFAULT> code: get
  async get (id, params) {
    return {
      id, text: `A new message with ID: ${id}!`
    };
  }
  // !end

  // !code: create
  //-----------------
  async create (data, params) {
    if (Array.isArray(data)) {
      return Promise.all(data.map(current => this.create(current, params)));
    }
    if(isDebug) debug('service called. action=' + data.action);
    const result = await this.authManagement.create(data);
    if(isLog) inspector('app:service.auth-management.class.create.result:', result);
    return result;
  }
  //-----------------
  // !end

  // !<DEFAULT> code: update
  async update (id, data, params) {
    return data;
  }
  // !end

  // !<DEFAULT> code: patch
  async patch (id, data, params) {
    return data;
  }
  // !end

  // !<DEFAULT> code: remove
  async remove (id, params) {
    return { id };
  }
  // !end
  // !code: more // !end
}

const moduleExports = function (options) {
  return new Service(options);
};

moduleExports.Service = Service;

// !code: exports // !end
module.exports = moduleExports;

// !code: funcs // !end
// !code: end // !end
