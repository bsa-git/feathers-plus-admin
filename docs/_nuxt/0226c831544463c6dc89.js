(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{501:function(e,t,r){"use strict";r.r(t);r(51),r(26);var a=r(4),i=r.n(a),n=r(10),s=r.n(n),o=r(6),l={layout:"user",$_veeValidate:{validator:"new"},data:function(){return{title:this.$t("login.title"),description:this.$t("login.description"),loading:!1,error:void 0,model:{email:"Sandrine.Torphy@yahoo.com",password:"Sandrine.Torphy"}}},head:function(){return{title:this.title,meta:[{hid:"description",name:"description",content:this.description}]}},mounted:function(){},computed:s()({},Object(o.c)("users",{user:"current"}),Object(o.c)({config:"getConfig"})),methods:s()({submit:function(){var e=i()(regeneratorRuntime.mark(function e(){var t,r;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t=this,e.next=3,this.$validator.validateAll();case 3:if(!this.$validator.errors.any()){e.next=7;break}this.showError("Validation Error!"),e.next=11;break;case 7:return e.next=9,t.login(t.model.email,t.model.password);case 9:(r=e.sent)&&r.accessToken&&(this.loading=!0,setTimeout(function(){t.$router.push("/dashboard")},1e3));case 11:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),dismissError:function(){this.error=void 0,this.clearAuthenticateError()},login:function(){var e=i()(regeneratorRuntime.mark(function e(t,r){var a,i;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,this.authenticate({strategy:"local",email:t,password:r});case 3:return a=e.sent,this.showSuccess("Success Login!"),e.abrupt("return",a);case 8:e.prev=8,e.t0=e.catch(0),i=e.t0.className,e.t0=Object.assign({},e.t0),e.t0.message="not-authenticated"===i?"Incorrect email or password.":"An error prevented login.",this.error=e.t0,this.showError(e.t0.message);case 15:case"end":return e.stop()}},e,this,[[0,8]])}));return function(t,r){return e.apply(this,arguments)}}()},Object(o.d)("auth",{clearError:"clearAuthenticateError"}),Object(o.d)({showSuccess:"SHOW_SUCCESS",showError:"SHOW_ERROR"}),Object(o.b)("auth",["authenticate"]))},c=r(2),d=Object(c.a)(l,function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-layout",{attrs:{"align-center":"","justify-center":""}},[r("v-flex",{attrs:{xs12:"",sm8:"",md4:"",lg4:""}},[r("v-card",{staticClass:"elevation-1 pa-3"},[r("v-card-text",[r("div",{staticClass:"layout column align-center"},[r("img",{attrs:{src:"/feathers-plus-admin/img/m.png",alt:"Vue Material Admin",width:"120",height:"120"}}),e._v(" "),r("router-link",{attrs:{to:e.$i18n.path(e.config.homePath)}},[r("h1",{staticClass:"my-4 primary--text font-weight-light"},[e._v("Material Admin Template")])])],1),e._v(" "),r("v-form",[r("v-text-field",{directives:[{name:"validate",rawName:"v-validate",value:"required|email",expression:"'required|email'"}],attrs:{"append-icon":"email","error-messages":e.errors.collect("email"),"data-vv-name":"email",label:e.$t("login.email")},model:{value:e.model.email,callback:function(t){e.$set(e.model,"email",t)},expression:"model.email"}}),e._v(" "),r("v-text-field",{directives:[{name:"validate",rawName:"v-validate",value:"required|min:3",expression:"'required|min:3'"}],attrs:{"append-icon":"lock","error-messages":e.errors.collect("password"),"data-vv-name":"password",label:e.$t("login.password"),type:"password"},model:{value:e.model.password,callback:function(t){e.$set(e.model,"password",t)},expression:"model.password"}})],1)],1),e._v(" "),r("v-card-actions",[r("v-btn",{attrs:{href:"/auth/google",icon:"",disabled:!!e.user}},[r("v-icon",{attrs:{color:"red"}},[e._v("fab fa-google fa-lg")])],1),e._v(" "),r("v-btn",{attrs:{href:"/auth/github",icon:"",disabled:!!e.user}},[r("v-icon",{attrs:{color:"light-blue"}},[e._v("fab fa-github fa-lg")])],1),e._v(" "),r("v-spacer"),e._v(" "),r("v-btn",{attrs:{block:"",color:"primary",loading:e.loading,disabled:!!e.user},on:{click:e.submit}},[e._v("\n          "+e._s(e.$t("login.title"))+"\n        ")])],1)],1)],1)],1)},[],!1,null,null,null);d.options.__file="profile.vue";t.default=d.exports}}]);
//# sourceMappingURL=0226c831544463c6dc89.js.map
