(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{931:function(t,e,r){"use strict";r.r(e);r(10),r(8),r(6),r(4),r(7);var n=r(0),o=r(26);function c(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}var l={layout:"stand-alone",data:function(){return{title:"".concat(this.$t("error.title"),": 403"),description:this.$t("error.access_denied")}},head:function(){return{title:this.title,meta:[{hid:"description",name:"description",content:this.description}],link:[]}},computed:function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?c(source,!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):c(source).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({},Object(o.c)({config:"getConfig",theme:"getTheme"})),methods:{goHome:function(){this.$router.push({path:this.$i18n.path(this.config.homePath)})}}},h=r(16),d=r(21),m=r.n(d),f=r(276),component=Object(h.a)(l,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"d-flex mx-auto"},[t._m(0),t._v(" "),r("div",{staticClass:"error-box text-center"},[r("h1",{class:"exotic--"+t.theme.name},[t._v("403")]),t._v(" "),r("h2",{class:"exotic--"+t.theme.name+" my-3 headline"},[t._v(t._s(t.$t("error.sorry_access_denied"))+".")]),t._v(" "),r("div",[r("v-btn",{attrs:{color:"primary"},on:{click:t.goHome}},[t._v(t._s(t.$t("error.go_home")))])],1)])])}),[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"mr-3 hidden-sm-and-down"},[e("img",{attrs:{src:"/static/img/error/403.svg",alt:""}})])}],!1,null,null,null);e.default=component.exports;m()(component,{VBtn:f.a})}}]);
//# sourceMappingURL=4bf0befe275f8d358e12.js.map