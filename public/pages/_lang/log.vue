<template>
  <div>
    <!--=== Page Header ===-->
    <app-page-header
      :page-title="description"
    ></app-page-header>
    <!--=== Confirm Dialog ===-->
    <confirm-dialog
      :dialog="confirmDialog"
      :title-dialog="titleConfirmDialog"
      :text-dialog="textConfirmDialog"
      :run-action="runActionConfirmDialog"
      v-on:onCloseDialog="confirmDialog = false"
    ></confirm-dialog>
    <!--=== Owner/User for log message dialog ===-->
    <view-dialog
      :dialog="viewDialog"
      :header-icon="iconViewDialog"
      :header-title="titleViewDialog"
      :action-text="$t('management.close')"
      v-on:onClose="viewDialog = false"
    >
      <div slot="list-content">
          <v-list-item v-if="clickGetItem === 'owner'">
            <v-list-item-avatar><img :src="selItem.owner.avatar"></v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title v-html="selItem.owner.fullName"></v-list-item-title>
              <v-list-item-subtitle
                v-html="`<span class='font-italic'>Email:</span> ${selItem.owner.email}`"></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="clickGetItem === 'user'">
            <v-list-item-avatar><img :src="selItem.user.avatar"></v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title v-html="selItem.user.fullName"></v-list-item-title>
              <v-list-item-subtitle
                v-html="`<span class='font-italic'>Email:</span> ${selItem.user.email}`"></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
      </div>
      <div slot="text-content">
        <v-textarea
          v-if="clickGetItem === 'msg'"
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
    <!--=== Log message table ===-->
    <v-row justify="center">
      <v-col cols="12" sm="10">
        <v-card
          :color="theme.dark? 'secondary' : ''"
          :dark="theme.dark? true : false"
        >
          <!-- Toolbar -->
          <v-toolbar color="primary" dark>
            <v-app-bar-nav-icon></v-app-bar-nav-icon>
            <v-toolbar-title>{{ $t('logMessages.title') }}</v-toolbar-title>
          </v-toolbar>
          <!-- Text content -->
          <v-card-text>
            <!-- TopBar for table -->
            <table-top-bar
              :search="search"
              :search-label="$t('management.search')"
              :btn-text="$t('logMessages.removeAll')"
              :btn-disabled="isAdmin? !selected.length : true"
              :btn-click="clickRemoveItems"
              v-on:onSearch="search = $event"
            ></table-top-bar>

            <!-- Data Table -->
            <v-data-table
              :class="theme.dark? 'secondary' : ''"
              :dark="theme.dark? true : false"
              v-model="selected"
              :headers="headers"
              :items="logMessages"
              item-key="id"
              :search="search"
              show-select
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
              <!-- Field Actions -->
              <template v-slot:item.actions="{ item }">
                <v-icon
                  small
                  @click="clickRemoveItem(item)"
                  :title="$t('common.remove')"
                  :disabled="!isAdmin"
                >fas fa-trash-alt
                </v-icon>
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
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex'
  import AppPageHeader from '~/components/app/layout/AppPageHeader';
  import TableTopBar from '~/components/widgets/top-bars/SearchAndBtn';
  import ConfirmDialog from '~/components/dialogs/ConfirmDialog';
  import ViewDialog from '~/components/dialogs/ViewDialog';
  import jsonLogData from '~/api/app/app-log-msg.json';
  import Service from '~/plugins/service-helpers/service-client.class';
  import createLogMessage from '~/plugins/service-helpers/create-log-message';

  const errors = require('@feathersjs/errors');

  const debug = require('debug')('app:page.log');
  const isLog = false;
  const isDebug = false;

  /**
   * Get log data
   * @param name
   * @return {Object}
   */
  const getLogData = (name) => {
    return jsonLogData.filter(item => !item.isConfig).find(item => item.name === name);
  };

  const configLogData = jsonLogData.find(item => item.isConfig);


  export default {
    components: {
      AppPageHeader,
      TableTopBar,
      ConfirmDialog,
      ViewDialog
    },
    data() {
      return {
        title: this.$t('logMessages.title'),
        description: this.$t('logMessages.description'),
        service: null,
        saveLogMessage: null,
        search: '',
        selected: [],
        confirmDialog: false,
        titleConfirmDialog: '',
        textConfirmDialog: '',
        runActionConfirmDialog: null,
        viewDialog: false,
        iconViewDialog: '',
        titleViewDialog: '',
        clickGetItem: '',// user, owner, msg
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
          {
            text: 'Actions',
            value: 'actions',
            align: 'center',
            sortable: false
          },
        ],
        editedIndex: -1,
        idItem: null,
        selItem: {},
      }
    },
    head() {
      return {
        title: this.title,
        meta: [
          {hid: 'description', name: 'description', content: this.description}
        ],
      }
    },
    created: function () {
      this.service = new Service(this.$store);
      this.saveLogMessage = createLogMessage(this.$store);
    },
    computed: {
      ...mapGetters({
        config: 'getConfig',
        theme: 'getTheme',
        isAdmin: 'isAdmin'
      }),
      logMessages() {
        const data = [];
        const idFieldLogMessage = this.$store.state['log-messages'].idField;
        const {LogMessage} = this.$FeathersVuex;
        const logMessages = LogMessage.findInStore({query: {$sort: {createdAt: -1}}}).data;
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
    },
    methods: {
      clickRemoveItems() {
        this.titleConfirmDialog = this.$t('logMessages.confirmDeleteItemsTitle');
        this.textConfirmDialog = this.$t('logMessages.confirmDeleteItemsText');
        this.runActionConfirmDialog = this.removeItems;
        this.confirmDialog = true;
      },

      async removeItems() {
        try {
          this.confirmDialog = false;
          // Remove log-messages
          this.selected.forEach(async item => await this.service.remove('log-messages', item.id));
          this.showSuccess(`${this.$t('management.success')}!`);
          // Save log-message
          this.saveLogMessage('LOG-MESSAGE-REMOVE', {selected: this.selected});
        } catch (error) {
          if (isLog) debug('removeItems.error:', error);
          this.showError(error.message);
          this.saveLogMessage('ERROR-CLIENT', {error});
        }
      },

      clickRemoveItem(item) {
        this.selItem = item;
        this.titleConfirmDialog = this.$t('logMessages.confirmDeleteItemTitle');
        this.textConfirmDialog = this.$t('logMessages.confirmDeleteItemText');
        this.runActionConfirmDialog = this.removeItem;
        this.confirmDialog = true;
      },

      async removeItem() {
        try {
          this.confirmDialog = false;
          // Remove log-message
          await this.service.remove('log-messages', this.selItem.id);
          this.showSuccess(`${this.$t('management.success')}!`);
          // Save log-message
          this.saveLogMessage('LOG-MESSAGE-REMOVE', {selected: this.selItem});
        } catch (error) {
          if (isLog) debug('removeItem.error:', error);
          this.showError(error.message);
          this.saveLogMessage('ERROR-CLIENT', {error});
        }
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
      ...mapMutations({
        showSuccess: 'SHOW_SUCCESS',
        showError: 'SHOW_ERROR',
      }),
    }
  }
</script>
