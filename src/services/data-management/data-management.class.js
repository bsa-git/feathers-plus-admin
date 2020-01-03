
// Class for the custom service `dataManagement` on path `/data-management`. (Can be re-generated.)
/* eslint-disable no-unused-vars */

// !code: imports
//---------------
const controller = require('./controller');
const {inspector} = require('../../plugins/lib');
//---------------
// !end
// !code: init // !end

class Service {
  constructor (options) {
    this.options = options || {};
    // !code: constructor1
    //--------------------
    // if(isDebug) debug('Service.constructor.options:', options);
    this.app = this.options.app;
    // Initialize our service with any options it requires
    this.app.configure(controller());
    this.dataManagement = this.app.service('dataManagement');
    // if(isDebug) debug('constructor initialized');
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
  //---------------
  async create (data, params) {
    if (Array.isArray(data)) {
      return Promise.all(data.map(current => this.create(current, params)));
    }
    const result = await this.dataManagement.create(data);
    return result;
  }
  //---------------
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
