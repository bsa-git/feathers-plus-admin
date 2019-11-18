<template>
  <v-app id="app-admin">
    <!-- Top toolbar -->
    <app-toolbar
      v-on:onNavLeft="navLeft = !navLeft"
    ></app-toolbar>
    <!-- Left Drawer -->
    <app-drawer
      :isAvatar="config.isAvatar"
      :logo-image="config.isAvatar? devAvatar():config.logoImage"
      :logo-title="config.logoTitle"
      :home-path="config.homePath"
      :app-menu="appMenu"
      :user="user"
      :drawer="navLeft"
      v-on:onNavLeft="modelNavLeft"
    ></app-drawer>
    <!-- Page content -->
    <app-page-content></app-page-content>
    <!-- Go to top -->
    <app-fab></app-fab>
    <!-- Config theme colors -->
    <app-theme-settings></app-theme-settings>
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
  import {mapGetters} from 'vuex';
  import appMenu from '~/api/data/app-menu.json';
  import AppToolbar from '~/components/layout/AppToolbar';
  import AppDrawer from '~/components/layout/AppDrawer';
  import AppPageContent from '~/components/layout/AppPageContent';
  import AppPageHeader from '~/components/layout/AppPageHeader';
  import AppFab from '~/components/layout/AppFab';
  import AppThemeSettings from '~/components/layout/AppThemeSettings';
  import AppSnackBar from '~/components/layout/AppSnackbar';

  export default {
    components: {
      AppDrawer,
      AppToolbar,
      AppPageContent,
      AppPageHeader,
      AppFab,
      AppThemeSettings,
      AppSnackBar,
    },
    data: function () {
      return {
        navLeft: true,
        appMenu,
      }
    },
    created() {
      this.$util.initVuetify(this, this.theme);
    },
    methods: {
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
    },
    computed: {
      ...mapGetters({
        config: 'getConfig',
        snackBar: 'getSnackBar',
        theme: 'getTheme',
        user: 'getUser'
      }),
    }
  }
</script>

