<template>
  <v-toolbar
    color="primary"
    fixed
    dark
    app
  >
    <!-- Toggle show NavLeft -->
    <v-toolbar-title class="ml-0 pl-3">
      <v-toolbar-side-icon @click.stop="onNavLeft"></v-toolbar-side-icon>
    </v-toolbar-title>
    <!-- Search -->
    <v-text-field
      flat
      solo-inverted
      prepend-icon="search"
      :label="$t('app_toolbar.search')"
      class="hidden-sm-and-down"
    >
    </v-text-field>
    <v-spacer></v-spacer>
    <!-- Mail to -->
    <v-btn :href="`mailto:${mailto}`">
      {{ $t('app_toolbar.hire_me') }}
    </v-btn>
    <!-- Go to GitHub project -->
    <v-btn icon :href="githubProject" target="_blank" title="GitHub">
      <v-icon>fab fa-github</v-icon>
    </v-btn>
    <!-- FullScreen -->
    <v-btn icon @click="toggleFullScreen()" :title="$t('app_toolbar.full_size')">
      <v-icon>fullscreen</v-icon>
    </v-btn>
    <!-- Notifications -->
    <v-menu offset-y origin="center center" class="elelvation-1" :nudge-bottom="14" transition="scale-transition">
      <v-btn icon flat slot="activator" :title="$t('app_toolbar.notifications')">
        <v-badge color="red" overlap>
          <span slot="badge">3</span>
          <v-icon medium>notifications</v-icon>
        </v-badge>
      </v-btn>
      <!-- Slot - notification -->
      <slot name="notification"></slot>
    </v-menu>
    <!-- User menu -->
    <v-menu offset-y origin="center center" :nudge-bottom="10" transition="scale-transition">
      <v-btn icon flat slot="activator" :title="$t('app_toolbar.user')">
        <v-icon v-if="user">fas fa-user-check</v-icon>
        <v-icon v-else>fas fa-user-alt-slash</v-icon>
      </v-btn>
      <v-list class="pa-0" expand>
        <template v-for="(item, i) in filterUserMenu">
          <v-subheader v-if="item.header" :key="i">{{ $t(`user_menu.${item.name}`) }}</v-subheader>
          <!--divider-->
          <v-divider v-else-if="item.divider" :key="i"></v-divider>
          <!--top level link-->
          <v-list-tile v-else
                       :to="item.to ? $i18n.path(item.to) : null" :href="item.href"
                       ripple="ripple"
                       :disabled="item.disabled || locale === item.click"
                       :target="item.target"
                       @click="item.click ? itemClick(item.click) : null"
                       rel="noopener"
                       :key="item.name"
          >
            <v-list-tile-action v-if="item.icon">
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ $t(`user_menu.${item.name}`) }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-menu>
  </v-toolbar>
</template>
<script>
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';

  export default {
    props: {
      mailto: String,
      githubProject: String,
      user: Object,
      userMenu: Array,
      toggleFullScreen: Function
    },
    computed: {
      filterUserMenu() {
        return this.userMenu.filter(item => {
          switch (item.name) {
            case 'profile':
            case 'logout':
              return !!this.user;
              break;
            case 'signup':
            case 'login':
              return !this.user;
              break;
            default:
              return true
          }
        });
      },
      ...mapState([
          'locale'
        ]
      ),
    },
    methods: {
      async itemClick(type) {
        console.log('item.click:', type);
        switch (type) {
          case 'en':
          case 'ru':
            const path1 = '/' + type + this.$route.fullPath;
            const path2 = '/' + type + this.$route.fullPath.replace(/^\/[^\/]+/, '');
            const path = this.$i18n.fallbackLocale === this.locale ? path1 : path2;
            this.$router.push(path);
            break;
          case 'logout':
            await this.logout();
            this.showSuccess(`${this.$t('login.successLogout')}!`);
            break;
          default:
        }
      },
      onNavLeft() {
        this.$emit('onNavLeft')
      },
      ...mapMutations({
        showSuccess: 'SHOW_SUCCESS',
        setLang: 'SET_LANG'
      }),
      ...mapActions(['logout'])
    }
  };
</script>
