(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{889:function(e,t,n){"use strict";n(19);var r={props:{dialog:Boolean,headerIcon:String,headerTitle:String,actionText:{type:String,default:"Close"},maxWidth:{type:Number,default:400}},computed:{showDialog:{get:function(){return this.dialog},set:function(e){this.$emit("onClose",e)}}}},o=n(16),l=n(21),c=n.n(l),d=n(876),v=n(276),m=n(256),h=n(128),f=n(905),T=n(860),_=n(257),y=n(874),w=n(62),x=n(80),component=Object(o.a)(r,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-dialog",{attrs:{scrollable:"","max-width":e.maxWidth},model:{value:e.showDialog,callback:function(t){e.showDialog=t},expression:"showDialog"}},[n("v-card",[n("v-toolbar",{attrs:{color:"primary",dark:""}},[e.headerIcon?n("v-icon",{staticClass:"mr-3"},[e._v(e._s(e.headerIcon))]):n("v-app-bar-nav-icon"),e._v(" "),n("v-toolbar-title",[e._v(e._s(e.headerTitle))]),e._v(" "),n("v-spacer"),e._v(" "),n("v-btn",{attrs:{icon:""},on:{click:function(t){e.showDialog=!1}}},[n("v-icon",[e._v("mdi-close")])],1)],1),e._v(" "),n("v-card-text",[e._t("view-content")],2),e._v(" "),n("v-divider"),e._v(" "),n("v-card-actions",[n("v-btn",{staticClass:"mx-auto mb-3",attrs:{color:"primary",text:""},on:{click:function(t){e.showDialog=!1}}},[e._v(e._s(e.actionText))])],1)],1)],1)}),[],!1,null,null,null);t.a=component.exports;c()(component,{VAppBarNavIcon:d.a,VBtn:v.a,VCard:m.a,VCardActions:h.a,VCardText:h.b,VDialog:f.a,VDivider:T.a,VIcon:_.a,VSpacer:y.a,VToolbar:w.a,VToolbarTitle:x.a})},897:function(e,t,n){"use strict";var r=n(282),o="id"in r.users[0]?"id":"_id",l="id"in r.roles[0]?"id":"_id",c="id"in r.teams[0]?"id":"_id",d=r.users[0][o],v=r.roles[0][l],m=r.teams[0][c],h='{\n  getUser(key: "'.concat(d,'") {\n    ').concat(o,"\n    email\n    fullName\n    profile{\n      personalPhone\n      personalWebSite\n      addressFull\n      jobCompanyName\n    }\n    role{\n      ").concat(l,"\n      name\n      description\n    }\n    teams{\n      ").concat(c,"\n      name\n      description\n    }\n  }\n}"),f='{\n  getRole(key: "'.concat(v,'") {\n    ').concat(l,"\n    name\n    description\n    users{\n      ").concat(o,"\n      email\n      fullName\n    }\n  }\n}"),T='{\n  getTeam(key: "'.concat(m,'") {\n    ').concat(c,"\n    name\n    description\n    members{\n      ").concat(o,"\n      email\n      fullName\n    }\n  }\n}"),_="{\n  findUser(query: {".concat(o,': "').concat(d,'"}) {\n    ').concat(o,"\n    email\n    fullName\n    profile{\n      personalPhone\n      personalWebSite\n      addressFull\n      jobCompanyName\n    }\n    role{\n      ").concat(l,"\n      name\n      description\n    }\n    teams{\n      ").concat(c,"\n      name\n      description\n    }\n  }\n}"),y="{\n  findRole(query: {".concat(l,': "').concat(v,'"}) {\n    ').concat(l,"\n    name\n    description\n    users{\n      ").concat(o,"\n      email\n      fullName\n    }\n  }\n}"),w="{\n  findTeam(query: {".concat(c,': "').concat(m,'"}) {\n    ').concat(c,"\n    name\n    description\n    members{\n      ").concat(o,"\n      email\n      fullName\n    }\n  }\n}");t.a={getUser:h,getRole:f,getTeam:T,findUser:_,findRole:y,findTeam:w}},899:function(e,t,n){"use strict";n(10),n(8),n(6),n(4),n(7),n(64),n(52);var r=n(9),o=n(0),l=n(26),c=n(22),d=n(889);function v(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,n)}return t}var m,h=n(20)("app:page.services-graphql-find"),f={components:{ViewDialog:d.a},props:{tabs:Array,items:Array,selTitle:String,selTooltip:String},data:function(){return{title:this.$t("graphql.title"),description:this.$t("graphql.description"),responseDialog:!1,textResponse:"",selTab:null,isLoading:!1}},methods:function(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?v(source,!0).forEach((function(t){Object(o.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):v(source).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}({changeTab:function(e){h("changeTab.index:",e)},request:(m=Object(r.a)(regeneratorRuntime.mark((function e(){var t,n,r,o,l;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,this.isLoading=!0,t=c.a.service("/graphql"),n=this.items[this.selTab].value.trim(),e.next=6,t.find({query:{query:n}});case 6:r=e.sent,h("request.response:",r),o=JSON.stringify(r,null,"  "),this.textResponse=o,this.responseDialog=!0,this.isLoading=!1,e.next=19;break;case 14:e.prev=14,e.t0=e.catch(0),h("graphql.find.error:",e.t0),l=e.t0.errors.length?e.t0.errors[0].message:e.t0.message,this.showError(l);case 19:case"end":return e.stop()}}),e,this,[[0,14]])}))),function(){return m.apply(this,arguments)})},Object(l.d)({showSuccess:"SHOW_SUCCESS",showError:"SHOW_ERROR"}))},T=n(16),_=n(21),y=n.n(_),w=n(876),x=n(276),V=n(256),k=n(871),O=n(257),S=n(873),D=n(874),j=n(1001),R=n(1002),C=n(1028),$=n(984),N=n(985),P=n(975),E=n(62),I=n(80),U=n(878),component=Object(T.a)(f,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("view-dialog",{attrs:{dialog:e.responseDialog,"max-width":500,"header-icon":"mdi-search-web","header-title":e.$t("graphql.responseToRequest"),"action-text":e.$t("management.close")},on:{onClose:function(t){e.responseDialog=!1}}},[n("div",{attrs:{slot:"view-content"},slot:"view-content"},[n("v-textarea",{attrs:{outline:"","auto-grow":"",name:"text-response",value:e.textResponse}})],1)]),e._v(" "),n("div",[n("v-row",{attrs:{justify:"center"}},[n("v-col",{attrs:{cols:"12",sm:"8"}},[n("v-card",{attrs:{loading:e.isLoading}},[n("v-toolbar",{attrs:{color:"primary",dark:"",tabs:""},scopedSlots:e._u([{key:"extension",fn:function(){return[n("v-tabs",{attrs:{dark:"",grow:"","show-arrows":""},on:{change:e.changeTab},model:{value:e.selTab,callback:function(t){e.selTab=t},expression:"selTab"}},[n("v-tabs-slider",{attrs:{color:"yellow"}}),e._v(" "),e._l(e.tabs,(function(t,r){return n("v-tab",{key:"tab-"+(r+1)},[e._v("\n                  "+e._s(t)+"\n                ")])}))],2)]},proxy:!0}])},[n("v-app-bar-nav-icon"),e._v(" "),n("v-toolbar-title",[e._v(e._s(e.selTitle))]),e._v(" "),n("v-spacer"),e._v(" "),n("v-tooltip",{attrs:{bottom:""},scopedSlots:e._u([{key:"activator",fn:function(t){var r=t.on;return[n("v-btn",{attrs:{icon:""},on:{click:e.request}},[n("v-icon",e._g({},r),[e._v("mdi-search-web")])],1)]}}])},[e._v(" "),n("span",[e._v(e._s(e.selTooltip))])])],1),e._v(" "),n("v-tabs-items",{model:{value:e.selTab,callback:function(t){e.selTab=t},expression:"selTab"}},e._l(e.items,(function(t,r){return n("v-tab-item",{key:"item-"+(r+1)},[n("v-textarea",{staticClass:"pa-5",attrs:{clearable:"",counter:"512",outline:"","auto-grow":"",name:"text-"+(r+1),label:e.$t("graphql.searchQuery"),value:t.value,rows:r&&t.value.split("\n").length>5?t.value.split("\n").length-1:-1,hint:e.$t("graphql.enterGraphLQuery"),"persistent-hint":""},model:{value:t.value,callback:function(n){e.$set(t,"value",n)},expression:"item.value"}})],1)})),1)],1)],1)],1)],1)],1)}),[],!1,null,null,null);t.a=component.exports;y()(component,{VAppBarNavIcon:w.a,VBtn:x.a,VCard:V.a,VCol:k.a,VIcon:O.a,VRow:S.a,VSpacer:D.a,VTab:j.a,VTabItem:R.a,VTabs:C.a,VTabsItems:$.a,VTabsSlider:N.a,VTextarea:P.a,VToolbar:E.a,VToolbarTitle:I.a,VTooltip:U.a})},935:function(e,t,n){"use strict";n.r(t);var r=n(270),o=n(899),l=n(897),c={components:{AppPageHeader:r.a,ServicesGraphql:o.a},data:function(){return{title:this.$t("graphql.title"),description:this.$t("graphql.description"),selTitle:this.$t("graphql.findData"),selTooltip:this.$t("graphql.findData"),tabs:["Users","Roles","Teams"],items:[{key:"findUser",value:l.a.findUser},{key:"findRole",value:l.a.findRole},{key:"findTeam",value:l.a.findTeam}]}},head:function(){return{title:this.title,meta:[{hid:"description",name:"description",content:this.description}]}}},d=n(16),component=Object(d.a)(c,(function(){var e=this.$createElement,t=this._self._c||e;return t("div",[t("app-page-header",{attrs:{"page-title":this.description}}),this._v(" "),t("services-graphql",{attrs:{"sel-title":this.selTitle,"sel-tooltip":this.selTooltip,tabs:this.tabs,items:this.items}})],1)}),[],!1,null,null,null);t.default=component.exports}}]);
//# sourceMappingURL=eea9a649d3c75cc27314.js.map