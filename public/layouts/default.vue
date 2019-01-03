<template>
  <v-app id="app-admin">
    <!-- Top toolbar -->
    <app-toolbar
      :mailto="config.email"
      :github-project="config.githubProject"
      :user="user"
      :user-menu="userMenu"
      :toggle-full-screen="toggleFullScreen"
      v-on:onNavLeft="navLeft = !navLeft"
    >
      <notification-list
        slot="notification"
        :notes="toolbarNotes"
      ></notification-list>
    </app-toolbar>
    <!-- Left toolbar -->
    <app-drawer
      isAvatar
      :logo-title="config.logoTitle"
      :logo-img="devAvatar"
      :home-path="config.homePath"
      :app-menu="appMenu"
      :drawer="navLeft"
      v-on:onNavLeft="modelNavLeft"
     ></app-drawer>
    <!-- Page content -->
    <app-page-content>
      <app-footer
        slot="footer"
        class="app--footer"
        :copyright="config.copyright"
        :developer="config.logoTitle"
        :site="config.website"
      ></app-footer>
    </app-page-content>
    <!-- Go to top -->
    <app-fab></app-fab>
    <!-- Config theme colors -->
    <app-theme-settings>
      <theme-settings
        :color-options="colorOptions"
      ></theme-settings>
    </app-theme-settings>
    <!-- Snackbar -->
    <app-snack-bar
      :show="snackBar.show"
      :text="snackBar.text"
      :color="snackBar.color"
      v-on:onShow="modelSnackBar"
    ></app-snack-bar>
  </v-app>
</template>

<script>
  import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
  import util from '~/plugins/lib/util';
  import appMenu from '~/api/data/app-menu';
  import userMenu from '~/api/data/user-menu';
  import notes from '~/api/data/app-notification';
  import themeColorOptions from '~/api/data/theme-color-options';
  import AppToolbar from '~/components/layout/AppToolbar';
  import NotificationList from '~/components/layout/NotificationList';
  import AppDrawer from '~/components/layout/AppDrawer';
  import AppPageContent from '~/components/layout/AppPageContent';
  import AppPageHeader from '~/components/layout/AppPageHeader';
  import AppFooter from '~/components/layout/AppFooter';
  import AppFab from '~/components/layout/AppFab';
  import AppThemeSettings from '~/components/layout/AppThemeSettings';
  import ThemeSettings from '~/components/layout/ThemeSettings';
  import AppSnackBar from '~/components/layout/AppSnackbar';

  export default {
    components: {
      AppDrawer,
      AppToolbar,
      NotificationList,
      AppPageContent,
      AppPageHeader,
      AppFooter,
      AppFab,
      AppThemeSettings,
      ThemeSettings,
      AppSnackBar
    },
    data: function () {
      return {
        navLeft: true,
        appMenu,
        userMenu,
        colorOptions: themeColorOptions,
        toolbarNotes: notes,
        toggleFullScreen: util.toggleFullScreen
      }
    },
    async created() {
      await this.checkAuth();
    },
    methods: {
      modelNavLeft: function (newValue) {
        this.navLeft = newValue
      },
      modelSnackBar: function (newValue) {
        this.$store.commit('SET_SNACK_BAR', { show: newValue });
      },
      ...mapActions(['checkAuth'])
    },
    computed: {
      devAvatar(){
        return util.gravatar(this.config.email)
      },
      ...mapGetters({
        config: 'getConfig',
        snackBar: 'getSnackBar'
      }),
      ...mapState('auth', [
        'user'
      ]),
    }
  }
</script>

