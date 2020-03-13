// const loConcat = require('lodash/concat');
const {checkContext, getItems, replaceItems} = require('feathers-hooks-common');
const errors = require('@feathersjs/errors');
const {inspector, isObject} = require('../lib');
const chalk = require('chalk');
const debug = require('debug')('app:hook-helper.class');

const isLog = false;
const isDebug = false;

class HookHelper {
  /**
   * Constructor
   * @param context
   */
  constructor(context) {
    // Throw if the hook is being called from an unexpected location.
    checkContext(context, null, ['find', 'get', 'create', 'update', 'patch', 'remove']);
    // Get context
    this.context = Object.assign({}, context);
    // context.app is a read only property that contains the Feathers application object.
    // This can be used to retrieve other services (via context.app.service('name')) or configuration values
    this.app = this.context.app;
    // context.service is a read only property and contains the service this hook currently runs on
    this.contextService = this.context.service ? this.context.service : null;
    // context.id is a writeable property and the id for a get, remove, update and patch service method call
    this.contextId = this.context.id;
    // context.path is a read only property and contains the service name (or path) without leading or trailing slashes
    this.contextPath = this.context.path;
    // context.method is a read only property with the name of the service method (one of find, get, create, update, patch, remove)
    this.contextMethod = this.context.method;
    // context.type is a read only property with the hook type (one of before, after or error)
    this.contextType = this.context.type;
    // context.params is a writeable property that contains the service method parameters
    this.contextParams = this.context.params? this.context.params : null;
    // Get the authenticated user.
    this.contextUser = (this.contextParams && this.contextParams.user)? this.contextParams.user : null;
    // Get context.params.authenticated
    this.contextAuthenticated = this.contextParams && this.contextParams.authenticated? this.contextParams.authenticated : null;
    // Get contextParams.payload
    this.contextPayload = this.contextParams && this.contextParams.payload? this.contextParams.payload : null;
    // Get the record(s) from context.data (before), context.result.data or context.result (after).
    // getItems always returns an array to simplify your processing.
    this.contextRecords = getItems(this.context);
    // context.data is a writeable property containing the data of a create, update and patch service method call
    this.contextData = this.context.data ? this.context.data : null;
    // context.result is a writeable property containing the result of the successful service method call.
    // It is only available in after hooks.
    this.contextResult = this.context.result ? this.context.result : null;
    // Get contextResult.accessToken
    this.contextAccessToken = this.contextResult && this.contextResult.accessToken? this.contextResult.accessToken : '';
    // context.dispatch is a writeable, optional property and contains a "safe" version of the data that should be sent to any client.
    // If context.dispatch has not been set context.result will be sent to the client instead
    this.contextDispatch = this.context.dispatch ? this.context.dispatch : null;
    // context.statusCode is a writeable, optional property that allows to override the standard HTTP status code that should be returned.
    this.contextStatusCode = this.context.statusCode;
    // context.error is a writeable property with the error object that was thrown in a failed method call. It is only available in error hooks.
    // Note: context.error will only be available if context.type is error.
    this.contextError = this.context.error ? this.context.error : null;
    // Get provider
    this.contextProvider = this.contextParams && this.contextParams.provider ? this.contextParams.provider : '';
    // Get normalize hook context
    // this.hookContext = getHookContext(this.context);
    this.hookContext = HookHelper.getHookContext(this.context);
  }


  /**
   * Is mask
   * @param mask // 'authentication.create.after'
   */
  isMask(mask = '') {
    const maskItems = mask.split('.');
    return (maskItems[0] === this.contextPath) && (maskItems[1] === this.contextMethod) && (maskItems[2] === this.contextType);
  }

  /**
   * Show debug info
   * @param mask // 'authentication.create.after'
   * @param show
   */
  showDebugInfo(mask = '', show = true) {
    if (this.contextError) return;
    if (mask) {
      const maskItems = mask.split('.');
      if (show && (maskItems[0] === this.contextPath) && (maskItems[1] === this.contextMethod) && (maskItems[2] === this.contextType)) {
        inspector(`showDebugInfo::${mask}:`, this.hookContext);
      }
    } else {
      if (show) {
        inspector('showDebugInfo:', this.hookContext);
      }
    }

  }

  /**
   * Show debug records
   * @param mask // 'authentication.create.after'
   * @param show
   */
  showDebugRecords(mask = '', show = true) {
    if (this.contextError) return;
    if (mask) {
      const maskItems = mask.split('.');
      if (show && (maskItems[0] === this.contextPath) && (maskItems[1] === this.contextMethod) && (maskItems[2] === this.contextType)) {
        inspector(`showDebugRecords::${mask}:`, this.contextRecords);
      }
    } else {
      if (show) inspector('showDebugRecords:', this.contextRecords);
    }

  }

  /**
   * Show debug error
   */
  showDebugError() {
    if (this.contextError) {
      const _contextError = this.getDebugError();
      console.error(chalk.red(`ErrorMessage: ${this.contextError.message}`), _contextError);
    }
  }

