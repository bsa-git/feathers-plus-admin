<template>
  <v-list>
    <template v-for="(item, i) in filterUserMenu">
      <v-subheader v-if="item.header" :key="i">{{ $t(`user_menu.${item.name}`) }}</v-subheader>
      <v-divider v-else-if="item.divider" :key="i"></v-divider>
      <v-list-item v-else
                   :to="item.to ? $i18n.path(item.to) : null" :href="item.href"
                   ripple="ripple"
                   :disabled="item.disabled || config.locale === item.click"
                   :target="item.target"
                   @click="item.click ? itemClick(item.click) : null"
                   rel="noopener"
                   :key="item.name"
      >
        <v-list-item-action v-if="item.icon">
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{ $t(`user_menu.${item.name}`) }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>
  </v-list>
</template>

<script>
  import {mapGetters, mapMutations, mapActions} from 'vuex';
  const debug = require('debug')('app:comp.AppUserMenuList');

  export default {
    props: {
      userMenu: Array
    },
    computed: {
      filterUserMenu() {
        return this.userMenu.filter(item => {
          switch (item.name) {
            case 'profile':
            case 'logout':
              return this.isAuth;
              break;
            case 'signup':
            case 'login':
              return !this.isAuth;
              break;
            default:
              return true
          }
        });
      },
      ...mapGetters({
        config: 'getConfig',
        isAuth: 'isAuth'
      }),
    },
    methods: {
      async itemClick(type) {
        switch (type) {
          case 'en':
          case 'ru':
            const path1 = '/' + type + this.$route.fullPath;
            const path2 = '/' + type + this.$route.fullPath.replace(/^\/[^\/]+/, '');
            const path = (this.$i18n.fallbackLocale === this.config.locale)? path1 : path2;
            this.$router.push(path);
            break;
          case 'logout':
            await this.logout();
            this.showSuccess(`${this.$t('login.successLogout')}!`);
            this.$router.push(this.$i18n.path(this.config.homePath));
            break;
          default:
        }
      },
      ...mapMutations({
        showSuccess: 'SHOW_SUCCESS',
      }),
      ...mapActions(['logout'])
    },
  };
</script>
