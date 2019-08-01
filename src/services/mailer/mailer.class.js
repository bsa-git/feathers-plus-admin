
// Class for the custom service `mailer` on path `/mailer`. (Can be re-generated.)
/* eslint-disable no-unused-vars */

// !code: imports
//---------------
const Mailer = require('feathers-mailer');
const smtpTransport = require('nodemailer-smtp-transport');
const {inspector} = require('../../plugins/lib');
const debug = require('debug')('app:service.mailer.class');
//---------------
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
    this.app = this.options.app;
    this.app.use('/feathers-mailer', Mailer(smtpTransport(this.options.mailer)));
    this.feathersMailer = this.app.service('feathers-mailer');
    if(isDebug)debug('constructor.options.mailer:', this.options.mailer);
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
  async create (data, params) {
    if (Array.isArray(data)) {
      return Promise.all(data.map(current => this.create(current, params)));
    }
    const result = await this.feathersMailer.create(data);
    if(isLog) inspector('app:service.mailer.class.create.result:', result);
    return result;
  }
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