  /**
   * Get debug error
   */
  getDebugError() {
    let result = null;
    if (this.contextError) {
      const _contextError = Object.assign({}, this.contextError);
      _contextError.service = _contextError.hook ? `${_contextError.hook.path}.${_contextError.hook.method}.${_contextError.hook.type}` : 'error';
      if (_contextError.app) delete _contextError.app;
      if (_contextError.hook) delete _contextError.hook;
      if (_contextError.message) delete _contextError.message;
      if (_contextError.className) delete _contextError.className;
      if (_contextError.data && !Object.keys(_contextError.data).length) delete _contextError.data;
      if (_contextError.errors && !Object.keys(_contextError.errors).length) delete _contextError.errors;
      result = _contextError;
    }
    return result;
  }

  /**
   * Get id field
   * @param items {Array || Object}
   * @return {string}
   */
  static getIdField(items) {
    let idField = '';
    if (Array.isArray(items) && items.length) {
      idField = 'id' in items[0] ? 'id' : '_id';
    }
    if (isObject(items) && Object.keys(items).length) {
      idField = 'id' in items ? 'id' : '_id';
    }
    return idField ? idField : new errors.GeneralError('Items argument is not an array or object');
  }

  static getHookContext(context) {
    let target = {};
    let {path, method, type, params, id, data, result, /*dispatch,*/ statusCode, grapql} = context;

    if (path) target.path = path;
    if (method) target.method = method;
    if (type) target.type = type;
    if (params) {
      if (params.connection) {
        delete params.connection;
      }
      target.params = params;
    }
    if (id) target.id = id;
    if (data && type === 'before') target.data = data;
    if (result) target.result = result;
    // if (dispatch) target.dispatch = dispatch;
    if (statusCode) target.statusCode = statusCode;
    // if (error) target.error = error;
    if (grapql) target.grapql = grapql;
    return Object.assign({}, target);
  }

  static getGraphQLContext(context) {
    let target = {};
    let {batchLoaders, cache, provider, authenticated, pagination, user,} = context;

    if (batchLoaders) target.batchLoaders = batchLoaders;
    if (cache) target.cache = cache;
    if (provider) target.provider = provider;
    if (authenticated) target.authenticated = authenticated;
    if (pagination) target.pagination = pagination;
    if (user) target.user = user;
    return Object.assign({}, target);
  }

  /**
   * Merge items
   * @param records {Array || Object}
   * @param source {Object}
   * @return {Array || Object}
   */
  static mergeItems(records, source = {}) {
    let _records;
    if(Array.isArray(records)){
      _records = records.map(record => Object.assign({}, record, source));
    }else {
      _records = Object.assign({}, records, source);
    }
    return _records;
  }

  /**
   * Merge records
   * @param source {Object}
   */
  mergeRecords(source = {}) {
    if(Array.isArray(this.contextRecords)){
      this.contextRecords.forEach(record => Object.assign(record, source));
    }else {
      Object.assign(this.contextRecords, source);
    }
  }

  /**
   * Get pick records
   * @param fn
   * @return {Array||Object}
   */
  getPickRecords(fn) {
    let _records;
    if(Array.isArray(this.contextRecords)){
      this.contextRecords.forEach(record => fn(record));
      _records = records.map(record => fn(record));
    }else {
      _records = fn(this.contextRecords);
    }
    return _records;
  }

  /**
   * For each records
   * @param fn {Function}
   * @return {Promise.<void>}
   */
  async forEachRecords(fn) {
    if(Array.isArray(this.contextRecords)){
      this.contextRecords.forEach(async record => await fn(record));
    }else {
      await fn(this.contextRecords);
    }
  }

  /**
   * Replace records for context
   * @return {HookHelper}
   */
  replaceRecordsForContext(){
    // Place the modified records back in the context.
    replaceItems(this.context, this.contextRecords);
    return this;
  }

  /**
   * Get item
   * @param path
   * @param id
   * @return {Promise.<*>}
   */
  async getItem(path = '', id = null) {
    const service = this.app.service(path);
    if (service) {
      const getResult = await service.get(id);
      if (isLog) inspector(`getItem(path='${path}', id='${id}').getResult:`, getResult);
      return getResult;
    } else {
      throw new errors.BadRequest(`There is no service for the path - '${path}'`);
    }
  }

  /**
   * Find items
   * @param path
   * @param query
   * @return {Promise.<*>}
   */
  async findItems(path = '', query = {}) {
    const service = this.app.service(path);
    if (service) {
      let findResults = await service.find({query: query});
      findResults = (query['$limit'] === 0) ? findResults.total : findResults.data;
      if (isLog) inspector(`findItems(path='${path}', query=${JSON.stringify(query)}).findResults:`, findResults);
      return findResults;
    } else {
      throw new errors.BadRequest(`There is no service for the path - '${path}'`);
    }
  }

