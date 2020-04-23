'use strict';

import 'highlight.js/styles/hybrid.css';// agate.css, a11y-dark.css, androidstudio.css, gml.css, gruvbox-dark.css

class Highlight {
  constructor(lang = '', options) {
    this.hljs = null;
    this.language = '';
    if(lang){
      this.hljs = require('highlight.js/lib/highlight');
      this.language = require(`highlight.js/lib/languages/${lang}`);
      this.hljs.registerLanguage(lang, this.language);
    }else {
      this.hljs = require('highlight.js');
    }

    const _options = options ? options : {};
    this.hljs.configure(_options);
  }

  initBlock(query) {
    const _query = query ? query : '.hljs';
    const $els = document.querySelectorAll(_query);
    if ($els.length > 0) {
      for (let i = 0, len = $els.length; i < len; i++) {
        const $el =  $els[i];
        this.hljs.highlightBlock($el);
      }
    }
  }

  addEventListener(query) {
    document.addEventListener('DOMContentLoaded', () => {
      if(query){
        this.initBlock(query);
      }else {
        this.init();
      }

    });
  }

  init() {
    this.hljs.initHighlighting();
  }

  static initBlockStatic(query) {
    const hljs = require('highlight.js');
    const _query = query ? query : '.hljs';
    const $els = document.querySelectorAll(_query);
    if ($els.length > 0) {
      for (let i = 0, len = $els.length; i < len; i++) {
        const $el =  $els[i];
        hljs.highlightBlock($el);
      }
    }
  }

  static initStatic() {
    const hljs = require('highlight.js');
    hljs.initHighlighting();
  }

  static addEventListenerStatic(query) {
    document.addEventListener('DOMContentLoaded', () => {
      if(query){
        Highlight.initBlock(query);
      }else {
        Highlight.init();
      }

    });
  }
}


export default Highlight;
