<template>
  <v-toolbar
    color="primary"
    fixed
    dark
    app
  >
    <v-toolbar-title class="ml-0 pl-3">
      <v-toolbar-side-icon @click.stop="onNavLeft"></v-toolbar-side-icon>
    </v-toolbar-title>
    <v-text-field
      flat
      solo-inverted
      prepend-icon="search"
      :label="$t('app_toolbar.search')"
      class="hidden-sm-and-down"
    >
    </v-text-field>
    <v-spacer></v-spacer>
    <v-btn :href="`mailto:${mailto}`">
      {{ $t('app_toolbar.hire_me') }}
    </v-btn>
    <v-btn icon :href="githubProject" target="_blank" title="GitHub">
      <v-icon>fab fa-github</v-icon>
    </v-btn>
    <v-btn icon @click="handleFullScreen()" :title="$t('app_toolbar.full_size')">
      <v-icon>fullscreen</v-icon>
    </v-btn>
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
    <v-menu offset-y origin="center center" :nudge-bottom="10" transition="scale-transition">
      <v-btn v-if="userAvatar" icon large flat slot="activator" :title="$t('app_toolbar.user')">
        <v-avatar size="30px">
          <img :src="userAvatar" alt="Michael Wang"/>
        </v-avatar>
      </v-btn>
      <v-btn v-else icon flat slot="activator" :title="$t('app_toolbar.user')">
        <v-icon>fas fa-user-circle</v-icon>
      </v-btn>
      <v-list class="pa-0" expand>
        <template v-for="(item, i) in userMenu">
          <v-subheader v-if="item.header" :key="i">{{ $t(`user_menu.${item.name}`) }}</v-subheader>
          <!--divider-->
          <v-divider v-else-if="item.divider" :key="i"></v-divider>
          <!--top level link-->
          <v-list-tile v-else
                       :to="item.to ? $i18n.path(item.to) : null" :href="item.href"
                       ripple="ripple"
                       :disabled="item.disabled || locale === item.click"
                       :target="item.target"
                       @click="item.click ? onClick(item.click) : null"
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
  import {mapState, mapMutations} from 'vuex';
  import util from '~/plugins/lib/util';
  import userMenu from '~/api/data/user-menu';

  export default {
    props: {
      mailto: String,
      githubProject: String,
      userAvatar: String,
    },
    data: function () {
      return {
        userMenu
      }
    },
    created() {
//      console.log('userMenu:', this.userMenu)
    },
    computed: {
      toolbarColor() {
        return this.$vuetify.options.extra.mainNav;
      },
      ...mapState([
          'locale'
        ]
      )
    },
    methods: {
      onClick(type) {
        console.log('item.click:', type);
        switch (type) {
          case 'en':
          case 'ru':
            const path1 = '/' + type +  this.$route.fullPath;
            const path2 = '/' + type + this.$route.fullPath.replace(/^\/[^\/]+/, '');
            const path = this.$i18n.fallbackLocale === this.locale ? path1 : path2;
            this.$router.push(path);
            break;
          case 'logout':
            break;
          default:
        }
      },
      onNavLeft() {
        this.$emit('onNavLeft')
      },
      handleFullScreen() {
        util.toggleFullScreen();
      },
      ...mapMutations({
        setLang: 'SET_LANG'
      }),
    }
  };
</script>
