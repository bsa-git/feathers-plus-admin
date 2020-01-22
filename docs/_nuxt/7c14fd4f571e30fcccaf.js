(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{1073:function(t,e,n){'use strict';n(273);var r=n(274);e.a=Object(r.a)('flex');},1516:function(t,e,n){'use strict';n.r(e);n(10),n(8),n(6),n(4),n(7),n(40),n(44),n(52);var r=n(9),o=n(0),l=n(26),c=n(278),d=n(156),h=n(285),m=n(943),v=n(956);function f(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable;}))),e.push.apply(e,n);}return e;}function w(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?f(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e]);})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):f(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e));}));}return t;}var x,y,_,O,k,$=n(20)('app:user.login'),S={layout:'user',$_veeValidate:{validator:'new'},components:{ConfirmDialog:m.a,InputCodeDialog:v.a,InputEmailDialog:v.a},data:function(){return{title:this.$t('login.title'),description:this.$t('login.description'),loadingSubmit:!1,loadingLogout:!1,confirmDialog:!1,inputCodeDialog:!1,inputEmailDialog:!1,verifyCode:'',error:void 0,model:{email:'',password:'',avatar:''}};},head:function(){return{title:this.title,meta:[{hid:'description',name:'description',content:this.description}]};},created:function(){this.user?(this.model.avatar=this.user.avatar,this.model.email=this.user.email,this.model.password=''):this.initModel();},computed:w({},Object(l.c)({config:'getConfig'}),{},Object(l.e)('auth',['user'])),methods:w({initModel:function(){var t=(new c.a).getParams('email');t=t?c.a.urlDecode(t):'';h.users[0];this.model.email=t||'',this.model.password='';},onSubmit:(k=Object(r.a)(regeneratorRuntime.mark((function t(){var e,n=this;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return $('<<onSubmit>> Start onSubmit'),this.dismissError(),t.next=4,this.$validator.validateAll();case 4:if(!this.$validator.errors.any()){t.next=8;break;}this.showError({text:this.$t('form.validationError'),timeout:1e4}),t.next=13;break;case 8:return this.loadingSubmit=!0,t.next=11,this.login(this.model.email,this.model.password);case 11:(e=t.sent)&&e.accessToken&&(this.model.avatar||(this.model.avatar=this.user.avatar),$('loginResponse:',e),this.showSuccess(''.concat(this.$t('login.success'),'!')),setTimeout((function(){n.$router.push(n.$i18n.path(n.config.homePath));}),1e3));case 13:case'end':return t.stop();}}),t,this);}))),function(){return k.apply(this,arguments);}),login:(O=Object(r.a)(regeneratorRuntime.mark((function t(e,n){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,$('<<login>> Start login'),t.next=4,this.authenticate({strategy:'local',email:e,password:n});case 4:return t.abrupt('return',t.sent);case 7:t.prev=7,t.t0=t.catch(0),$('authenticate.error:',t.t0),this.loadingSubmit=!1,this.error=t.t0,'User\'s email is not yet verified.'===t.t0.message?(this.showError({text:this.$t('authManagement.msgForErrorEmailNotYetVerified'),timeout:1e4}),this.confirmDialog=!0):'\'user\' record in the database is missing a \'password\''===t.t0.message?this.showError({text:this.$t('login.errAuthenticatedMissingPassword'),timeout:1e4}):this.showError({text:t.t0.message,timeout:1e4});case 13:case'end':return t.stop();}}),t,this,[[0,7]]);}))),function(t,e){return O.apply(this,arguments);}),resendVerifySignup:(_=Object(r.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,$('<<resendVerifySignUp>> Start ResendVerifySignUp'),this.confirmDialog=!1,t.next=5,d.a.resendVerifySignup({email:this.model.email});case 5:t.sent&&($('ResendVerifySignUp - OK'),this.showWarning({text:this.$t('authManagement.resendVerification'),timeout:1e4}),this.inputCodeDialog=!0),t.next=14;break;case 9:t.prev=9,t.t0=t.catch(0),$('resendVerifySignup.error:',t.t0),this.error=t.t0,this.showError({text:t.t0.message,timeout:1e4});case 14:case'end':return t.stop();}}),t,this,[[0,9]]);}))),function(){return _.apply(this,arguments);}),openInputCodeDialog:function(){this.confirmDialog=!1,this.inputCodeDialog=!0;},verifySignupShort:(y=Object(r.a)(regeneratorRuntime.mark((function t(){var e,n,r=this;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,$('<<verifySignUpShort>> Start verifySignUpShort'),this.inputCodeDialog=!1,$('verifySignupShort.verifyCode:',this.verifyCode),e=this.verifyCode,t.next=7,d.a.verifySignupShort(e,{email:this.model.email});case 7:if(!t.sent.isVerified){t.next=16;break;}return this.showSuccess(this.$t('authManagement.successfulUserVerification')),t.next=12,this.login(this.model.email,this.model.password);case 12:(n=t.sent)&&n.accessToken&&($('loginResponse:',n),setTimeout((function(){r.showSuccess(''.concat(r.$t('signup.successSignUpAndLogin'),'!')),r.$router.push(r.$i18n.path(r.config.homePath));}),1e3)),t.next=18;break;case 16:this.showError({text:this.$t('authManagement.errorUserVerification'),timeout:1e4}),this.$redirect(this.config.homePath);case 18:t.next=25;break;case 20:t.prev=20,t.t0=t.catch(0),$('verifySignupShort.error:',t.t0),this.error=t.t0,'User not found.'===t.t0.message?this.showError({text:this.$t('authManagement.msgForErrorUserNotFind'),timeout:1e4}):t.t0.message.includes('Invalid token.')?this.showError({text:this.$t('authManagement.msgForErrorInvalidToken'),timeout:1e4}):this.showError({text:t.t0.message,timeout:1e4});case 25:case'end':return t.stop();}}),t,this,[[0,20]]);}))),function(){return y.apply(this,arguments);}),setVerifyCode:function(t){this.verifyCode=t;},sendResetPwd:(x=Object(r.a)(regeneratorRuntime.mark((function t(){var e=this;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return $('<<sendResetPwd>> Start sendResetPwd'),t.prev=1,t.next=4,d.a.checkUnique({email:this.model.email},'');case 4:this.showError({text:this.$t('authManagement.errorUnregisteredEmail'),timeout:1e4}),t.next=10;break;case 7:if(t.prev=7,t.t0=t.catch(1),'Values already taken.'===t.t0.message)try{this.inputEmailDialog=!1,d.a.sendResetPwd({email:this.model.email}),setTimeout((function(){e.showWarning({text:e.$t('authManagement.sendResetPwdVerification'),timeout:1e4}),e.$router.push(e.$i18n.path(e.config.homePath));}),1e3);}catch(t){$('sendResetPwd.error:',t),this.error=t,this.showError({text:t.message,timeout:1e4});}else $('sendResetPwd.checkUniqueError:',t.t0),this.error=t.t0,this.showError({text:t.t0.message,timeout:1e4});case 10:case'end':return t.stop();}}),t,this,[[1,7]]);}))),function(){return x.apply(this,arguments);}),openInputEmailDialog:function(){this.inputEmailDialog=!0;},setUserEmail:function(t){this.model.email=t;},btnClick:function(){var t=this;this.user?(this.loadingLogout=!0,this.showSuccess(''.concat(this.$t('login.successLogout'),'!')),setTimeout((function(){t.logout(),t.$router.push(t.$i18n.path(t.config.homePath));}),1e3)):this.onClear();},onClear:function(){this.model.password='',this.model.email='',this.$validator.reset(),this.dismissError();},dismissError:function(){this.error=void 0,this.clearError();}},Object(l.d)('auth',{clearError:'clearAuthenticateError'}),{},Object(l.d)({showSuccess:'SHOW_SUCCESS',showError:'SHOW_ERROR',showWarning:'SHOW_WARNING'}),{},Object(l.b)(['authenticate','logout']))},V=n(16),C=n(21),j=n.n(C),E=n(265),D=n(279),P=n(259),A=n(129),I=n(871),R=n(959),T=n(260),B=n(873),M=n(874),z=n(858),component=Object(V.a)(S,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n('div',{staticClass:'main-content'},[n('input-code-dialog',{attrs:{dialog:t.inputCodeDialog,'title-dialog':t.$t('authManagement.titleVerifySignUp'),'label-input':t.$t('authManagement.verificationCode'),'hint-input':t.$t('authManagement.hintEnterSecurityCode'),'validate-type':'numeric','run-action':t.verifySignupShort,'show-error':t.showError},on:{onCloseInputDialog:function(e){t.inputCodeDialog=!1;},onInput:t.setVerifyCode}}),t._v(' '),n('input-email-dialog',{attrs:{dialog:t.inputEmailDialog,'title-dialog':t.$t('authManagement.titleResetPwd'),'label-input':t.$t('authManagement.yourEmail'),'hint-input':t.$t('authManagement.hintResetPwd'),'validate-type':'email','run-action':t.sendResetPwd,'show-error':t.showError},on:{onCloseInputDialog:function(e){t.inputEmailDialog=!1;},onInput:t.setUserEmail}}),t._v(' '),n('confirm-dialog',{attrs:{dialog:t.confirmDialog,'title-dialog':t.$t('authManagement.titleDialog'),'text-dialog':t.$t('authManagement.textDialog'),'run-action':t.resendVerifySignup},on:{onCloseDialog:t.openInputCodeDialog}}),t._v(' '),n('v-row',{attrs:{justify:'center'}},[n('v-col',{attrs:{cols:'12',sm:'8',md:'6',lg:'4'}},[n('v-card',[n('v-card-title',[n('v-icon',{staticClass:'mr-3'},[t._v('mdi-login')]),t._v(' '),n('span',{staticClass:'headline'},[t._v(t._s(t.$t('user_menu.login')))]),t._v(' '),n('v-spacer'),t._v(' '),n('router-link',{staticClass:'close-icon',attrs:{to:t.$i18n.path(t.config.homePath)}},[n('v-icon',[t._v('mdi-close')])],1)],1),t._v(' '),n('v-form',{on:{submit:function(e){return e.preventDefault(),t.onSubmit(e);}}},[n('v-card-text',[n('div',{staticClass:'text-center'},[t.user&&t.model.avatar?n('v-avatar',{attrs:{size:'120'}},[n('img',{attrs:{src:t.model.avatar}})]):n('v-icon',{attrs:{size:'120'}},[t._v('fas fa-user-slash')])],1),t._v(' '),n('v-text-field',{directives:[{name:'validate',rawName:'v-validate',value:'required|email',expression:'\'required|email\''}],attrs:{'append-icon':'mdi-email','error-messages':t.errors.collect('email'),'data-vv-name':'email',label:t.$t('login.email'),hint:t.$t('authManagement.hintLoginEmail'),'persistent-hint':''},model:{value:t.model.email,callback:function(e){t.$set(t.model,'email',e);},expression:'model.email'}}),t._v(' '),n('v-text-field',{directives:[{name:'validate',rawName:'v-validate',value:'required|min:3',expression:'\'required|min:3\''}],attrs:{'append-icon':'mdi-lock','error-messages':t.errors.collect('password'),'data-vv-name':'password',label:t.$t('login.password'),type:'password'},model:{value:t.model.password,callback:function(e){t.$set(t.model,'password',e);},expression:'model.password'}}),t._v(' '),t.user?t._e():n('div',[n('v-icon',[t._v('mdi-security')]),t._v(' '),n('a',{attrs:{href:'#'},on:{click:t.openInputEmailDialog}},[t._v(t._s(t.$t('authManagement.forgotYourPassword')))])],1)],1),t._v(' '),n('v-card-actions',[n('v-btn',{attrs:{href:'/auth/google',icon:'',disabled:!!t.user}},[n('v-icon',{attrs:{color:'red'}},[t._v('fab fa-google fa-lg')])],1),t._v(' '),n('v-btn',{attrs:{href:'/auth/github',icon:'',disabled:!!t.user}},[n('v-icon',{attrs:{color:'light-blue'}},[t._v('fab fa-github fa-lg')])],1),t._v(' '),n('v-spacer'),t._v(' '),n('v-btn',{attrs:{color:'primary',type:'submit',loading:t.loadingSubmit,disabled:!!t.user}},[t._v('\n              '+t._s(t.$t('login.title'))+'\n            ')]),t._v(' '),n('v-btn',{attrs:{loading:t.loadingLogout},on:{click:t.btnClick}},[t._v('\n              '+t._s(t.user?t.$t('login.logout'):t.$t('login.clear'))+'\n            ')])],1)],1)],1)],1)],1)],1);}),[],!1,null,null,null);e.default=component.exports;j()(component,{VAvatar:E.a,VBtn:D.a,VCard:P.a,VCardActions:A.a,VCardText:A.c,VCardTitle:A.d,VCol:I.a,VForm:R.a,VIcon:T.a,VRow:B.a,VSpacer:M.a,VTextField:z.a});},908:function(t,e,n){'use strict';n(273);var r=n(274);e.a=Object(r.a)('layout');},912:function(t,e,n){var content=n(913);'string'==typeof content&&(content=[[t.i,content,'']]),content.locals&&(t.exports=content.locals);(0,n(13).default)('2065bca8',content,!0,{sourceMap:!1});},913:function(t,e,n){(e=n(12)(!1)).push([t.i,'@import url(https://fonts.googleapis.com/css?family=Playball);']),e.push([t.i,'.main-content{min-width:100%}.close-icon{text-decoration:none}.exotic--dark{color:#fff;text-shadow:0 1px 1px #a1a1a1}.exotic--light{color:#212121;text-shadow:0 1px 1px #bdbdbd}.exotic--font{font-family:playball,sans-serif!important}.error-box h1{font-size:150px;line-height:150px;font-weight:700}.error-box img{height:20vh}.v-dialog{border-radius:4px;margin:24px;overflow-y:auto;pointer-events:auto;-webkit-transition:.3s cubic-bezier(.25,.8,.25,1);transition:.3s cubic-bezier(.25,.8,.25,1);width:100%;z-index:inherit;box-shadow:0 11px 15px -7px rgba(0,0,0,.2),0 24px 38px 3px rgba(0,0,0,.14),0 9px 46px 8px rgba(0,0,0,.12)}.v-dialog:not(.v-dialog--fullscreen){max-height:90%}.v-dialog>*{width:100%}.v-dialog>.v-card>.v-card__title{font-size:1.25rem;font-weight:500;letter-spacing:.0125em;padding:16px 24px 10px}.v-dialog>.v-card>.v-card__subtitle,.v-dialog>.v-card>.v-card__text{padding:0 24px 20px}.v-dialog__content{-webkit-box-align:center;align-items:center;display:-webkit-box;display:flex;height:100%;-webkit-box-pack:center;justify-content:center;left:0;pointer-events:none;position:fixed;top:0;-webkit-transition:.2s cubic-bezier(.25,.8,.25,1),z-index 1ms;transition:.2s cubic-bezier(.25,.8,.25,1),z-index 1ms;width:100%;z-index:6;outline:none}.v-dialog__container{display:none}.v-dialog__container--attached{display:inline}.v-dialog--animated{-webkit-animation-duration:.15s;animation-duration:.15s;-webkit-animation-name:animate-dialog;animation-name:animate-dialog;-webkit-animation-timing-function:cubic-bezier(.25,.8,.25,1);animation-timing-function:cubic-bezier(.25,.8,.25,1)}.v-dialog--fullscreen{border-radius:0;margin:0;height:100%;position:fixed;overflow-y:auto;top:0;left:0}.v-dialog--fullscreen>.v-card{min-height:100%;min-width:100%;margin:0!important;padding:0!important}.v-dialog--scrollable,.v-dialog--scrollable>form{display:-webkit-box;display:flex}.v-dialog--scrollable>.v-card,.v-dialog--scrollable>form>.v-card{display:-webkit-box;display:flex;-webkit-box-flex:1;flex:1 1 100%;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;max-height:100%;max-width:100%}.v-dialog--scrollable>.v-card>.v-card__actions,.v-dialog--scrollable>.v-card>.v-card__title,.v-dialog--scrollable>form>.v-card>.v-card__actions,.v-dialog--scrollable>form>.v-card>.v-card__title{-webkit-box-flex:0;flex:0 0 auto}.v-dialog--scrollable>.v-card>.v-card__text,.v-dialog--scrollable>form>.v-card>.v-card__text{-webkit-backface-visibility:hidden;backface-visibility:hidden;-webkit-box-flex:1;flex:1 1 auto;overflow-y:auto}@-webkit-keyframes animate-dialog{0%{-webkit-transform:scale(1);transform:scale(1)}50%{-webkit-transform:scale(1.03);transform:scale(1.03)}to{-webkit-transform:scale(1);transform:scale(1)}}@keyframes animate-dialog{0%{-webkit-transform:scale(1);transform:scale(1)}50%{-webkit-transform:scale(1.03);transform:scale(1.03)}to{-webkit-transform:scale(1);transform:scale(1)}}','']),t.exports=e;},943:function(t,e,n){'use strict';var r={props:{dialog:Boolean,runAction:Function,titleDialog:String,textDialog:String}},o=n(16),l=n(21),c=n.n(l),d=n(279),h=n(259),m=n(129),v=n(958),f=n(874),component=Object(o.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n('v-dialog',{attrs:{persistent:'','max-width':'320'},model:{value:t.dialog,callback:function(e){t.dialog=e;},expression:'dialog'}},[n('v-card',[n('v-card-title',{staticClass:'title'},[t._v(t._s(t.titleDialog)+'?')]),t._v(' '),n('v-card-text',[t._v('\n      '+t._s(t.textDialog)+'\n    ')]),t._v(' '),n('v-card-actions',[n('v-spacer'),t._v(' '),n('v-btn',{attrs:{text:''},on:{click:function(e){return t.$emit('onCloseDialog');}}},[t._v(t._s(t.$t('common.disagree')))]),t._v(' '),n('v-btn',{attrs:{text:'',color:'primary'},on:{click:t.runAction}},[t._v(t._s(t.$t('common.agree')))])],1)],1)],1);}),[],!1,null,null,null);e.a=component.exports;c()(component,{VBtn:d.a,VCard:h.a,VCardActions:m.a,VCardText:m.c,VCardTitle:m.d,VDialog:v.a,VSpacer:f.a});},956:function(t,e,n){'use strict';n(52);var r,o=n(9),l=(n(26),{$_veeValidate:{validator:'new'},props:{dialog:Boolean,runAction:Function,showError:Function,titleDialog:String,validateType:String,labelInput:String,hintInput:String},data:function(){return{model:{inputValue:''}};},watch:{'model.inputValue':function(t,e){this.$emit('onInput',t);}},methods:{onSubmit:(r=Object(o.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.$validator.validateAll();case 2:this.$validator.errors.any()?this.showError('Validation Error!'):this.runAction();case 3:case'end':return t.stop();}}),t,this);}))),function(){return r.apply(this,arguments);})}}),c=n(16),d=n(21),h=n.n(d),m=n(279),v=n(259),f=n(129),w=n(872),x=n(958),y=n(1073),_=n(959),O=n(908),k=n(874),$=n(858),component=Object(c.a)(l,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n('v-dialog',{attrs:{persistent:'','max-width':'320'},model:{value:t.dialog,callback:function(e){t.dialog=e;},expression:'dialog'}},[n('v-card',[n('v-card-title',{staticClass:'title'},[t._v(t._s(t.titleDialog))]),t._v(' '),n('v-form',{on:{submit:function(e){return e.preventDefault(),t.onSubmit(e);}}},[n('v-card-text',[n('v-container',{attrs:{'grid-list-md':''}},[n('v-layout',{attrs:{wrap:''}},[n('v-flex',{attrs:{xs12:''}},['numeric'===t.validateType?n('v-text-field',{directives:[{name:'validate',rawName:'v-validate',value:'required|numeric',expression:'\'required|numeric\''}],attrs:{'error-messages':t.errors.collect('inputValue'),'data-vv-name':'inputValue',label:t.labelInput,hint:t.hintInput,'persistent-hint':''},model:{value:t.model.inputValue,callback:function(e){t.$set(t.model,'inputValue',e);},expression:'model.inputValue'}}):'alpha_num'===t.validateType?n('v-text-field',{directives:[{name:'validate',rawName:'v-validate',value:'required|alpha_num',expression:'\'required|alpha_num\''}],attrs:{'error-messages':t.errors.collect('inputValue'),'data-vv-name':'inputValue',label:t.labelInput,hint:t.hintInput,'persistent-hint':''},model:{value:t.model.inputValue,callback:function(e){t.$set(t.model,'inputValue',e);},expression:'model.inputValue'}}):'email'===t.validateType?n('v-text-field',{directives:[{name:'validate',rawName:'v-validate',value:'required|email',expression:'\'required|email\''}],attrs:{'error-messages':t.errors.collect('inputValue'),'data-vv-name':'inputValue',label:t.labelInput,hint:t.hintInput,'persistent-hint':''},model:{value:t.model.inputValue,callback:function(e){t.$set(t.model,'inputValue',e);},expression:'model.inputValue'}}):t._e()],1)],1)],1)],1),t._v(' '),n('v-card-actions',[n('v-spacer'),t._v(' '),n('v-btn',{attrs:{text:'',type:'submit',color:'primary'}},[t._v(t._s(t.$t('common.enter')))]),t._v(' '),n('v-btn',{attrs:{text:''},on:{click:function(e){return t.$emit('onCloseInputDialog');}}},[t._v(t._s(t.$t('common.close')))])],1)],1)],1)],1);}),[],!1,null,null,null);e.a=component.exports;h()(component,{VBtn:m.a,VCard:v.a,VCardActions:f.a,VCardText:f.c,VCardTitle:f.d,VContainer:w.a,VDialog:x.a,VFlex:y.a,VForm:_.a,VLayout:O.a,VSpacer:k.a,VTextField:$.a});},958:function(t,e,n){'use strict';n(10),n(8),n(6),n(4),n(7),n(40),n(44);var r=n(0),o=(n(19),n(912),n(132)),l=n(110),c=n(159),d=n(284),h=n(281),m=n(280),v=n(28),f=n(157),w=n(1),x=n(282),y=n(5),_=n(11);function O(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable;}))),e.push.apply(e,n);}return e;}function k(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?O(Object(source),!0).forEach((function(e){Object(r.a)(t,e,source[e]);})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):O(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e));}));}return t;}var $=Object(y.a)(o.a,l.a,c.a,d.a,h.a,m.a,v.a);e.a=$.extend({name:'v-dialog',directives:{ClickOutside:f.a},props:{dark:Boolean,disabled:Boolean,fullscreen:Boolean,light:Boolean,maxWidth:{type:[String,Number],default:'none'},noClickAnimation:Boolean,origin:{type:String,default:'center center'},persistent:Boolean,retainFocus:{type:Boolean,default:!0},scrollable:Boolean,transition:{type:[String,Boolean],default:'dialog-transition'},width:{type:[String,Number],default:'auto'}},data:function(){return{activatedBy:null,animate:!1,animateTimeout:-1,isActive:!!this.value,stackMinZIndex:200};},computed:{classes:function(){var t;return t={},Object(r.a)(t,'v-dialog '.concat(this.contentClass).trim(),!0),Object(r.a)(t,'v-dialog--active',this.isActive),Object(r.a)(t,'v-dialog--persistent',this.persistent),Object(r.a)(t,'v-dialog--fullscreen',this.fullscreen),Object(r.a)(t,'v-dialog--scrollable',this.scrollable),Object(r.a)(t,'v-dialog--animated',this.animate),t;},contentClasses:function(){return{'v-dialog__content':!0,'v-dialog__content--active':this.isActive};},hasActivator:function(){return Boolean(!!this.$slots.activator||!!this.$scopedSlots.activator);}},watch:{isActive:function(t){t?(this.show(),this.hideScroll()):(this.removeOverlay(),this.unbind());},fullscreen:function(t){this.isActive&&(t?(this.hideScroll(),this.removeOverlay(!1)):(this.showScroll(),this.genOverlay()));}},created:function(){this.$attrs.hasOwnProperty('full-width')&&Object(_.d)('full-width',this);},beforeMount:function(){var t=this;this.$nextTick((function(){t.isBooted=t.isActive,t.isActive&&t.show();}));},beforeDestroy:function(){'undefined'!=typeof window&&this.unbind();},methods:{animateClick:function(){var t=this;this.animate=!1,this.$nextTick((function(){t.animate=!0,window.clearTimeout(t.animateTimeout),t.animateTimeout=window.setTimeout((function(){return t.animate=!1;}),150);}));},closeConditional:function(t){var e=t.target;return!(this._isDestroyed||!this.isActive||this.$refs.content.contains(e)||this.overlay&&e&&!this.overlay.$el.contains(e));},hideScroll:function(){this.fullscreen?document.documentElement.classList.add('overflow-y-hidden'):d.a.options.methods.hideScroll.call(this);},show:function(){var t=this;!this.fullscreen&&!this.hideOverlay&&this.genOverlay(),this.$nextTick((function(){t.$refs.content.focus(),t.bind();}));},bind:function(){window.addEventListener('focusin',this.onFocusin);},unbind:function(){window.removeEventListener('focusin',this.onFocusin);},onClickOutside:function(t){this.$emit('click:outside',t),this.persistent?this.noClickAnimation||this.animateClick():this.activeZIndex>=this.getMaxZIndex()&&(this.isActive=!1);},onKeydown:function(t){if(t.keyCode===w.v.esc&&!this.getOpenDependents().length)if(this.persistent)this.noClickAnimation||this.animateClick();else{this.isActive=!1;var e=this.getActivator();this.$nextTick((function(){return e&&e.focus();}));}this.$emit('keydown',t);},onFocusin:function(t){if(t&&this.retainFocus){var e=t.target;if(e&&![document,this.$refs.content].includes(e)&&!this.$refs.content.contains(e)&&this.activeZIndex>=this.getMaxZIndex()&&!this.getOpenDependentElements().some((function(t){return t.contains(e);}))){var n=this.$refs.content.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');n.length&&n[0].focus();}}}},render:function(t){var e=[],data={class:this.classes,ref:'dialog',directives:[{name:'click-outside',value:this.onClickOutside,args:{closeConditional:this.closeConditional,include:this.getOpenDependentElements}},{name:'show',value:this.isActive}],on:{click:function(t){t.stopPropagation();}},style:{}};this.fullscreen||(data.style={maxWidth:'none'===this.maxWidth?void 0:Object(w.h)(this.maxWidth),width:'auto'===this.width?void 0:Object(w.h)(this.width)}),e.push(this.genActivator());var dialog=t('div',data,this.showLazyContent(this.getContentSlot()));return this.transition&&(dialog=t('transition',{props:{name:this.transition,origin:this.origin}},[dialog])),e.push(t('div',{class:this.contentClasses,attrs:k({role:'document',tabindex:this.isActive?0:void 0},this.getScopeIdAttrs()),on:{keydown:this.onKeydown},style:{zIndex:this.activeZIndex},ref:'content'},[this.$createElement(x.a,{props:{root:!0,light:this.light,dark:this.dark}},[dialog])])),t('div',{staticClass:'v-dialog__container',class:{'v-dialog__container--attached':''===this.attach||!0===this.attach||'attach'===this.attach},attrs:{role:'dialog'}},e);}});},959:function(t,e,n){'use strict';n(10),n(8),n(7);var r=n(0),o=(n(70),n(6),n(4),n(276),n(40),n(44),n(5)),l=n(83),c=n(108);function d(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable;}))),e.push.apply(e,n);}return e;}function h(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?d(Object(source),!0).forEach((function(e){Object(r.a)(t,e,source[e]);})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):d(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e));}));}return t;}e.a=Object(o.a)(l.a,Object(c.b)('form')).extend({name:'v-form',inheritAttrs:!1,props:{lazyValidation:Boolean,value:Boolean},data:function(){return{inputs:[],watchers:[],errorBag:{}};},watch:{errorBag:{handler:function(t){var e=Object.values(t).includes(!0);this.$emit('input',!e);},deep:!0,immediate:!0}},methods:{watchInput:function(input){var t=this,e=function(input){return input.$watch('hasError',(function(e){t.$set(t.errorBag,input._uid,e);}),{immediate:!0});},n={_uid:input._uid,valid:function(){},shouldValidate:function(){}};return this.lazyValidation?n.shouldValidate=input.$watch('shouldValidate',(function(r){r&&(t.errorBag.hasOwnProperty(input._uid)||(n.valid=e(input)));})):n.valid=e(input),n;},validate:function(){return 0===this.inputs.filter((function(input){return!input.validate(!0);})).length;},reset:function(){this.inputs.forEach((function(input){return input.reset();})),this.resetErrorBag();},resetErrorBag:function(){var t=this;this.lazyValidation&&setTimeout((function(){t.errorBag={};}),0);},resetValidation:function(){this.inputs.forEach((function(input){return input.resetValidation();})),this.resetErrorBag();},register:function(input){this.inputs.push(input),this.watchers.push(this.watchInput(input));},unregister:function(input){var t=this.inputs.find((function(i){return i._uid===input._uid;}));if(t){var e=this.watchers.find((function(i){return i._uid===t._uid;}));e&&(e.valid(),e.shouldValidate()),this.watchers=this.watchers.filter((function(i){return i._uid!==t._uid;})),this.inputs=this.inputs.filter((function(i){return i._uid!==t._uid;})),this.$delete(this.errorBag,t._uid);}}},render:function(t){var e=this;return t('form',{staticClass:'v-form',attrs:h({novalidate:!0},this.attrs$),on:{submit:function(t){return e.$emit('submit',t);}}},this.$slots.default);}});}}]);
//# sourceMappingURL=7c14fd4f571e30fcccaf.js.map