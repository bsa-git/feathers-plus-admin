(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{937:function(t,e,r){'use strict';r.r(e);r(10),r(8),r(6),r(4),r(7);var n=r(0),o=r(26);function c(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable;}))),e.push.apply(e,r);}return e;}var h={layout:'stand-alone',data:function(){return{title:''.concat(this.$t('error.title'),': 404'),description:this.$t('error.page_not_found')};},head:function(){return{title:this.title,meta:[{hid:'description',name:'description',content:this.description}]};},computed:function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?c(source,!0).forEach((function(e){Object(n.a)(t,e,source[e]);})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):c(source).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e));}));}return t;}({},Object(o.c)({config:'getConfig',theme:'getTheme'})),methods:{goHome:function(){this.$router.push({path:this.$i18n.path(this.config.homePath)});}}},l=r(16),f=r(21),m=r.n(f),d=r(276),component=Object(l.a)(h,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r('div',{staticClass:'error-box text-center mx-auto'},[r('h1',{class:'exotic--'+t.theme.name},[t._v('404')]),t._v(' '),r('h2',{class:'exotic--'+t.theme.name+' my-3 headline'},[t._v(t._s(t.$t('error.sorry_page_not_found'))+'.')]),t._v(' '),r('div',[r('v-btn',{attrs:{color:'primary'},on:{click:t.goHome}},[t._v(t._s(t.$t('error.go_home')))])],1)]);}),[],!1,null,null,null);e.default=component.exports;m()(component,{VBtn:d.a});}}]);
//# sourceMappingURL=3fa4b4bd73bb562f1831.js.map