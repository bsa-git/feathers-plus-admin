<template>
  <v-layout row class="align-center px-4 pt-4">
    <div class="exotic--light headline pr-3">{{title}}</div>
    <v-btn flat icon :to="homePath">
      <v-icon>home</v-icon>
    </v-btn>
    <v-breadcrumbs :items="breadcrumbs" class="hidden-sm-and-down">
      <v-icon slot="divider">chevron_right</v-icon>
      <template slot="item" slot-scope="props">
        <li>
          <router-link
            :to="props.item.href"
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
        let _breadcrumbs = [];
        let child = null;
        this.appMenu.forEach(menu => {
          if (menu.items) {
            menu.items.forEach(item => {
              if (item.children) {
                child = item.children.find(i => {
                  return i.to === this.routePath;
                });
                if (child) {
                  this.title = child.title;
                  _breadcrumbs.push({
                    href: menu.to,
                    text: menu.title,
                    disabled: menu.disabled ? menu.disabled : false
                  });
                  _breadcrumbs.push({
                    href: item.to,
                    text: item.title,
                    disabled: item.disabled ? item.disabled : false
                  });
                  _breadcrumbs.push({
                    href: child.to,
                    text: child.title,
                    disabled: true
                  });
                }
              }
            });
            if (!child) {
              child = menu.items.find(i => {
                return i.to === this.routePath;
              });
              if (child) {
                this.title = child.title;
                _breadcrumbs.push({
                  href: menu.to,
                  text: menu.title,
                  disabled: menu.disabled ? menu.disabled : false
                });
                _breadcrumbs.push({
                  href: child.to,
                  text: child.title,
                  disabled: true
                });
              }
            }
            if (!child) {
              if (menu.to === this.routePath) {
                this.title = menu.title;
                _breadcrumbs.push({
                  href: menu.to,
                  text: menu.title,
                  disabled: true
                });
              }
            }
          } else {
            if (menu.to === this.routePath) {
              this.title = menu.title;
              _breadcrumbs.push({
                href: menu.to,
                text: menu.title,
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
