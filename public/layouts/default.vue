<template>
  <v-app id="app-admin">
    <!-- Top toolbar -->
    <app-toolbar
      v-on:onNavLeft="navLeft = !navLeft"
      ref="refAppToolbar"
    ></app-toolbar>
    <!-- Left Drawer -->
    <app-left-drawer
      :isAvatar="config.isAvatar"
      :logo-image="config.isAvatar? devAvatar():config.logoImage"
      :logo-title="config.logoTitle"
      :home-path="config.homePath"
      :app-menu="appMenu"
      :user="user"
      :drawer="navLeft"
      :badge-chat="10"
      v-on:onNavLeft="modelNavLeft"
    ></app-left-drawer>
    <!-- Page content -->
    <app-page-content
      :ref-app-toolbar="refAppToolbar"
    ></app-page-content>
    <!-- Go to top -->
    <app-fab></app-fab>
    <!-- Right Drawer -->
    <app-right-drawer
      ref="appRightDrawer"
    ></app-right-drawer>
    <!-- Snackbar -->
    <app-snack-bar
      :show="snackBar.show"
      :text="snackBar.text"
      :color="snackBar.color"
      :timeout="snackBar.timeout"
      v-on:onShow="modelSnackBar"
    ></app-snack-bar>
  </v-app>
</template>

<script>
  import {mapGetters, mapActions, mapMutations} from 'vuex';
  import AuthClient from '~/plugins/auth/auth-client.class';
  import ServiceClient from '~/plugins/service-helpers/service-client.class';
  import appMenu from '~/api/app/app-menu.json';
  import syncStore from '~/plugins/lib/sync-store';
  import AppToolbar from '~/components/app/layout/AppToolbar';
  import AppLeftDrawer from '~/components/app/layout/AppLeftDrawer';
  import AppPageContent from '~/components/app/layout/AppPageContent';
  import AppPageHeader from '~/components/app/layout/AppPageHeader';
  import AppFab from '~/components/layout/Fab';
  import AppRightDrawer from '~/components/app/layout/AppRightDrawer';
  import AppSnackBar from '~/components/layout/Snackbar';
  import feathersClient from '~/plugins/auth/feathers-client';

  const debug = require('debug')('app:layouts.default');
  const isDebug = false;

  export default {
    components: {
      AppLeftDrawer,
      AppToolbar,
      AppPageContent,
      AppPageHeader,
      AppFab,
      AppRightDrawer,
      AppSnackBar,
    },
    data: function () {
      return {
        navLeft: true,
        appMenu,
        refAppToolbar: null,
      }
    },
    created: function () {
    },
    mounted: function () {
      this.$nextTick(function () {
        // Get refAppToolbar
        this.refAppToolbar = Object.assign({}, this.$refs['refAppToolbar']);
        // Init vuetify
        syncStore.initVuetify(this, true);
        // Update services
        this.updateServices('created');
      })
    },
    destroyed: function () {
      this.updateServices('destroyed');
    },
    watch: {
      'user.roleAlias': function (val) {
        if (isDebug) debug('watch.user.roleAlias - Changed!');
        if (val) {
          if (isDebug) debug('watch.user.roleAlias:', val);
          this.checkAccessToRoutePath();
        }
      },
      'user.active': function (val) {
        if (isDebug) debug('watch.user.active - Changed!');
        if (val === false) {
          if (isDebug) debug('watch.user.active:', val);
          this.showWarning({text: this.$t('management.userToInactiveMode'), timeout: 10000});
          this.logout();
          this.$router.push(this.$i18n.path(this.config.homePath));
        }
      },
    },
    computed: {
      ...mapGetters({
        config: 'getConfig',
        snackBar: 'getSnackBar',
        theme: 'getTheme',
        primaryColor: 'getPrimaryColor',
        user: 'getUser',
        fullPath: 'getFullPath'
      }),
    },
    methods: {
      ...mapActions(['logout']),
      ...mapMutations({
        showWarning: 'SHOW_WARNING',
      }),
      modelNavLeft: function (newValue) {
        this.navLeft = newValue
      },
      modelSnackBar: function (newValue) {
        this.$store.commit('SET_SNACK_BAR', {show: newValue});
      },
      devAvatar() {
        const avatar = new this.$Avatar(this.config.email);
        return avatar.imageUrl();
      },
      refresh() {
        location.reload();
      },
      checkAccessToRoutePath() {
        const authClient = new AuthClient(this.$store);
        const serviceClient = new ServiceClient(this.$store);
        // Check auth access for route.path
        if (!authClient.isAccess(this.$route.path)) {
          if (isDebug) debug(`This path '${this.$route.path}' is not available. Not enough rights.`);
          this.$store.commit('SHOW_ERROR', `${this.$t('error.not_enough_rights')}.`);
          this.$redirect(this.fullPath('/user/login'));

        } else {
          this.refresh();
        }
      },
      updateServices(lifecycle) {
        const userTeams = feathersClient.service('user-teams');
        const chatMessages = feathersClient.service('chat-messages');
        const users = feathersClient.service('users');

        const onCreatedUserTeams = async (userTeam) => {
          const serviceClient = new ServiceClient(this.$store);
          await serviceClient.findChatMessagesForTeam(userTeam.teamId);
        };

        const onCreatedChatMessage = async (msg) => {
          const serviceClient = new ServiceClient(this.$store);
          const idUserField = serviceClient.getServiceIdField('users');
          const authUserId = this.user[idUserField];
          const msgOwnerId = msg['ownerId'];
          if(msgOwnerId !== authUserId && !serviceClient.getFromStore('users', msgOwnerId)){
            await serviceClient.getUserForUserId(msgOwnerId);
          }
        };

        if(lifecycle === 'created'){
          userTeams.on('created', onCreatedUserTeams);
          chatMessages.on('created', onCreatedChatMessage);
        }
        if(lifecycle === 'destroyed'){
          userTeams.removeListener('created', onCreatedUserTeams);
          chatMessages.removeListener('created', onCreatedChatMessage);
        }
      }
    },
  }
</script>

