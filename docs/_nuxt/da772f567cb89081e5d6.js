(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{1165:function(e,t,n){'use strict';n.r(t);var c=n(272),r=n(916),o=n(107),l={components:{AppPageHeader:c.a,NodalMenuItem:r.a},data:function(){return{title:this.$t('app_menu.graphql'),description:this.$t('graphql.description'),appMenu:o};},head:function(){return{title:this.title,meta:[{hid:'description',name:'description',content:this.description}]};}},d=n(16),component=Object(d.a)(l,(function(){var e=this.$createElement,t=this._self._c||e;return t('div',[t('app-page-header',{attrs:{'page-title':this.description}}),this._v(' '),t('nodal-menu-item',{attrs:{nodalName:'services','page-name':'services-graphql','app-menu':this.appMenu}})],1);}),[],!1,null,null,null);t.default=component.exports;},916:function(e,t,n){'use strict';n(70),n(74),n(59);var c=n(20)('app:comp.admins-accounts-roles'),r={components:{},props:{nodalName:String,pageName:String,appMenu:Array},data:function(){return{search:'',active:[],open:[],pageIcon:'',nodalItem:{}};},created:function(){var e=this;this.nodalItem=this.appMenu.filter((function(t){return!!t.name&&t.name===e.nodalName;}))[0],this.nodalItem.name!==this.pageName&&(this.nodalItem=this.nodalItem.items.filter((function(t){return!!t.name&&t.name===e.pageName;}))[0]),this.pageIcon=this.nodalItem.icon?this.nodalItem.icon:'',c('nodalItem:',this.nodalItem);},computed:{menuItems:function(){var e=this,data=[];return(this.nodalItem.items?this.nodalItem.items:this.nodalItem.children).forEach((function(t){var n=[];t.children&&t.children.forEach((function(t){var c={id:'item.title_'.concat(t.name),name:''.concat(t.title,' :'),children:[{id:'item.description_'.concat(t.name),name:e.$t(''.concat(t.alias,'.description'))}]};n.push(c);}));var c={id:'item.title_'.concat(t.name),name:''.concat(t.title,' :'),children:n.length?n:[{id:'item.description_'.concat(t.name),name:e.$t(''.concat(t.alias,'.description'))}]};data.push(c);})),c('computed.menuItems.data:',data),data;},selected:function(){if(this.active.length)return this.active[0];}},watch:{selected:function(e){var t=this;if(e){c('watch.selected.val:',e);var n=e.split('_')[1],r=this.nodalItem.items?this.nodalItem.items:this.nodalItem.children,o=r.find((function(e){return e.name===n;}));if(o){c('watch.selected.findItem:',o);var path=this.$i18n.path(o.to);c('watch.selected.path:',path),this.$redirect(path);}else r.forEach((function(e){if(e.children){var r=e.children;if(o=r.find((function(e){return e.name===n;}))){c('watch.selected.findItem:',o);var l=t.$i18n.path(o.to);c('watch.selected.path:',l),t.$redirect(l);}}}));}}}},o=n(16),l=n(21),d=n.n(l),m=n(876),h=n(259),v=n(129),f=n(871),I=n(260),_=n(873),w=n(874),V=n(858),$=n(63),x=n(81),N=n(1547),component=Object(o.a)(r,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n('div',[n('v-row',{attrs:{justify:'center'}},[n('v-col',{attrs:{cols:'12',sm:'8'}},[n('v-card',[n('v-toolbar',{attrs:{color:'',dark:''}},[e.pageIcon?n('v-icon',{staticClass:'mr-3'},[e._v(e._s(e.pageIcon))]):n('v-app-bar-nav-icon'),e._v(' '),n('v-toolbar-title',[e._v(e._s(e.nodalItem.title))]),e._v(' '),n('v-spacer'),e._v(' '),n('v-text-field',{staticClass:'hidden-sm-and-down',attrs:{label:e.$t('management.search'),'hide-details':'',clearable:'','clear-icon':'mdi-close','append-icon':'fas fa-search'},model:{value:e.search,callback:function(t){e.search=t;},expression:'search'}})],1),e._v(' '),n('v-card-text',[n('v-treeview',{attrs:{items:e.menuItems,search:e.search,active:e.active,open:e.open,activatable:'','open-on-click':'','active-class':'primary--text',transition:''},on:{'update:active':function(t){e.active=t;},'update:open':function(t){e.open=t;}},scopedSlots:e._u([{key:'prepend',fn:function(t){var c=t.item;t.active;return[c.id.startsWith('item.description_')?n('v-icon',[e._v('mdi-check')]):e._e()];}}])})],1)],1)],1)],1)],1);}),[],!1,null,null,null);t.a=component.exports;d()(component,{VAppBarNavIcon:m.a,VCard:h.a,VCardText:v.c,VCol:f.a,VIcon:I.a,VRow:_.a,VSpacer:w.a,VTextField:V.a,VToolbar:$.a,VToolbarTitle:x.a,VTreeview:N.a});}}]);
//# sourceMappingURL=da772f567cb89081e5d6.js.map