  /**
   * Find all items
   * @param path
   * @param query
   * @return {Promise.<*>}
   */
  async findAllItems(path = '', query = {}) {
    const service = this.app.service(path);
    if (service) {
      const newQuery = Object.assign(query, {$limit: null});
      let findResults = await service.find({query: newQuery});
      findResults = findResults.data;
      if (isLog) inspector(`findItems(path='${path}', query=${JSON.stringify(newQuery)}).findResults:`, findResults);
      return findResults;
    } else {
      throw new errors.BadRequest(`There is no service for the path - '${path}'`);
    }
  }

  /**
   * Get count items
   * @param path
   * @param query
   * @return {Promise.<*>}
   */
  async getCountItems(path = '', query = {}) {
    const service = this.app.service(path);
    if (service) {
      const newQuery = Object.assign(query, {$limit: 0});
      let findResults = await service.find({query: newQuery});
      findResults = findResults.total;
      if (isDebug) inspector(`getCountItems(path='${path}', query=${JSON.stringify(newQuery)}).findResults:`, findResults);
      return findResults;
    } else {
      throw new errors.BadRequest(`There is no service for the path - '${path}'`);
    }
  }

  /**
   * Remove items
   * @param path
   * @param query
   * @return {Promise.<*>}
   */
  async removeItems(path = '', query = {}) {
    const service = this.app.service(path);
    if (service) {
      const removeResults = await service.remove(null, {query: query});
      if (isLog) inspector(`removeItems(path='${path}', query=${JSON.stringify(query)}).removeResults:`, removeResults);
      return removeResults;
    } else {
      throw new errors.BadRequest(`There is no service for the path - '${path}'`);
    }
  }

  /**
   * Remove item
   * @param path
   * @param id
   * @return {Promise.<*>}
   */
  async removeItem(path = '', id = null) {
    const service = this.app.service(path);
    if (service) {
      const removeResult = await service.remove(id);
      if (isLog) inspector(`removeItem(path='${path}', id=${id}).removeResult:`, removeResult);
      return removeResult;
    } else {
      throw new errors.BadRequest(`There is no service for the path - '${path}'`);
    }
  }

  /**
   * Patch items
   * @param path
   * @param data
   * @param query
   * @return {Promise.<*>}
   */
  async patchItems(path = '', data = {}, query = {}) {
    const service = this.app.service(path);
    if (service) {
      const patchResults = await service.patch(null, data, {query: query});
      if (isLog) inspector(`patchItems(path='${path}', data=${JSON.stringify(data)}, query=${JSON.stringify(query)}).patchResults:`, patchResults);
      return patchResults;
    } else {
      throw new errors.BadRequest(`There is no service for the path - '${path}'`);
    }
  }

  /**
   * Create item
   * @param path
   * @param data
   * @return {Promise.<*>}
   */
  async createItem(path = '', data = {}) {
    const service = this.app.service(path);
    if (service) {
      const createResults = await service.create(data);
      if (isLog) inspector(`createItem(path='${path}', data=${JSON.stringify(data)}).createResults:`, createResults);
      return createResults;
    } else {
      throw new errors.BadRequest(`There is no service for the path - '${path}'`);
    }
  }

  /**
   * Relationship check
   * @param path
   * @param id
   * @return {Promise.<void>}
   */
  async validateRelationship(path = '', id = null) {
    const result = await this.getItem(path, id.toString());
    if (isLog) inspector(`validateRelationship(path='${path}', id='${id}').result:`, result);
    if (!result) {
      throw new errors.BadRequest(`There is no entry in the service('${path}') for id: '${id}'`);
    }
  }

  /**
   * Restrict service max rows
   * @param servicePath
   * @param maxRows
   * @return {Promise.<void>}
   */
  async restrictMaxRows(servicePath = '', maxRows = -1) {
    let findResults = await this.findItems(servicePath, {$limit: 0});
    if (isDebug) debug(`after.log-messages.create: (${findResults}) records have been find from the "${servicePath}" service`);
    if (findResults > maxRows) {
      const idField = HookHelper.getIdField(this.contextRecords);
      findResults = await this.findItems(servicePath, {
        $limit: null,
        $skip: maxRows,
        $sort: {createdAt: -1},
        $select: [idField]
      });
      findResults = findResults.map(item => item[idField]);
      if (isDebug) debug('findResults:', findResults.length, findResults);
      let removeResults = await this.removeItems(servicePath, {[idField]: {$in: findResults}});
      if (isDebug) debug('removeResults:', removeResults.length, removeResults);
      return removeResults;
    }
  }

  /**
   * Uniqueness check
   * @param query
   * @return {Promise.<void>}
   */
  async validateUnique(servicePath = '', query = {}){
    let results = await this.getCountItems(servicePath, query);
    if (isDebug) debug(`validateUnique(servicePath='${servicePath}', query=${JSON.stringify(query)}).results:`, results);
    // debug(`validateUnique(servicePath='${servicePath}', query=${JSON.stringify(query)}).results:`, results);
    if (results) {
      throw new errors.BadRequest('Values must be unique');
    }
  }

}

module.exports = HookHelper;
