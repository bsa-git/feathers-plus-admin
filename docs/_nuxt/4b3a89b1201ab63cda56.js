(window.webpackJsonp=window.webpackJsonp||[]).push([[48,27],{1164:function(t,e,r){'use strict';r.r(e);r(10),r(8),r(6),r(4),r(7);var n=r(0),o=(r(52),r(9)),c=r(26),h=r(940),l=r(156),f=r(278);function d(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable;}))),e.push.apply(e,r);}return e;}function m(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?d(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e]);})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):d(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e));}));}return t;}r(20)('app:page.user-change');var O,w={components:{PageTopBar:h.a},data:function(){return{title:this.$t('authManagement.titleIdentityChange'),description:this.$t('authManagement.descriptionIdentityChange')};},head:function(){return{title:this.title,meta:[{hid:'description',name:'description',content:this.description}]};},created:(O=Object(o.a)(regeneratorRuntime.mark((function t(){var e,r,n,o;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,e=new f.a,r=e.getParams('token'),t.next=7,l.a.verifySignupLong(r);case 7:(n=t.sent)?(this.showSuccess(this.$t('authManagement.successfulUserVerification')),this.isAuth?this.$redirect(this.config.homePath):(o=f.a.urlEncode(n.email),this.$redirect('/user/login?email='.concat(o)))):(this.showError(this.$t('authManagement.errorUserVerification')),this.$redirect(this.config.homePath)),t.next=16;break;case 11:t.prev=11,t.t0=t.catch(0),this.error=t.t0,'User not found.'===t.t0.message?this.showError(this.$t('authManagement.msgForErrorUserNotFind')):this.showError(t.t0.message);case 16:case'end':return t.stop();}}),t,this,[[0,11]]);}))),function(){return O.apply(this,arguments);}),computed:m({},Object(c.c)({config:'getConfig',isAuth:'isAuth'})),methods:m({},Object(c.d)({showSuccess:'SHOW_SUCCESS',showError:'SHOW_ERROR'}))},v=r(16),component=Object(v.a)(w,(function(){var t=this.$createElement;return(this._self._c||t)('page-top-bar',{attrs:{'page-title':this.description}});}),[],!1,null,null,null);e.default=component.exports;},1541:function(t,e,r){'use strict';r.r(e);var n=r(1164).default,o=r(16),component=Object(o.a)(n,void 0,void 0,!1,null,null,null);e.default=component.exports;},940:function(t,e,r){'use strict';r(19);var n={components:{AppPageTitle:r(287).a},props:{pageTitle:String,size:{type:Number,default:80},color:{type:String,default:'primary'}}},o=r(16),c=r(21),h=r.n(c),l=r(233),component=Object(o.a)(n,(function(){var t=this.$createElement,e=this._self._c||t;return e('div',{staticClass:'text-center'},[this.pageTitle?e('app-page-title',{attrs:{'page-title':this.pageTitle}}):this._e(),this._v(' '),e('v-progress-circular',{staticClass:'mt-5',attrs:{size:this.size,color:this.color,indeterminate:''}})],1);}),[],!1,null,null,null);e.a=component.exports;h()(component,{VProgressCircular:l.a});}}]);
//# sourceMappingURL=4b3a89b1201ab63cda56.js.map