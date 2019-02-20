'use strict';

import useragent from 'express-useragent';
import LocationHelper from '~/plugins/lib/location-helper.class';
import axios from 'axios';
// const debug = require('debug')('app:plugin.HttpBox');

/**
 * HttpBox class
 *
 var location = document.createElement("a");
 location.href = url ? url : window.location.href;
 // Props of LocationHelper
 this.url = location.href.split('?')[0];
 this.hash = location.hash;
 this.host = location.host;
 this.hostname = location.hostname;
 this.href = location.href;
 this.origin = location.origin;
 this.pathname = location.pathname;
 this.port = location.port;
 this.protocol = location.protocol;
 this.search = location.search;
 this.source = location;
 // Methods of LocationHelper
 this.mergeParams(params);
 this.setParams(params);
 this.getParams(name);
 this.removeParams(params)
 */
class HttpBox extends LocationHelper {
  constructor(url) {
    super(url);
    this.pathname = this.pathname.replace(/^(\/*)|(\/*)$/g, '');
  }

  static httpCodes() {
    return {
      100: 'Continue',
      101: 'Switching Protocols',
      200: 'OK',
      201: 'Created',
      202: 'Accepted',
      203: 'Non-Authoritative Information',
      204: 'No Content',
      205: 'Reset Content',
      206: 'Partial Content',
      300: 'Multiple Choices',
      301: 'Moved Permanently',
      302: 'Found',
      303: 'See Other',
      304: 'Not Modified',
      305: 'Use Proxy',
      306: '(Unused)',
      307: 'Temporary Redirect',
      400: 'Bad Request',
      401: 'Unauthorized',
      402: 'Payment Required',
      403: 'Forbidden',
      404: 'Not Found',
      405: 'Method Not Allowed',
      406: 'Not Acceptable',
      407: 'Proxy Authentication Required',
      408: 'Request Timeout',
      409: 'Conflict',
      410: 'Gone',
      411: 'Length Required',
      412: 'Precondition Failed',
      413: 'Request Entity Too Large',
      414: 'Request-URI Too Long',
      415: 'Unsupported Media Type',
      416: 'Requested Range Not Satisfiable',
      417: 'Expectation Failed',
      500: 'Internal Server Error',
      501: 'Not Implemented',
      502: 'Bad Gateway',
      503: 'Service Unavailable',
      504: 'Gateway Timeout',
      505: 'HTTP Version Not Supported'
    };
  }

  static mimeTypes() {
    return {
      txt: 'text/plain',
      htm: 'text/html',
      html: 'text/html',
      php: 'text/html',
      css: 'text/css',
      js: 'application/javascript',
      json: 'application/json',
      xml: 'application/xml',
      swf: 'application/x-shockwave-flash',
      flv: 'video/x-flv',
      // images
      png: 'image/png',
      jpe: 'image/jpeg',
      jpeg: 'image/jpeg',
      jpg: 'image/jpeg',
      gif: 'image/gif',
      bmp: 'image/bmp',
      ico: 'image/vnd.microsoft.icon',
      tiff: 'image/tiff',
      tif: 'image/tiff',
      svg: 'image/svg+xml',
      svgz: 'image/svg+xml',
      // archives
      zip: 'application/zip',
      rar: 'application/x-rar-compressed',
      exe: 'application/x-msdownload',
      msi: 'application/x-msdownload',
      cab: 'application/vnd.ms-cab-compressed',
      // audio/video
      mp3: 'audio/mpeg',
      qt: 'video/quicktime',
      mov: 'video/quicktime',
      // adobe
      pdf: 'application/pdf',
      psd: 'image/vnd.adobe.photoshop',
      ai: 'application/postscript',
      eps: 'application/postscript',
      ps: 'application/postscript',
      // ms office
      doc: 'application/msword',
      rtf: 'application/rtf',
      xls: 'application/vnd.ms-excel',
      ppt: 'application/vnd.ms-powerpoint',
      // open office
      odt: 'application/vnd.oasis.opendocument.text',
      ods: 'application/vnd.oasis.opendocument.spreadsheet'
    };
  }

  static getHttpCode(code) {
    return HttpBox.httpCodes()[code];
  }

  static getMimeType(type) {
    return HttpBox.mimeTypes()[type];
  }

  static getUserAgent() {
    if (process.client) {
      return useragent.parse(navigator.userAgent);
    } else {
      return null;
    }
  }

  /**
   * Get info location
   * @param url String
   */
  getInfoLocation(url) {
    const location = new LocationHelper(url);
    return location;
  }

  /**
   * Get method for axios
   * @param url String
   * @param config Object
   * @return {Promise.<void>}
   */
  async get(url, config) {
    try {
      const configDefault = {
        // headers: {'X-Requested-With': 'XMLHttpRequest'}
      };

      const _config = Object.assign(configDefault, config);
      const response = await axios.get(url, _config);
      if (response.statusText !== 'OK') {
        throw new Error(`HttpBox.get Error: Network response was not OK; url: '${url}'; config: `, _config);
      }
      const contentType = response.headers['content-type'];
      if (contentType && contentType.includes('application/json')) {
        return response.data;
      } else {
        throw new TypeError(`HttpBox.get Error:  we haven't got JSON;  url: '${url}'; config: `, _config);
      }
    } catch (ex) {
      this.axiosError(ex);
    }
  }

  /**
   * Post method for axios
   * @param url String
   * @param data
   * @param config Object
   * @return {Promise.<void>}
   */
  async post(url, data, config) {
    try {
      const configDefault = {};
      const _config = Object.assign(configDefault, config);
      const response = await axios.post(url, data, _config);
      if (response.statusText !== 'Created') {
        throw new Error(`HttpBox.post Error: Network response was not OK; url: '${url}'; config: `, _config);
      }
      const contentType = response.headers['content-type'];
      if (contentType && contentType.includes('application/json')) {
        return response.data;
      } else {
        throw new TypeError(`HttpBox.post Error:  we haven't got JSON;  url: '${url}'; config: `, _config);
      }
    } catch (ex) {
      this.axiosError(ex);
    }
  }

  /**
   * Put method for axios
   * @param url String
   * @param data
   * @param config Object
   * @return {Promise.<void>}
   */
  async put(url, data, config) {
    try {
      const configDefault = {};
      const _config = Object.assign(configDefault, config);
      const response = await axios.put(url, data, _config);
      if (response.statusText !== 'OK') {
        throw new Error(`HttpBox.put Error: Network response was not OK; url: '${url}'; config: `, _config);
      }
      const contentType = response.headers['content-type'];
      if (contentType && contentType.includes('application/json')) {
        return response.data;
      } else {
        throw new TypeError(`HttpBox.put Error:  we haven't got JSON;  url: '${url}'; config: `, _config);
      }
    } catch (ex) {
      this.axiosError(ex);
    }
  }

  /**
   * Patch method for axios
   * @param url String
   * @param data
   * @param config Object
   * @return {Promise.<void>}
   */
  async patch(url, data, config) {
    try {
      const configDefault = {};
      const _config = Object.assign(configDefault, config);
      const response = await axios.patch(url, data, _config);
      if (response.statusText !== 'OK') {
        throw new Error(`HttpBox.patch Error: Network response was not OK; url: '${url}'; config: `, _config);
      }
      const contentType = response.headers['content-type'];
      if (contentType && contentType.includes('application/json')) {
        return response.data;
      } else {
        throw new TypeError(`HttpBox.patch Error:  we haven't got JSON;  url: '${url}'; config: `, _config);
      }
    } catch (ex) {
      this.axiosError(ex);
    }
  }

  /**
   * Delete method for axios
   * @param url String
   * @param config Object
   * @return {Promise.<void>}
   */
  async delete(url, config) {
    try {
      const configDefault = {};
      const _config = Object.assign(configDefault, config);
      const response = await axios.delete(url, _config);
      if (response.statusText !== 'OK') {
        throw new Error(`HttpBox.delete Error: Network response was not OK; url: '${url}'; config: `, _config);
      }
      const contentType = response.headers['content-type'];
      if (contentType && contentType.includes('application/json')) {
        return response.data;
      } else {
        throw new TypeError(`HttpBox.delete Error:  we haven't got JSON;  url: '${url}'; config: `, _config);
      }
    } catch (ex) {
      this.axiosError(ex);
    }
  }

  axiosError(error) {
    console.log('Error.message: ', error.message);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const contentType = error.response.headers['content-type'];
      if (contentType && contentType.includes('application/json')) {
        error.response_data = error.response.data ? JSON.stringify(error.response.data, '', 2) : '';
      }
      error.headers = JSON.stringify(error.response.headers, '', 2);
      error.status = error.response.status;
      error.statusText = error.response.statusText;
      error.request_info = JSON.stringify({
        url: error.response.config.url,
        method: error.response.config.method
      }, '', 2);
      console.log('Error.request.info: ', error.request_info);
      console.log('Error.response.status: ', error.response.status);
      console.log('Error.response.statusText: ', error.response.statusText);
      console.log('Error.response.headers: ', error.response.headers);
      if (error.response_data) {
        console.log('Error.response.data: ', error.response.data);
      }
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log('Error.request: ', error.request);
    }
    throw error;
  }
}

export default HttpBox;
