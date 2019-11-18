<template>
    <!-- Breadcrumbs -->
    <div class="d-flex align-baseline">
      <div :class="`exotic--${theme.name} headline pr-3`">{{title}}</div>
      <v-btn icon :to="$i18n.path(homePath)" :title="$t('app_menu.home')">
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-breadcrumbs :items="breadcrumbs" class="hidden-sm-and-down">
        <v-icon slot="divider">mdi-chevron-right</v-icon>
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
      <v-btn icon @click="refresh" class="ml-auto">
        <v-icon class="text--secondary">mdi-refresh</v-icon>
      </v-btn>
    </div>
</template>

<script>
  import {mapGetters} from 'vuex';

  export default {
    props: {
      homePath: {
        type: String,
        default: '/'
      },
      appMenu: Array,
    },
    data() {
      return {
        title: '',
        routePath: '/' + this.$util.stripSlashes(this.$route.path)
      };
    },
    methods: {
      refresh() {
        location.reload();
      },
    },
    computed: {
      ...mapGetters({
        theme: 'getTheme'
      }),
      breadcrumbs: function () {
        let _breadcrumbs = [];
        let child = null;
        this.appMenu.forEach(menu => {
          if (menu.items) {
            menu.items.forEach(item => {
              if (item.children) {
                child = item.children.find(i => {
                  return (i.to ? this.$i18n.path(i.to) : '') === this.routePath;
                });
                if (child) {
                  this.title = this.$t(`app_menu.${child.alias}`);
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
                return (i.to ? this.$i18n.path(i.to) : '') === this.routePath;
              });
              if (child) {
                this.title = this.$t(`app_menu.${child.alias}`);
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
              if (menu.to && this.$i18n.path(menu.to) === this.routePath) {
                this.title = this.$t(`app_menu.${menu.alias}`);
                _breadcrumbs.push({
                  href: menu.to,
                  text: this.$t(`app_menu.${menu.alias}`),
                  disabled: true
                });
              }
            }
          } else {
            if (menu.to && this.$i18n.path(menu.to) === this.routePath) {
              this.title = this.$t(`app_menu.${menu.alias}`);
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
