<template>
  <v-app-bar
    color="primary"
    dark
    app
  >
    <!-- Toggle show NavLeft -->
    <v-toolbar-title
      class="ml-0 pl-3"
    >
      <v-app-bar-nav-icon @click.stop="onNavLeft"></v-app-bar-nav-icon>
    </v-toolbar-title>
    <!-- Search web -->
    <v-text-field
      flat
      solo-inverted
      hide-details
      prepend-inner-icon="mdi-search-web"
      :label="$t('app_toolbar.search')"
      class="hidden-sm-and-down"
    ></v-text-field>

    <v-spacer></v-spacer>
    <!-- Mail to -->
    <v-btn :href="`mailto:${config.email}`">
      {{ $t('app_toolbar.hire_me') }}
    </v-btn>
    <!-- Go to GitHub project -->
    <v-btn icon :href="config.githubProject" target="_blank" title="GitHub">
      <v-icon>fab fa-github</v-icon>
    </v-btn>
    <!-- FullScreen -->
    <v-btn icon @click="toggleFullScreen()" :title="$t('app_toolbar.full_size')">
      <v-icon>mdi-fullscreen</v-icon>
    </v-btn>
    <!-- App Notifications -->
    <v-menu>
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on" :title="$t('app_toolbar.notifications')">
          <v-badge color="red" overlap>
            <template v-slot:badge>{{ amountNotifications }}</template>
            <v-icon>mdi-bell</v-icon>
          </v-badge>
        </v-btn>
      </template>
      <!-- Menu list -->
      <notification-list
        :items="getNotifications"
        :item-index="selNotification"
        v-on:onItem="onNotification($event)"
        v-on:onShowAll="onAllNotifications"
      ></notification-list>
    </v-menu>
    <!-- User menu -->
    <v-menu>
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-icon v-on="on" v-text="user? 'fas fa-user-check':'fas fa-user-alt-slash'"></v-icon>
            </template>
            <span>{{ user? user.fullName : $t('app_toolbar.not_authorized') }}</span>
          </v-tooltip>
        </v-btn>
      </template>
      <!-- Menu list -->
      <app-user-menu-list
        :user-menu="userMenu"
      ></app-user-menu-list>
    </v-menu>
  </v-app-bar>
</template>
<script>
  import {mapGetters} from 'vuex';
  import userMenu from '~/api/app/user-menu.json';
  import appNotifications from '~/api/app/app-notification.json';
  import NotificationList from '~/components/widgets/list/NotificationList';
  import AppUserMenuList from '~/components/app/layout/AppUserMenuList';
  import util from '~/plugins/lib/util';
  const moment = require('moment');

  const debug = require('debug')('app:comp.AppToolbar');
  const isLog = true;

  export default {
    components: {
      NotificationList,
      AppUserMenuList
    },
    data: function () {
      return {
        toggleFullScreen: this.$util.toggleFullScreen,
        notifications:  appNotifications.filter(item => !item.header && !item.divider).map(n => Object.assign({}, n)),
        selNotification: -1,
        userMenu
      }
    },
    created: function () {
      this.initNotifications();
//      debug('created.notifications:', this.notifications);
    },
    computed: {
      logMessages() {
        const data = [];
        let logMessages = [];
        const idFieldLogMessage = this.$store.state['log-messages'].idField;
        const {LogMessage} = this.$FeathersVuex;
        this.getQueryNotifications.forEach(q => {
          let _logMessages = LogMessage.findInStore(q).data;
          logMessages = logMessages.concat(_logMessages);
        });
        util.sortByStringField(logMessages, 'createdAt');
        logMessages.forEach(logMessage => {
          const logMessageId = logMessage[idFieldLogMessage];
          // Get logMessage
          let item = {
            id: logMessageId,
            gr: logMessage.gr,
            pr: logMessage.pr,
            name: logMessage.name,
            title: logMessage.title,
            icon: logMessage.icon,
            color: logMessage.color,
            user: logMessage.user,
            owner: logMessage.owner,
            msg: logMessage.msg,
            formatMsg: logMessage.formatMsg,
            isServer: logMessage.isServer,
            dt: logMessage.dtLocal,
          };
          data.push(item);
        });
        if (isLog) debug('logMessages.data:', data);
        return data
      },
      amountNotifications: function () {
        let amount = 0;
        this.getNotifications.forEach(function(item){
          amount += item.amount;
        });
        return amount;
      },
      getNotifications: function () {
        return this.notifications.filter(item => item.isEnable);
      },
      getQueryNotifications: function () {
        const _notifications = Object.assign({}, this.notifications);
        const qq = [];// {query: {$sort: {createdAt: -1}}}
        _notifications.forEach(n => {
          n.logNames.forEach(name => {
            let q = {query: {
              createdAt: {$gt: n.checkAt},
              name: name
            }};
            qq.push(q);
          });
        });
        return qq
      },
      ...mapGetters({
        config: 'getConfig',
        user: 'getUser',
        stateNotices: 'getNotices'
      }),
    },
    methods: {
      onNavLeft() {
        this.$emit('onNavLeft')
      },
      onNotification(index){
        if(index >= 0){
          const filterNotifications = this.appNotifications.filter(item => !item.header && !item.divider);
          if(isLog) debug('methods.onNotification.item:', filterNotifications[index]);
          this.selNotification = index;
          setTimeout(() => {
            this.selNotification = -1;
          }, 1000);
        }
      },
      onAllNotifications(){
        if(isLog) debug('methods.onAllNotifications: Click');
      },
      initNotifications(){
        /*
        let _item, dtCheckAt, items = null;
        let stateNoticesCheckAt = this.stateNotices.checkAt;
        if(stateNoticesCheckAt){
          items = JSON.parse(stateNoticesCheckAt);
        }
        this.notifications.forEach(notice => {
          if(items){
            if(notice.logNames.length > 1){
              notice.logNames.forEach(logName => {
                _item = items.find(item => item.name === logName);
              })
            }else {
              _item = items.find(item => item.name === notice.logNames[0]);
            }
            notice.checkAt = _item.checkAt;
          } else {
            dtCheckAt = moment.utc(0).format();
            items = [];
            if(notice.logNames.length > 1){
              notice.logNames.forEach(logName => {
                _item = {name: logName, checkAt: dtCheckAt};
                items.push(_item);
              })
            }else {
              _item = {name: notice.logNames[0], checkAt: dtCheckAt};
              items.push(_item);
            }
            notice.checkAt = dtCheckAt;
            this.setNoticesCheckAt(JSON.stringify(items));
          }
        })
        debug('initAppNotifications.notifications:', this.notifications);
        */
      },
      ...mapMutations({
        setNoticesCheckAt: 'SET_NOTICES_CHECKAT',
      }),
    }
  };
</script>
