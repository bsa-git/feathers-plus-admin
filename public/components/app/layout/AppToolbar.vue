<template>
  <div>
    <!--=== Log messages dialog ===-->
    <view-dialog
      :dialog="viewLogMessagesDialog"
      :max-width="1200"
      :header-title="$t('logMessages.title')"
      :action-text="$t('management.close')"
      v-on:onClose="closeViewLogMessagesDialog"
    >
      <div slot="text-content">
        <!-- TopBar for table -->
        <table-top-bar
          :search="search"
          :search-label="$t('management.search')"
          v-on:onSearch="search = $event"
        ></table-top-bar>
        <!-- Data Table -->
        <v-data-table
          :headers="headers"
          :items="getSelLogMessages"
          item-key="id"
          :search="search"
        >
          <!-- Field Icon -->
          <template v-slot:item.icon="{ item }">
            <v-icon>{{ item.icon }}</v-icon>
          </template>
          <!-- Field Priority -->
          <template v-slot:item.pr="{ item }">
            <v-chip :color="item.color" dark>{{ item.pr }}</v-chip>
          </template>
          <!-- Field isServer -->
          <template v-slot:item.isServer="{ item }">
            <v-simple-checkbox v-model="item.isServer" disabled></v-simple-checkbox>
          </template>
          <!-- Field Owner -->
          <template v-slot:item.owner="{ item }">
            <v-icon v-if="item.owner" @click="clickGetOwner(item)"
                    :title="`${item.owner.fullName}(${item.owner.email})`">mdi-contain
            </v-icon>
            <v-icon v-else>mdi-code-brackets</v-icon>
          </template>
          <!-- Field User -->
          <template v-slot:item.user="{ item }">
            <v-icon v-if="item.user" @click="clickGetUser(item)"
                    :title="`${item.user.fullName}(${item.user.email})`">mdi-contain
            </v-icon>
            <v-icon v-else>mdi-code-brackets</v-icon>
          </template>
          <!-- Field Message -->
          <template v-slot:item.formatMsg="{ item }">
            <v-icon v-if="item.formatMsg" @click="clickLogMsg(item)" :title="item.msg">mdi-contain</v-icon>
            <v-icon v-else>mdi-code-brackets</v-icon>
          </template>
          <!-- No Data -->
          <template v-slot:no-data>
            <span color="primary" class="headline">{{ $t('management.noData') }}</span>
          </template>
          <!-- No Results -->
          <template v-slot:no-results>
            <v-alert :value="true" color="error" icon="mdi-information-outline">
              {{ $t('management.searchNoResults') }}
            </v-alert>
          </template>
        </v-data-table>
      </div>
    </view-dialog>
    <!--=== Owner/User for log message dialog ===-->
    <view-dialog
      :dialog="viewDialog"
      :header-icon="iconViewDialog"
      :header-title="titleViewDialog"
      :action-text="$t('management.close')"
      v-on:onClose="viewDialog = false"
    >
      <div slot="text-content">
        <span v-if="!(selItem.user || selItem.owner || selItem.formatMsg)">{{ $t('management.noData') }}</span>
        <v-list three-line v-else-if="clickGetItem === 'owner'">
          <v-list-item>
            <v-list-item-avatar><img :src="selItem.owner.avatar"></v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title v-html="selItem.owner.fullName"></v-list-item-title>
              <v-list-item-subtitle
                v-html="`<span class='font-italic'>Email:</span> ${selItem.owner.email}`"></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-list three-line v-else-if="clickGetItem === 'user'">
          <v-list-item>
            <v-list-item-avatar><img :src="selItem.user.avatar"></v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title v-html="selItem.user.fullName"></v-list-item-title>
              <v-list-item-subtitle
                v-html="`<span class='font-italic'>Email:</span> ${selItem.user.email}`"></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-textarea v-else-if="clickGetItem === 'msg'"
                    class="pa-5"
                    counter="512"
                    outline
                    auto-grow
                    name="text-msg"
                    :value="selItem.formatMsg"
                    :rows="(selItem.formatMsg.split('\n').length > 5)? selItem.formatMsg.split('\n').length - 1 : -1"
        ></v-textarea>
      </div>
    </view-dialog>
    <!--=== App Bar ===-->
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
      <v-btn icon v-if="isToggleFullScreen" @click="toggleFullScreen" :title="$t('app_toolbar.normal_size')">
        <v-icon>mdi-fullscreen-exit</v-icon>
      </v-btn>
      <v-btn icon v-else @click="toggleFullScreen" :title="$t('app_toolbar.full_size')">
        <v-icon>mdi-fullscreen</v-icon>
      </v-btn>
      <!-- App Notifications -->
      <v-menu v-if="getNotifications.length">
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
              <span>{{ user ? user.fullName : $t('app_toolbar.not_authorized') }}</span>
            </v-tooltip>
          </v-btn>
        </template>
        <!-- Menu list -->
        <app-user-menu-list
          :user-menu="userMenu"
        ></app-user-menu-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>
