(window.webpackJsonp=window.webpackJsonp||[]).push([[33,12],{1022:function(t,e,n){"use strict";n.r(e);var c=n(938).default,o=n(16),component=Object(o.a)(c,void 0,void 0,!1,null,null,null);e.default=component.exports},892:function(t,e,n){"use strict";n(64),n(74),n(65);var c=n(20)("app:comp.admins-accounts-roles"),o={components:{},props:{nodalName:String,pageName:String,appMenu:Array},data:function(){return{search:"",active:[],open:[],pageIcon:"",nodalItem:{}}},created:function(){var t=this;this.nodalItem=this.appMenu.filter((function(e){return!!e.name&&e.name===t.nodalName}))[0],this.nodalItem.name!==this.pageName&&(this.nodalItem=this.nodalItem.items.filter((function(e){return!!e.name&&e.name===t.pageName}))[0]),this.pageIcon=this.nodalItem.icon?this.nodalItem.icon:"",c("nodalItem:",this.nodalItem)},computed:{menuItems:function(){var t=this,data=[];return(this.nodalItem.items?this.nodalItem.items:this.nodalItem.children).forEach((function(e){var n=[];e.children&&e.children.forEach((function(e){var c={id:"item.title_".concat(e.name),name:"".concat(e.title," :"),children:[{id:"item.description_".concat(e.name),name:t.$t("".concat(e.alias,".description"))}]};n.push(c)}));var c={id:"item.title_".concat(e.name),name:"".concat(e.title," :"),children:n.length?n:[{id:"item.description_".concat(e.name),name:t.$t("".concat(e.alias,".description"))}]};data.push(c)})),c("computed.menuItems.data:",data),data},selected:function(){if(this.active.length)return this.active[0]}},watch:{selected:function(t){var e=this;if(t){c("watch.selected.val:",t);var n=t.split("_")[1],o=this.nodalItem.items?this.nodalItem.items:this.nodalItem.children,r=o.find((function(t){return t.name===n}));if(r){c("watch.selected.findItem:",r);var path=this.$i18n.path(r.to);c("watch.selected.path:",path),this.$redirect(path)}else o.forEach((function(t){if(t.children){var o=t.children;if(r=o.find((function(t){return t.name===n}))){c("watch.selected.findItem:",r);var l=e.$i18n.path(r.to);c("watch.selected.path:",l),e.$redirect(l)}}}))}}}},r=n(16),l=n(21),d=n.n(l),m=n(876),h=n(256),v=n(128),f=n(871),I=n(257),_=n(873),w=n(874),V=n(858),$=n(62),x=n(80),N=n(1026),component=Object(r.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("v-row",{attrs:{justify:"center"}},[n("v-col",{attrs:{cols:"12",sm:"8"}},[n("v-card",[n("v-toolbar",{attrs:{color:"",dark:""}},[t.pageIcon?n("v-icon",{staticClass:"mr-3"},[t._v(t._s(t.pageIcon))]):n("v-app-bar-nav-icon"),t._v(" "),n("v-toolbar-title",[t._v(t._s(t.nodalItem.title))]),t._v(" "),n("v-spacer"),t._v(" "),n("v-text-field",{staticClass:"hidden-sm-and-down",attrs:{label:t.$t("management.search"),"hide-details":"",clearable:"","clear-icon":"mdi-close","append-icon":"fas fa-search"},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}})],1),t._v(" "),n("v-card-text",[n("v-treeview",{attrs:{items:t.menuItems,search:t.search,active:t.active,open:t.open,activatable:"","open-on-click":"","active-class":"primary--text",transition:""},on:{"update:active":function(e){t.active=e},"update:open":function(e){t.open=e}},scopedSlots:t._u([{key:"prepend",fn:function(e){var c=e.item;e.active;return[c.id.startsWith("item.description_")?n("v-icon",[t._v("mdi-check")]):t._e()]}}])})],1)],1)],1)],1)],1)}),[],!1,null,null,null);e.a=component.exports;d()(component,{VAppBarNavIcon:m.a,VCard:h.a,VCardText:v.b,VCol:f.a,VIcon:I.a,VRow:_.a,VSpacer:w.a,VTextField:V.a,VToolbar:$.a,VToolbarTitle:x.a,VTreeview:N.a})},938:function(t,e,n){"use strict";n.r(e);var c=n(270),o=n(892),r=n(107),l={components:{AppPageHeader:c.a,NodalMenuItem:o.a},data:function(){return{title:this.$t("app_menu.admins"),description:this.$t("app_menu.admins"),appMenu:r}},head:function(){return{title:this.title,meta:[{hid:"description",name:"description",content:this.description}]}}},d=n(16),component=Object(d.a)(l,(function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("app-page-header",{attrs:{"page-title":this.description}}),this._v(" "),e("nodal-menu-item",{attrs:{nodalName:"admins","page-name":"admins","app-menu":this.appMenu}})],1)}),[],!1,null,null,null);e.default=component.exports}}]);
//# sourceMappingURL=748256db4112361f5236.js.map