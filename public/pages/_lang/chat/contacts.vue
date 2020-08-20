<template>
  <div>
    <!--=== Page Header ===-->
    <app-page-header
      :page-title="description"
    ></app-page-header>
    <!-- ContactsView -->
    <flex-box-card
      :md="8"
      :outlined="true"
    >
      <template v-slot:tool-bar>
        <v-toolbar
          color="primary white--text headline"
          dark
        >
          <v-btn icon v-if="isMobile && !showUserList" class="mr-3" @click.stop="showUserList = true" :title="$t('chat_contacts.userList' )">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn icon v-if="isMobile && showUserList" class="mr-3" @click.stop="goToMsgList" :title="$t('chat_contacts.goToMsgList' )">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-toolbar-title>{{ isMobile && showUserList? $t('chat_contacts.userList') : $t('chat_contacts.userInfo') }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon class="" @click.stop="goToMsgList" :title="$t('chat_contacts.goToMsgList' )">
            <v-icon>mdi-comment-text-multiple</v-icon>
          </v-btn>
          <v-btn icon class="" @click.stop="goToChatSettings" :title="$t('chat_settings.goToSettings' )">
            <v-icon>mdi-message-settings</v-icon>
          </v-btn>
        </v-toolbar>
      </template>
      <v-row
        class="pa-4"
        :justify="isMobile? 'center' : 'space-between'"
      >
        <v-col
          :cols="isMobile? 12 : 6"
          v-if="isMobile? showUserList : true"
        >
          <!-- ContactUserList -->
          <contact-user-list
            :items="users"
            :index-selected="userSelected"
            v-on:onIndexSelected="modelUserSelected"
          ></contact-user-list>
        </v-col>

        <v-divider v-if="!isMobile" vertical></v-divider>

        <v-col
          v-if="isMobile? !showUserList : true"
          class="d-flex text-center justify-center align-center"
        >
          <!-- UserInfo -->
          <user-info
            :item="getSelectedUser"
          ></user-info>
        </v-col>
      </v-row>
    </flex-box-card>
  </div>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex';
  import AppPageHeader from '~/components/app/layout/AppPageHeader';
  import FlexBoxCard from '~/components/widgets/containers/flex-box-card';
  import ContactUserList from '~/components/app/chat/contact-user-list';
  import UserInfo from '~/components/app/chat/user-info';

  const debug = require('debug')('app:page.chat-contacts');
  const isLog = false;

  export default {
    // layout: 'chat',
    components: {
      AppPageHeader,
      FlexBoxCard,
      ContactUserList,
      UserInfo
    },
    data() {
      return {
        title: this.$t('chat_contacts.title'),
        description: this.$t('chat_contacts.description'),
        userSelected: -1,
        showUserList: true,
        srv: null
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
      this.initContacts();
    },
    watch: {
      userSelected(val) {
        if (val > -1) {
          this.showUserList = false;
          if(this.chat.contactSelected !== val){
            this.setSelectedContact(val)
          }
        }
      }
    },
    computed: {
      ...mapGetters({
        theme: 'getTheme',
        user: 'getUser',
        chat: 'getChat',
        fullPath: 'getFullPath',
        isMyTeam: 'isMyTeam'
      }),
      users() {
        const data = [];
        if(this.user){
          const users = this.srv.getChatUsers();
          const idField = this.srv.getServiceIdField('users');
          users.forEach(user => {
            const userId = user[idField];
            // Get user
            let item = {
              id: userId,
              firstName: user.firstName,
              lastName: user.lastName,
              fullName: user.fullName,
              email: user.email,
              avatar: user.avatar,
              profile: user.profile,
              roleName: user.role ? user.role.name : '',
              teamNames: user.teams.map(team => team.name).join(', ')
            };
            data.push(item);
          });
        }
        return data
      },
      getSelectedUser(){
        return this.userSelected === -1? null :  this.users[this.userSelected];
      },
      isMobile(){
        return this.$vuetify.breakpoint.smAndDown
      }
    },
    methods: {
      ...mapMutations({
        setSelectedContact: 'SET_CHAT_SELECTED_CONTACT'
      }),
      initContacts: function () {
        if(this.chat.contactSelected !== -1){
          this.userSelected = this.chat.contactSelected;
        }
      },
      modelUserSelected: function (newValue) {
        this.userSelected = newValue
      },
      goToMsgList: function () {
        this.$redirect(this.fullPath('/chat/messages'));
      },
      goToChatSettings: function () {
        this.$redirect(this.fullPath('/chat/settings'));
      },
    },
  }
</script>
