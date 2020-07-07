<template>
  <v-app id="app-chat">
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
    <template v-if="!$vuetify.breakpoint.smAndDown">
      <!-- Chat Menu -->
      <v-navigation-drawer
        fixed
        permanent
        app
        width="68"
      >
        <chat-menu
          :items="getChatMenu"
        ></chat-menu>
      </v-navigation-drawer>
      <!-- Main Content -->
      <v-content>
        <v-container fluid fill-height>
          <nuxt></nuxt>
        </v-container>
      </v-content>
    </template>
    <template v-else>

    </template>
    <!-- Left Drawer -->
<!--    <app-left-drawer-->
<!--      :isAvatar="config.isAvatar"-->
<!--      :logo-image="config.isAvatar? devAvatar():config.logoImage"-->
<!--      :logo-title="config.logoTitle"-->
<!--      :home-path="config.homePath"-->
<!--      :app-menu="appMenu"-->
<!--      :user="user"-->
<!--      :drawer="navLeft"-->
<!--      v-on:onNavLeft="modelNavLeft"-->
<!--    ></app-left-drawer>-->
    <!-- Page content -->
<!--    <app-page-content-->
<!--      :ref-app-toolbar="refAppToolbar"-->
<!--    ></app-page-content>-->
  </v-app>
</template>

<script>
  import {mapGetters} from 'vuex';
  import chatMenuList from '~/api/app/chat-menu.json';
  import syncStore from '~/plugins/lib/sync-store';
  // import AppToolbar from '~/components/app/layout/AppToolbar';
  // import AppLeftDrawer from '~/components/app/layout/AppLeftDrawer';
  // import AppPageContent from '~/components/app/layout/AppPageContent';
  // import AppPageHeader from '~/components/app/layout/AppPageHeader';
  import AppFab from '~/components/layout/Fab';
  import AppRightDrawer from '~/components/app/layout/AppRightDrawer';
  import AppSnackBar from '~/components/layout/Snackbar';
  import ChatMenu from '~/components/chat/ChatMenu';

  import themeColorOptions from '~/api/app/theme-color-options.json';

  export default {
    components: {
      // AppLeftDrawer,
      // AppToolbar,
      // AppPageContent,
      // AppPageHeader,
      ChatMenu,
      AppFab,
      AppRightDrawer,
      AppSnackBar,
    },
    data: function () {
      return {}
    },
    created: function () {},
    mounted: function () {
      this.$nextTick(function () {
        // Get refAppToolbar
        // this.refAppToolbar = Object.assign({}, this.$refs['refAppToolbar']);
        // Init vuetify
        syncStore.initVuetify(this, true);
      })
    },
    methods: {
      // modelNavLeft: function (newValue) {
      //   this.navLeft = newValue
      // },
      modelSnackBar: function (newValue) {
        this.$store.commit('SET_SNACK_BAR', {show: newValue});
      },
      // devAvatar() {
      //   const avatar = new this.$Avatar(this.config.email);
      //   return avatar.imageUrl();
      // },
    },
    computed: {
      getChatMenu: function () {
        const _chatMenu = chatMenuList.map(item => {
          if(item.text === 'user'){
            item.avatar = this.user.avatar;
            item.name = `${this.user.firstName} ${this.user.lastName}`;
          }
          return item;
        })
        return _chatMenu;
      },
      ...mapGetters({
        config: 'getConfig',
        snackBar: 'getSnackBar',
        theme: 'getTheme',
        primaryColor: 'getPrimaryColor',
        user: 'getUser',
      }),
    }
  }
</script>

