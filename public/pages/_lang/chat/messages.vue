<template>
  <div>
    <!--=== Page Header ===-->
    <app-page-header
      :page-title="description"
    ></app-page-header>

    <!--=== Confirm Dialog ===-->
    <confirm-dialog
      :dialog="confirmDialog"
      :title-dialog="$t('management.confirm_delete_title')"
      :text-dialog="$t('management.confirm_delete_description')"
      :run-action="removeChatMsg"
      v-on:onCloseDialog="confirmDialog = false"
    ></confirm-dialog>

    <!--=== Msg Edit Dialog ===-->
    <save-dialog
      :dialog="saveDialog"
      :on-submit="onSaveChatMsg"
      :close-dialog="closeSaveDialog"
      :loading-submit="loadingSubmit"
      :is-new-item="false"
      :dialog-title="titleSaveDialog()"
      :content-title="titleSaveDialog()"
      :action-save-text="$t('management.save')"
      :action-cancel-text="$t('management.cancel')"
    >
      <!-- Slot save-content -->
      <div slot="save-content">
        <v-row>
          <v-col cols="12">
            <v-textarea
              v-model="editedItem.msg"
              :value="editedItem.msg"
              :label="$t('chat_messages.editMessage')"
            ></v-textarea>
          </v-col>
        </v-row>
      </div>
    </save-dialog>

    <!-- MessagesView -->
    <flex-box-card
      :md="10"
      :outlined="true"
    >
      <template v-slot:tool-bar>
        <v-toolbar
          color="primary white--text headline"
          dark
        >
          <v-btn icon v-if="isMobile && !showUserList" class="mr-3" @click.stop="showUserList = true"
                 :title="$t('chat_messages.userList' )">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-toolbar-title>{{ isMobile && showUserList? $t('chat_messages.userList') : $t('chat_messages.userMessages') }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon class="" @click.stop="goToChatContacts" :title="$t('chat_messages.goToContacts')">
            <v-icon>mdi-account-multiple</v-icon>
          </v-btn>
          <v-btn icon class="" @click.stop="goToChatSettings" :title="$t('chat_settings.goToSettings')">
            <v-icon>mdi-message-settings</v-icon>
          </v-btn>
        </v-toolbar>
      </template>
      <v-row>
        <!-- FlexBoxList -->
        <v-col
          :cols="isMobile? 12 : 4"
          v-if="isMobile? showUserList : true"
        >
          <flex-box-list
            :md="12"
            :vlists="3"
            :elevation="0"
          >
            <!-- MsgRoleList -->
            <template v-slot:list1>
              <msg-group-list
                :items="roles"
                :index-selected="roleSelected"
                :subheader="roles.length? $t('chat_messages.roles') : ''"
                v-on:onIndexSelected="modelRoleSelected"
              ></msg-group-list>
            </template>
            <!-- MsgTeamList -->
            <template v-slot:list2>
              <msg-group-list
                :items="teams"
                :index-selected="teamSelected"
                :subheader="teams.length? $t('chat_messages.teams') : ''"
                v-on:onIndexSelected="modelTeamSelected"
              ></msg-group-list>
            </template>
            <!-- MsgUserList -->
            <template v-slot:list3>
              <msg-user-list
                :items="users"
                :index-selected="userSelected"
                :subheader="users.length? $t('chat_messages.users') : ''"
                v-on:onIndexSelected="modelUserSelected"
              ></msg-user-list>
            </template>
          </flex-box-list>
        </v-col>
        <!-- Divider -->
        <v-col
          v-if="!isMobile"
          cols="auto"
        >
          <v-divider vertical></v-divider>
        </v-col>
        <!-- MsgPostList -->
        <v-col
          v-if="isMobile? !showUserList : true"
          :cols="isMobile? 12 : 7"
          :class="theme.dark? '' : 'pl-10'"
        >
          <!-- MsgPostList -->
          <msg-post-list
            :items="getSelectedMessages"
            :is-selected-item="isSelectedItem"
            v-on:onSendPost="onSendPost"
            v-on:onShowContact="onShowContact"
            v-on:onRemoveMsg="onRemoveMsg"
            v-on:onEditMsg="onEditMsg"
          ></msg-post-list>
        </v-col>
      </v-row>
    </flex-box-card>
  </div>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex';
  import moment from 'moment';
  import createLogMessage from '~/plugins/service-helpers/create-log-message';
  import ConfirmDialog from '~/components/dialogs/ConfirmDialog';
  import SaveDialog from '~/components/dialogs/SaveDialog';
  import AppPageHeader from '~/components/app/layout/AppPageHeader';
//  import ServiceClient from '~/plugins/service-helpers/service-client.class';
  import FlexBoxCard from '~/components/widgets/containers/flex-box-card';
  import FlexBoxList from '~/components/widgets/containers/flex-box-list';
  import MsgUserList from '~/components/app/chat/msg-user-list';
  import MsgGroupList from '~/components/app/chat/msg-group-list';
  import MsgPostList from '~/components/app/chat/msg-post-list';

  const debug = require('debug')('app:page.chat-messages');
  const isLog = false;

  export default {
    // layout: 'chat',
    components: {
      ConfirmDialog,
      SaveDialog,
      AppPageHeader,
      FlexBoxCard,
      FlexBoxList,
      MsgUserList,
      MsgGroupList,
      MsgPostList
    },
    data() {
      return {
        title: this.$t('chat_messages.title'),
        description: this.$t('chat_messages.description'),
        confirmDialog: false,
        saveDialog: false,
        saveLogMessage: null,
        error: undefined,
        loadingSubmit: false,
        dtDate: '',
        userSelected: -1,
        roleSelected: -1,
        teamSelected: -1,
        showUserList: true,
        msgId: null,
        editedItem: {
          msg: '',
        },
        srv: null,
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
      this.srv = new this.$Service(this.$store);
      this.saveLogMessage = createLogMessage(this.$store);
      this.initChat();
    },
    watch: {
      userSelected(val, oldVal) {
        if (val > -1) {
          this.dtDate = '';
          this.showUserList = false;
          this.roleSelected = -1;
          this.teamSelected = -1;
          if(this.chat.userSelected !== val){
            this.setSelectedItem({
              userSelected: val,
              roleSelected: -1,
              teamSelected: -1
            })
          }
        }
        if(oldVal > -1){
          if(this.user){
            const user = this.users[oldVal];
            const messages = this.messages.filter(msg => this.srv.isUserChatMsg(user.id, msg));
            const dtCheckAt = this.srv.getChatDTCheckAt('user', user.id, true);
            const msgInfo = this.srv.getChatMsgInfo(messages, dtCheckAt);
            user.msgInfo = Object.assign({}, msgInfo);
          }
        }
      },
      roleSelected(val, oldVal) {
        if (val > -1) {
          this.dtDate = '';
          this.showUserList = false;
          this.userSelected = -1;
          this.teamSelected = -1;
          if(this.chat.roleSelected !== val){
            this.setSelectedItem({
              userSelected: -1,
              roleSelected: val,
              teamSelected: -1
            })
          }
        }
        if(oldVal > -1){
          if(this.user){
            const role = this.roles[oldVal];
            const messages = this.messages.filter(msg => this.srv.isRoleChatMsg(role.id, msg));
            const dtCheckAt = this.srv.getChatDTCheckAt('role', role.id, true);
            const msgInfo = this.srv.getChatMsgInfo(messages, dtCheckAt);
            role.msgInfo = msgInfo;
          }
        }
      },
      teamSelected(val, oldVal) {
        if (val > -1) {
          this.dtDate = '';
          this.showUserList = false;
          this.userSelected = -1;
          this.roleSelected = -1;
          if(this.chat.teamSelected !== val){
            this.setSelectedItem({
              userSelected: -1,
              roleSelected: -1,
              teamSelected: val
            })
          }
        }
        if(oldVal > -1){
          if(this.user){
            const team = this.teams[oldVal];
            const messages = this.messages.filter(msg => this.srv.isTeamChatMsg(team.id, msg));
            const dtCheckAt = this.srv.getChatDTCheckAt('team', team.id, true);
            const msgInfo = this.srv.getChatMsgInfo(messages, dtCheckAt);
            team.msgInfo = msgInfo;
          }
        }
      },
      saveDialog(val) {
        if (val) {
          this.$validator.reset();
          this.dismissError();
        }
      }
    },
    computed: {
      ...mapGetters({
        theme: 'getTheme',
        user: 'getUser',
        isYouAuth: 'isYouAuth',
        chat: 'getChat',
        fullPath: 'getFullPath',
        isMyTeam: 'isMyTeam'
      }),
      getStoreUsers() {
        return this.srv.findInStore('users', {query: {$sort: {fullName: 1}}});
      },
      users() {
        const data = [];
        let msgInfo = {};
        if(this.user){
          const users = this.srv.getChatUsers();
          const idField = this.srv.getServiceIdField('users');
          users.forEach(user => {
            msgInfo = {};
            const userId = user[idField];
            const messages = this.srv.getChatMessages().filter(msg => this.srv.isUserChatMsg(userId, msg));
            if(messages.length){
              const dtCheckAt = this.srv.getChatDTCheckAt('user', userId);
              msgInfo = this.srv.getChatMsgInfo(messages, dtCheckAt);
            }
            // Get user
            let item = {
              id: userId,
              firstName: user.firstName,
              lastName: user.lastName,
              fullName: user.fullName,
              email: user.email,
              avatar: user.avatar,
              roleName: user.role ? user.role.name : '',
              msgInfo,
            };
            data.push(item);
          });
        }
        return data
      },
      getSelectedUser() {
        return this.userSelected === -1 ? null : this.users[this.userSelected];
      },
      roles() {
        const data = [];
        let msgInfo = {};
        if(this.user){
          const roles = this.srv.getChatRoles();
          const idField = this.srv.getServiceIdField('roles');
          roles.forEach(role => {
            msgInfo = {};
            const roleId = role[idField];
            const messages = this.srv.getChatMessages().filter(msg => this.srv.isRoleChatMsg(roleId, msg));
            if(messages.length){
              const dtCheckAt = this.srv.getChatDTCheckAt('role', roleId);
              msgInfo = this.srv.getChatMsgInfo(messages, dtCheckAt);
            }
            // Get role
            let item = {
              id: roleId,
              name: role.name,
              description: role.description,
              alias: role.alias,
              msgInfo,
              icon: 'mdi-security',
              iconClass: 'grey lighten-1 white--text'
            };
            data.push(item);
          });
        }
        return data
      },
      getSelectedRole() {
        return this.roleSelected === -1 ? null : this.roles[this.roleSelected];
      },
      teams() {
        const data = [];
        let msgInfo = {};
        if(this.user){
          const teams = this.srv.getChatTeams();
          const idField = this.srv.getServiceIdField('teams');
          teams.forEach(team => {
            msgInfo = {};
            const teamId = team[idField];
            const messages = this.srv.getChatMessages().filter(msg => this.srv.isTeamChatMsg(teamId, msg));
            if(messages.length){
              const dtCheckAt = this.srv.getChatDTCheckAt('team', teamId);
              msgInfo = this.srv.getChatMsgInfo(messages, dtCheckAt);
            }
            // Get team
            let item = {
              id: teamId,
              name: team.name,
              description: team.description,
              alias: team.alias,
              msgInfo,
              icon: 'mdi-account-group',
              iconClass: 'blue white--text'
            };
            data.push(item);
          });
        }
        return data
      },
      getSelectedTeam() {
        return this.teamSelected === -1 ? null : this.teams[this.teamSelected];
      },
      messages() {
        const data = [];
        if(this.user){
          const idField = this.srv.getServiceIdField('chat-messages');
          const messages = this.srv.getChatMessages();
          messages.forEach(msg => {
            const msgId = msg[idField];
            // Get msg
            let item = {
              id: msgId,
              msg: msg.msg,
              dt: msg.dtLocal,
              dtUTC: msg.dtUTC,
              dtUpdatedAt: msg.dtUpdatedAtLocal,
              isOwnerAuth: this.isYouAuth(msg.ownerId),
              ownerId: msg.ownerId,
              userId: msg.userId,
              roleId: msg.roleId,
              teamId: msg.teamId,
              owner: msg.owner,
              user: msg.user,
              role: msg.role,
              team: msg.team
            };
            data.push(item);
          });
        }
        return data
      },
      getSelectedMessages() {
        let messages = [], user, role, team, msgInfo, dtCheckAt;
        let goToPost = false, lastPost = null;
        if (this.getSelectedUser) {
          user = this.getSelectedUser;
          messages = this.messages.filter(msg => this.srv.isUserChatMsg(user.id, msg));
          if(messages.length){
            // Get msgInfo
            dtCheckAt = this.srv.getChatDTCheckAt('user', user.id);
            msgInfo = this.srv.getChatMsgInfo(messages, dtCheckAt);
            // Clear goToPost prop from msg
            this.clearGoToPostMsg(messages);
            // Set goToPost prop for last msg
            messages = messages.map((msg, index) => {
              msg.isNew =  msgInfo.countMsg? ((messages.length - index) <= msgInfo.countMsg) : false;
              if(!goToPost && msg.isNew){
                goToPost = true;
                msg.goToPost = true
              }
              return msg;
            });
            if(messages.findIndex(msg => msg.goToPost) === -1){
              lastPost = messages[messages.length - 1];
              lastPost.goToPost = true;
            }
            goToPost = false;
          }
        }
        if (this.getSelectedRole) {
          role = this.getSelectedRole;
          messages = this.messages.filter(msg => this.srv.isRoleChatMsg(role.id, msg));
          if(messages.length){
            // Get msgInfo
            dtCheckAt = this.srv.getChatDTCheckAt('role', role.id);
            msgInfo = this.srv.getChatMsgInfo(messages, dtCheckAt);
            // Clear goToPost prop from msg
            this.clearGoToPostMsg(messages);
            // Set goToPost prop for last msg
            messages = messages.map((msg, index) => {
              msg.isNew =  msgInfo.countMsg? ((messages.length - index) <= msgInfo.countMsg) : false;
              if(msg.isNew && !goToPost){
                goToPost = true;
                msg.goToPost = true
              }
              return msg;
            });
            if(messages.findIndex(msg => msg.goToPost) === -1){
              lastPost = messages[messages.length - 1];
              lastPost.goToPost = true;
            }
            goToPost = false;
          }
        }
        if (this.getSelectedTeam) {
          team = this.getSelectedTeam;
          messages = this.messages.filter(msg => this.srv.isTeamChatMsg(team.id, msg));
          if(messages.length){
            // Get msgInfo
            dtCheckAt = this.srv.getChatDTCheckAt('team', team.id);
            msgInfo = this.srv.getChatMsgInfo(messages, dtCheckAt);
            // Clear goToPost prop from msg
            this.clearGoToPostMsg(messages);
            // Set goToPost prop for last msg
            messages = messages.map((msg, index) => {
              msg.isNew =  msgInfo.countMsg? ((messages.length - index) <= msgInfo.countMsg) : false;
              if(msg.isNew && !goToPost){
                goToPost = true;
                msg.goToPost = true
              }
              return msg;
            });
            if(messages.findIndex(msg => msg.goToPost) === -1){
              lastPost = messages[messages.length - 1];
              lastPost.goToPost = true;
            }
            goToPost = false;
          }
        }
        // Set dtDate field for msg
        if(messages.length){
          messages = messages.map(msg => {
            const _dtDate = msg.dt.split(' ')[0];
            msg.dtDate = (_dtDate === this.dtDate) ? '' : _dtDate;
            if(msg.dtDate !== '' && msg.dtDate !== this.dtDate){
              this.dtDate = msg.dtDate;
            }
            return msg;
          });
        }
        return messages;
      },
      isSelectedItem() {
        return !!this.getSelectedUser || !!this.getSelectedRole || !!this.getSelectedTeam;
      },
      isMobile() {
        return this.$vuetify.breakpoint.smAndDown
      }
    },
    methods: {
      ...mapMutations({
        showSuccess: 'SHOW_SUCCESS',
        showError: 'SHOW_ERROR',
        setSelectedItem: 'SET_CHAT_SELECTED_ITEM',
        setSelectedContact: 'SET_CHAT_SELECTED_CONTACT',
        setChatCheckat: 'SET_CHAT_CHECKAT'
      }),
      initChat: function () {
        this.userSelected = this.chat.userSelected;
        this.roleSelected = this.chat.roleSelected;
        this.teamSelected = this.chat.teamSelected;
      },
      clearGoToPostMsg: function (messages) {
        messages.map(msg => {
          if(msg.goToPost){
            delete msg.goToPost;
          }
          return msg
        })
      },
      modelUserSelected: function (newValue) {
        this.userSelected = newValue
      },
      modelRoleSelected: function (newValue) {
        this.roleSelected = newValue
      },
      modelTeamSelected: function (newValue) {
        this.teamSelected = newValue
      },
      onSendPost: function (newValue) {
        if (isLog) debug('methods.sendPost.newValue:', newValue);
        this.createChatMsg(newValue);
      },
      onShowContact: function (ownerId) {
        const idField = this.$store.state.users.idField;
        const users = this.getStoreUsers;
        const userIndex = users.findIndex(user => {
          return  user[idField] === ownerId
        });
        if (isLog) debug('methods.onShowContact.userIndex:', userIndex);
        this.setSelectedContact(userIndex);
        this.$redirect(this.fullPath('/chat/contacts'));
      },
      onRemoveMsg: function (msgId) {
        this.msgId = msgId;
        this.confirmDialog = true;
      },
      onEditMsg(msgId) {
        this.msgId = msgId;
        const idField = this.$store.state['chat-messages'].idField;
        const {ChatMessage} = this.$FeathersVuex;
        this.editedItem.msg = ChatMessage.getFromStore(msgId).msg;
        this.saveDialog = true;
      },
      goToChatSettings: function () {
        this.$redirect(this.fullPath('/chat/settings'));
      },
      goToChatContacts: function () {
        this.$redirect(this.fullPath('/chat/contacts'));
      },
      closeSaveDialog() {
        this.saveDialog = false;
        this.editedItem.msg = '';
        this.$validator.reset();
        this.dismissError();
      },
      titleSaveDialog() {
        return this.msgId? this.$t('management.edit_item') : this.$t('management.new_item')
      },
      dismissError() {
        this.error = undefined;
      },
      createChatMsg: function (msg) {
        let chatMessage;
        let data = {};
        const idFieldUser = this.$store.state.users.idField;
        // data
        data.msg = msg;
        data.ownerId = this.user[idFieldUser];
        if (this.getSelectedUser) {
          data.userId = this.getSelectedUser.id;
        }
        if (this.getSelectedRole) {
          data.roleId = this.getSelectedRole.id;
        }
        if (this.getSelectedTeam) {
          data.teamId = this.getSelectedTeam.id;
        }
        try {
          const {ChatMessage} = this.$FeathersVuex;
          chatMessage = new ChatMessage(data);
          chatMessage.save();
          this.showSuccess(`${this.$t('management.success')}!`);
        } catch (error) {
          if (isLog) debug('createChatMsg.error:', error);
          this.showError(error.message);
          this.saveLogMessage('ERROR-CLIENT', {error});
        }
      },
      async removeChatMsg() {
        try {
          this.confirmDialog = false;
          const {ChatMessage} = this.$FeathersVuex;
          const idField = this.$store.state['chat-messages'].idField;
//          const msg = new ChatMessage({[idField]: this.msgId, msg: ''});
//          await msg.save();
          const msg = new ChatMessage({[idField]: this.msgId});
          await msg.remove();
          this.msgId = null;
          this.showSuccess(`${this.$t('management.success')}!`);
        } catch (error) {
          if (isLog) debug('removeChatMsg.error:', error);
          this.showError(error.message);
          this.saveLogMessage('ERROR-CLIENT', {error});
        }
      },
      async onSaveChatMsg() {
        try {
          this.dismissError();
          await this.$validator.validateAll();
          if (this.$validator.errors.any()) {
            this.showError('Validation Error!');
          } else {
            this.loadingSubmit = true;
            if (isLog) debug('formData:', this.editedItem);
            const {ChatMessage} = this.$FeathersVuex;
            const idField = this.$store.state['chat-messages'].idField;
            const msg = new ChatMessage({[idField]: this.msgId, msg: this.editedItem.msg});
            await msg.save();
            this.msgId = null;
            this.loadingSubmit = false;
            this.closeSaveDialog();
          }
        } catch (error) {
          if (isLog) debug('onSaveChatMsg.error:', error);
          this.loadingSubmit = false;
          this.showError(error.message);
          this.saveLogMessage('ERROR-CLIENT', {error});
        }
      },
    },
  }
</script>
