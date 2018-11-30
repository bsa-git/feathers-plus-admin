<template>
  <v-app id="inspire">
    <!-- Top toolbar -->
    <app-toolbar
      :mailto="mailto"
      :github-project="githubProject"
      :user-avatar="userAvatar"
      :user-menu="userMenu"
      v-on:onNavLeft="navLeft = !navLeft"
    ></app-toolbar>
    <!-- Left toolbar -->
    <app-drawer
      isIcon
      :logo-title="logoTitle"
      :logo-img="logoImg"
      :home-path="homePath"
      :app-menu="appMenu"
      :drawer="navLeft"
      v-on:onNavLeft="modelNavLeft"
     ></app-drawer>
    <!-- Page content -->
    <app-page-content>
      <app-footer
        slot="footer"
        class="app--footer"
        :copyright="copyright"
        :developer="developer"
        :site="site"
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
    <app-snackbar
      :show="snackbar.show"
      :text="snackbar.text"
      :color="snackbar.color"
    ></app-snackbar>
  </v-app>
</template>

<script>
  import util from '~/plugins/lib/util';
  import appMenu from '~/store/data/app-menu';
  import userMenu from '~/store/data/user-menu';
  import themeColorOptions from '~/store/data/theme-color-options';
  import AppToolbar from '~/components/layout/AppToolbar';
  import AppDrawer from '~/components/layout/AppDrawer';
  import AppPageContent from '~/components/layout/AppPageContent';
  import AppPageHeader from '~/components/layout/AppPageHeader';
  import AppFooter from '~/components/layout/AppFooter';
  import AppFab from '~/components/layout/AppFab';
  import AppThemeSettings from '~/components/layout/AppThemeSettings';
  import ThemeSettings from '~/components/layout/ThemeSettings';
  import AppSnackbar from '~/components/layout/AppSnackbar';

  export default {
    components: {
      AppDrawer,
      AppToolbar,
      AppPageContent,
      AppPageHeader,
      AppFooter,
      AppFab,
      AppThemeSettings,
      ThemeSettings,
      AppSnackbar
    },
    data: () => ({
      navLeft: true,
      snackbar: {
        show: false,
        text: 'Test success!',
        color: 'purple',
      },
      appMenu: appMenu,
      userMenu: userMenu,
      colorOptions: themeColorOptions,
      logoTitle: process.env.PERSONAL_LOGO_TITLE,
      logoImg: process.env.PERSONAL_LOGO_IMAGE,
      homePath: process.env.HOME_PATH,
      mailto: process.env.PERSONAL_EMAIL,
      githubProject: process.env.GITHUB_PROJECT,
      userAvatar: '',
      copyright: process.env.PERSONAL_COPYRIGHT,
      developer: process.env.PERSONAL_LOGO_TITLE,
      site: process.env.PERSONAL_WEBSITE,
    }),
    created() {
      this.computeUserAvatar(this.mailto);
//      AppEvents.forEach(item => {
//        this.$on(item.name, item.callback);
//      });
      window.getApp = this;
//      console.log('this.$route:', this.$route)
    },
    methods: {
      computeUserAvatar(email) {
        this.userAvatar = util.gravatar(email);
      },
      modelNavLeft: function (newValue) {
        this.navLeft = newValue
      },
    },
  }
</script>

