'use strict';

import 'highlight.js/styles/a11y-dark.css';

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
}


export default Highlight;
