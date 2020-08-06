<template>
  <div>
    <!--=== Page Header ===-->
    <app-page-header
      :page-title="description"
    ></app-page-header>
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
          ></msg-post-list>
        </v-col>
      </v-row>
    </flex-box-card>
  </div>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex';
  import moment from 'moment';
  import AppPageHeader from '~/components/app/layout/AppPageHeader';
  import ServiceHelper from '~/plugins/service-helpers/service-client.class';
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
        dtDate: '',
        userSelected: -1,
        roleSelected: -1,
        teamSelected: -1,
        showUserList: true,
        sh: null
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
      this.sh = new ServiceHelper(this.$store);
      this.initChat();
    },
    watch: {
      userSelected(val) {
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
      },
      roleSelected(val) {
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
      },
      teamSelected(val) {
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
        const {User} = this.$FeathersVuex;
        return User.findInStore({query: {$sort: {fullName: 1}}}).data;
      },
      users() {
        const data = [];
        if(this.user){
          const idField = this.$store.state.users.idField;
          const authUserId = this.user[idField];
          let users = this.getStoreUsers;
          users = users.filter(this.isFilterUser);
          users.forEach(user => {
            const userId = user[idField];
            const messages = this.messages.filter(msg => this.isUserMsg(userId, msg));
            const timeLabel = messages.length ? moment(messages[0].dt).fromNow() : '';
            const countMsg = messages.length ? messages.length : 0;
            const lastMsg = messages.length ? messages[0].msg : '';
            // Get user
            let item = {
              id: userId,
              firstName: user.firstName,
              lastName: user.lastName,
              fullName: user.fullName,
              email: user.email,
              avatar: user.avatar,
              roleName: user.role ? user.role.name : '',
              timeLabel,
              countMsg,
              lastMsg
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
        if(this.user){
          const idField = this.$store.state.roles.idField;
          const {Role} = this.$FeathersVuex;
          let roles = Role.findInStore({query: {$sort: {name: 1}}}).data;
          roles = roles.filter(this.isFilterRole);
          roles.forEach(role => {
            const roleId = role[idField];
            const messages = this.messages.filter(msg => this.isRoleMsg(roleId, msg));
            const timeLabel = messages.length ? moment(messages[0].dt).fromNow() : '';
            const countMsg = messages.length ? messages.length : 0;
            const lastMsg = messages.length ? messages[0].msg : '';
            // Get role
            let item = {
              id: roleId,
              name: role.name,
              description: role.description,
              alias: role.alias,
              timeLabel,
              countMsg,
              lastMsg,
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
        if(this.user){
          const idField = this.$store.state.teams.idField;
          const {Team} = this.$FeathersVuex;
          let teams = Team.findInStore({query: {$sort: {name: 1}}}).data;
          teams = teams.filter(this.isFilterTeam);
          teams.forEach(team => {
            const teamId = team[idField];
            const messages = this.messages.filter(msg => this.isTeamMsg(teamId, msg));
            // const messages = this.messages;
            const timeLabel = messages.length ? moment(messages[0].dt).fromNow() : '';
            const countMsg = messages.length ? messages.length : 0;
            const lastMsg = messages.length ? messages[0].msg : '';
            // Get team
            let item = {
              id: teamId,
              name: team.name,
              description: team.description,
              alias: team.alias,
              timeLabel,
              countMsg,
              lastMsg,
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
          const idField = this.$store.state['chat-messages'].idField;
          const {ChatMessage} = this.$FeathersVuex;
          let messages = ChatMessage.findInStore({query: {$sort: {createdAt: 1}}}).data;
          messages = messages.filter(this.isFilterMsg)
          messages.forEach(msg => {
            const msgId = msg[idField];
            // const _dtDate = msg.dtLocal.split(' ')[0];
            // Get msg
            let item = {
              id: msgId,
              msg: msg.msg,
              dt: msg.dtLocal,
              // dtDate: (_dtDate === this.dtDate) ? '' : _dtDate,
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
            // if(item.dtDate !== '' && item.dtDate !== this.dtDate){
            //   this.dtDate = item.dtDate;
            // }
            data.push(item);
          });
        }
        return data
      },
      getSelectedMessages() {
        let messages = [], user, role, team;
        if (this.getSelectedUser) {
          user = this.getSelectedUser;
          messages = this.messages.filter(msg => this.isUserMsg(user.id, msg));
        }
        if (this.getSelectedRole) {
          role = this.getSelectedRole;
          messages = this.messages.filter(msg => this.isRoleMsg(role.id, msg));
        }
        if (this.getSelectedTeam) {
          team = this.getSelectedTeam;
          messages = this.messages.filter(msg => this.isTeamMsg(team.id, msg));
          // debug('getSelectedMessages.messages:', messages);
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
        setSelectedContact: 'SET_CHAT_SELECTED_CONTACT'
      }),
      initChat: function () {
        this.userSelected = this.chat.userSelected;
        this.roleSelected = this.chat.roleSelected;
        this.teamSelected = this.chat.teamSelected;
      },
      isUserMsg: function (userId, msg) {
        let result = false;
        const idField = this.$store.state.users.idField;
        const authUserId = this.user[idField];
        const msgUserId = msg.user? msg.userId : null;
        // I wrote to the selected user || The selected user wrote to me
        if(msgUserId){
          result = ((userId === msgUserId) && (authUserId === msg.ownerId)) ||
            ((userId === msg.ownerId) && (authUserId === msgUserId));
        }
        return result
      },
      isTeamMsg: function (teamId, msg) {
        let result = false;
        const idField = this.$store.state.users.idField;
        const authUserId = this.user[idField];
        const msgTeamId = msg.team? msg.teamId : null;
        // I wrote to the selected team || I am a member of the selected team
        if(teamId === msgTeamId){
          result = this.isMyTeam(authUserId, teamId) || (authUserId === msg.ownerId)
        }
        return result
      },
      isRoleMsg: function (roleId, msg) {
        let result = false;
        const idField = this.$store.state.users.idField;
        const authUserId = this.user[idField];
        const msgRoleId = msg.role? msg.roleId : null;
        // I wrote to the selected role || This is my role
        if(roleId === msgRoleId){
          result = (this.user.roleId === roleId) || (authUserId === msg.ownerId)
        }
        return result
      },
      isFilterRole: function (role) {
        const idField = this.$store.state.roles.idField;
        const isRole = (this.user.roleAlias === 'isAdministrator')? true : ( role[idField] === this.user.roleId);
        return (role.alias === 'isAdministrator') || isRole;
      },
      isFilterTeam: function (team) {
        const idTeamField = this.$store.state.teams.idField;
        const idUserField = this.$store.state.users.idField;
        const isTeam = (this.user.roleAlias === 'isAdministrator')? true : this.isMyTeam(this.user[idUserField], team[idTeamField]);
        return isTeam;
      },
      isFilterUser: function (user) {
        const idField = this.$store.state.users.idField;
        const authUserId = this.user[idField];
        const userId = user[idField];
        const msgOwnerIds = this.messages.map(msg => msg.ownerId);
        const msgUserIds = this.messages.filter(msg => !!msg.user).map(msg => msg.userId);
        const isMsgOwner = (msgOwnerIds.findIndex(id => id === userId) > -1);
        const isMsgUser = (msgUserIds.findIndex(id => id === userId) > -1);
        return (userId !== authUserId) && (isMsgOwner || isMsgUser);
        /*
        result = ((userId === msgUserId) && (authUserId === msg.ownerId)) ||
            ((userId === msg.ownerId) && (authUserId === msgUserId));
         */
      },
      isFilterMsg: function (msg) {
        const idField = this.$store.state.users.idField;
        const authUserId = this.user[idField];
        const isMsgOwner = (msg.ownerId === authUserId);
        const isMsgUser = (msg.userId === authUserId);
        const isMsgRole = (msg.roleId === this.user.roleId);
        const isMsgTeam = this.isMyTeam(authUserId, msg.teamId);
        // return (isMsgOwner || isMsgUser || isMsgRole || isMsgTeam);
        return (isMsgOwner || isMsgUser || isMsgRole || isMsgTeam);
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
        if (isLog) debug('methods.sendPost.newValue:', newValue)
        this.saveChatMsg(newValue);
      },
      onShowContact: function (ownerId) {
        const idField = this.$store.state.users.idField;
        const users = this.getStoreUsers;
        const userIndex = users.findIndex(user => {
          return  user[idField] === ownerId
        });
        if (isLog) debug('methods.onShowContact.userIndex:', userIndex)
        this.setSelectedContact(userIndex);
        this.$redirect(this.fullPath('/chat/contacts'));
      },
      goToChatSettings: function () {
        this.$redirect(this.fullPath('/chat/settings'));
      },
      goToChatContacts: function () {
        this.$redirect(this.fullPath('/chat/contacts'));
      },
      saveChatMsg: function (msg) {
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
          if (isLog) debug('methods.saveChatMsg.error:', error);
          this.showError(error.message);
        }
      },
    },
  }
</script>
