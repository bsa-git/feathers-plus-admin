<template>
  <v-layout row class="align-center px-4 pt-4">
    <div class="exotic--light headline pr-3">{{title}}</div>
    <v-btn flat icon :to="$i18n.path(homePath)" :title="$t('app_menu.home')">
      <v-icon>home</v-icon>
    </v-btn>
    <v-breadcrumbs :items="breadcrumbs" class="hidden-sm-and-down">
      <v-icon slot="divider">chevron_right</v-icon>
      <template slot="item" slot-scope="props">
        <li>
          <router-link
            :to="$i18n.path(props.item.href)"
            :class="['v-breadcrumbs__item', props.item.disabled ? 'v-breadcrumbs__item--disabled' : '']">
            {{ props.item.text }}
          </router-link>
        </li>
      </template>
    </v-breadcrumbs>
    <v-spacer></v-spacer>
    <v-btn icon @click="refresh">
      <v-icon class="text--secondary">refresh</v-icon>
    </v-btn>
  </v-layout>
</template>

<script>

  import util from '~/plugins/lib/util';

  export default {
    props: {
      homePath: {
        type: String,
        default: '/'
      },
      appMenu: Array
    },
    data() {
      return {
        title: '',
        routePath: '/' + util.stripSlashes(this.$route.path)
      };
    },
    methods: {
      refresh() {
        location.reload();
      },
    },
    computed: {
      breadcrumbs: function () {
        const self = this;
        let _breadcrumbs = [];
        let child = null;
        this.appMenu.forEach(menu => {
          if (menu.items) {
            menu.items.forEach(item => {
              if (item.children) {
                child = item.children.find(i => {
                  return (i.to ? self.$i18n.path(i.to) : '') === self.routePath;
                });
                if (child) {
                  self.title = this.$t(`app_menu.${child.alias}`);
                  if (menu.to) {
                    _breadcrumbs.push({
                      href: menu.to,
                      text: this.$t(`app_menu.${menu.alias}`),
                      disabled: menu.disabled ? menu.disabled : false
                    });
                  }
                  if (item.to) {
                    _breadcrumbs.push({
                      href: item.to,
                      text: this.$t(`app_menu.${item.alias}`),
                      disabled: item.disabled ? item.disabled : false
                    });
                  }
                  if (child.to) {
                    _breadcrumbs.push({
                      href: child.to,
                      text: this.$t(`app_menu.${child.alias}`),
                      disabled: true
                    });
                  }
                }
              }
            });
            if (!child) {
              child = menu.items.find(i => {
                return (i.to ? self.$i18n.path(i.to) : '') === self.routePath;
              });
              if (child) {
                self.title = this.$t(`app_menu.${child.alias}`);
                if (menu.to) {
                  _breadcrumbs.push({
                    href: menu.to,
                    text: this.$t(`app_menu.${menu.alias}`),
                    disabled: menu.disabled ? menu.disabled : false
                  });
                }
                if (child.to) {
                  _breadcrumbs.push({
                    href: child.to,
                    text: this.$t(`app_menu.${child.alias}`),
                    disabled: true
                  });
                }
              }
            }
            if (!child) {
              if (menu.to && self.$i18n.path(menu.to) === self.routePath) {
                self.title = this.$t(`app_menu.${menu.alias}`);
                _breadcrumbs.push({
                  href: menu.to,
                  text: this.$t(`app_menu.${menu.alias}`),
                  disabled: true
                });
              }
            }
          } else {
            if (menu.to && self.$i18n.path(menu.to) === self.routePath) {
              self.title = this.$t(`app_menu.${menu.alias}`);
              _breadcrumbs.push({
                href: menu.to,
                text: this.$t(`app_menu.${menu.alias}`),
                disabled: true
              });
            }
          }
        });
        return _breadcrumbs;
      },
    }
  };
</script>
