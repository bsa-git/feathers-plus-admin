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
  import {mapGetters} from 'vuex';
  import appMenu from '~/api/app/app-menu.json';
  import syncStore from '~/plugins/lib/sync-store';
  import AppToolbar from '~/components/app/layout/AppToolbar';
  import AppLeftDrawer from '~/components/app/layout/AppLeftDrawer';
  import AppPageContent from '~/components/app/layout/AppPageContent';
  import AppPageHeader from '~/components/app/layout/AppPageHeader';
  import AppFab from '~/components/layout/Fab';
  import AppRightDrawer from '~/components/app/layout/AppRightDrawer';
  import AppSnackBar from '~/components/layout/Snackbar';

  import themeColorOptions from '~/api/app/theme-color-options.json';

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
        refAppToolbar: null
      }
    },
    created: function () {},
    mounted: function () {
      this.$nextTick(function () {
        // Get refAppToolbar
        this.refAppToolbar = Object.assign({}, this.$refs['refAppToolbar']);
        this.refAppToolbar.loading = true;
        // Init vuetify
        syncStore.initVuetify(this, true);
      })
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
        primaryColor: 'getPrimaryColor',
        user: 'getUser',
      }),
    }
  }
</script>