<script>
  import {mapGetters, mapMutations} from 'vuex';

  const moment = require('moment');
  import util from '~/plugins/lib/util';
  import colors from 'vuetify/lib/util/colors';
  import Service from '~/plugins/service-helpers/service-client.class';
  import userMenu from '~/api/app/user-menu.json';
  import ViewDialog from '~/components/dialogs/ViewDialog';
  import appNotifications from '~/api/app/app-notification.json';
  import NotificationList from '~/components/widgets/list/NotificationList';
  import AppUserMenuList from '~/components/app/layout/AppUserMenuList';
  import TableTopBar from '~/components/widgets/top-bars/Search';

  const debug = require('debug')('app:comp.AppToolbar');
  const isLog = false;
  const isDebug = false;

  export default {
    components: {
      NotificationList,
      AppUserMenuList,
      ViewDialog,
      TableTopBar
    },
    data: function () {
      return {
        viewLogMessagesDialog: false,
        search: '',
        isToggleFullScreen: false,
        notifications: null,
        selNotification: -1,
        selLogNames: [],
        userMenu,
        service: null,
        viewDialog: false,
        iconViewDialog: '',
        titleViewDialog: '',
        clickGetItem: '',// user, owner, msg
        selItem: {},
        headers: [
          {
            text: 'Icon',
            value: 'icon',
            sortable: false,
          },
          {
            text: 'DateTime',
            value: 'dt'
          },
          {
            text: 'Group',
            value: 'gr'
          },
          {
            text: 'Priority',
            value: 'pr',
          },
          {
            text: 'Name',
            value: 'name'
          },
          {
            text: 'Server',
            value: 'isServer'
          },
          {
            text: 'Msg',
            align: 'center',
            value: 'formatMsg',
            sortable: false,
          },
          {
            text: 'Owner',
            align: 'center',
            value: 'owner',
            sortable: false,
          },
          {
            text: 'User',
            align: 'center',
            value: 'user',
            sortable: false,
          },
        ],
      }
    },
    created: function () {
      this.notifications = appNotifications.filter(item => !item.header && !item.divider && item.isEnable).map(n => Object.assign({}, n));
      this.service = new Service(this.$store);
      this.initNotifications();
//      this.waitLogMessages();
    },
    mounted: function () {
      this.$nextTick(function () {
      })
    },
    computed: {
      logMessages() {
        const data = [];
        let _logMessages = [];
        const idFieldLogMessage = this.$store.state['log-messages'].idField;
        const {LogMessage} = this.$FeathersVuex;
        this.getQueryNotifications.forEach(q => {
          let findLogMessages = LogMessage.findInStore(q).data;
          _logMessages = _logMessages.concat(findLogMessages);
        });
        util.sortByStringField(_logMessages, 'createdAt', false);
        _logMessages.forEach(logMessage => {
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
        if (isLog) debug('computed.logMessages.data:', data);
        return data
      },
      amountNotifications: function () {
        let amount = 0;
        this.getNotifications.forEach(function (item) {
          amount += item.amount;
        });
        return amount;
      },
      getNotifications: function () {
        let _logMessages, amount = 0;
        this.notifications.forEach(notice => {
          notice.logNames.forEach(name => {
            _logMessages = this.logMessages.filter(msg => msg.name === name);
            notice.amount = _logMessages.length;
            if(notice.amount){
              moment.locale(this.config.locale);
              notice.timeLabel = moment(_logMessages[0].dt).fromNow();
              notice.color = _logMessages[0].color;
            }
          });
        });
        return this.notifications.filter(notice => notice.amount);
      },
      getSelLogMessages: function () {
        const logMessages = this.logMessages.filter(msg => this.selLogNames.includes(msg.name));
//        debug('computed.getSelLogMessages.logMessages:', logMessages);
        return logMessages
      },
      getQueryNotifications: function () {
        const qq = [];// {query: {$sort: {createdAt: -1}}}
        this.notifications.forEach(notice => {
          notice.logNames.forEach(name => {
            let q = {
              query: {
                createdAt: {$gt: notice.checkAt},
                name: name
              }
            };
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
      onNotification(index) {
        if (index >= 0) {
          this.selNotification = index;
          let notice = this.getNotifications[index];
          if (isLog) debug('methods.onNotification.notice:', notice);
          // Set selLogNames
          this.selLogNames = notice.logNames;
          if (isDebug) debug('methods.onNotification.selLogNames:', this.selLogNames);
          this.viewLogMessagesDialog = true;
        }
      },
      onAllNotifications() {
        this.selLogNames = [];
        this.getNotifications.forEach(notice => {
          this.selLogNames = this.selLogNames.concat(notice.logNames);
        });
        if (isDebug) debug('methods.onAllNotifications.selLogNames:', this.selLogNames);
        this.viewLogMessagesDialog = true;
      },
      closeViewLogMessagesDialog(){
        // Close viewDialog
        this.viewLogMessagesDialog = false;
        // Get now date-time
        const dtCheckAt = moment.utc().format();
        // Get stateNotices.checkAt from store
        let stateNoticesCheckAt = JSON.parse(this.stateNotices.checkAt);
        // Set checkAt for selNotification and stateNotices
        if(this.selNotification >= 0){
          let notice = this.getNotifications[this.selNotification];
          notice.checkAt = dtCheckAt;
          notice.logNames.forEach(logName => {
            let stateNoticeCheckAt = stateNoticesCheckAt.find(item => item.name === logName);
            stateNoticeCheckAt.checkAt = dtCheckAt;
          });
          this.selNotification = -1;
        }else {
          this.getNotifications.forEach(notice => {
            notice.checkAt = dtCheckAt;
            notice.logNames.forEach(logName => {
              let stateNoticeCheckAt = stateNoticesCheckAt.find(item => item.name === logName);
              stateNoticeCheckAt.checkAt = dtCheckAt;
            })
          })
        }
        this.setStateNoticesCheckAt(JSON.stringify(stateNoticesCheckAt));
      },
      clickGetOwner(item) {
        this.selItem = item;
        this.clickGetItem = 'owner';
        this.iconViewDialog = 'mdi-account-question';
        this.titleViewDialog = item.title;
        this.viewDialog = true;
      },

      clickGetUser(item) {
        this.selItem = item;
        this.clickGetItem = 'user';
        this.iconViewDialog = 'mdi-account-question';
        this.titleViewDialog = item.title;
        this.viewDialog = true;
      },

      clickLogMsg(item) {
        this.selItem = item;
        this.clickGetItem = 'msg';
        this.iconViewDialog = 'mdi-circle-edit-outline';
        this.titleViewDialog = item.title;
        this.viewDialog = true;
      },
      waitLogMessages() {
        util.waitTimeout(() => {
          return this.service.findCountInStore('log-messages');
        }, () => {
          debug('created.logMessages:', this.logMessages);
        })
      },
      initNotifications() {
        let _item, dtCheckAt, items = [];
        dtCheckAt = moment.utc(0).format();
        let stateNoticesCheckAt = this.stateNotices.checkAt;
        if (stateNoticesCheckAt) {
          items = JSON.parse(stateNoticesCheckAt);
        }
        // Set checkAt for this.notifications and this.stateNotices.checkAt
        this.notifications.forEach(notice => {
          if (items.length > 0) {
            if (notice.logNames.length > 1) {
              notice.logNames.forEach(logName => {
                _item = items.find(item => item.name === logName);
                notice.checkAt = _item ? _item.checkAt : dtCheckAt;
                if (!_item) {
                  _item = {name: logName, checkAt: dtCheckAt};
                  items.push(_item);
                }
              })
            } else {
              _item = items.find(item => item.name === notice.logNames[0]);
              notice.checkAt = _item ? _item.checkAt : dtCheckAt;
              if (!_item) {
                _item = {name: notice.logNames[0], checkAt: dtCheckAt};
                items.push(_item);
              }
            }
          } else {
            if (notice.logNames.length > 1) {
              notice.logNames.forEach(logName => {
                _item = {name: logName, checkAt: dtCheckAt};
                items.push(_item);
              })
            } else {
              _item = {name: notice.logNames[0], checkAt: dtCheckAt};
              items.push(_item);
            }
            notice.checkAt = dtCheckAt;
          }
        });
        this.setStateNoticesCheckAt(JSON.stringify(items));
//        debug('initAppNotifications.notifications:', this.notifications);
      },
      toggleFullScreen() {
        let doc = window.document;
        let docEl = doc.documentElement;

        let requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
        let cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

        if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
          requestFullScreen.call(docEl);
          this.isToggleFullScreen = true;
        }
        else {
          cancelFullScreen.call(doc);
          this.isToggleFullScreen = false;
        }
      },
      ...mapMutations({
        setStateNoticesCheckAt: 'SET_NOTICES_CHECKAT',
      }),
    }
  };
</script>
