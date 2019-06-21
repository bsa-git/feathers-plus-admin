<template>
  <v-navigation-drawer
    :mini-variant.sync="mini"
    :dark="$vuetify.dark"
    v-model="compDrawer"
    fixed
    app
  >
    <!-- Logo -->
    <v-toolbar class="" color="primary darken-1" dark>
      <v-avatar v-if="isAvatar" size="36px">
        <img :src="logoImage">
      </v-avatar>
      <v-icon v-else>{{ logoImage }}</v-icon>
      <v-toolbar-title class="headline ml-0 pl-3">
        <span class="font-weight-black font-italic">{{ logoTitle }}</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon :to="$i18n.path(homePath)" :title="$t('app_menu.home')">
        <v-icon>home</v-icon>
      </v-btn>
    </v-toolbar>
    <v-list dense expand>
      <template v-for="(item, i) in filterAppMenu">
        <!--group with subitems-->
        <v-list-group v-if="item.items"
                      :key="item.name"
                      :group="item.group"
                      :prepend-icon="item.icon"
                      no-action="no-action"
        >
          <v-list-tile slot="activator" ripple="ripple">
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <template v-for="(subItem, i) in item.items">
            <!--sub group-->
            <v-list-group v-if="subItem.children"
                          :key="subItem.name"
                          :group="subItem.group"
                          sub-group="sub-group"
            >
              <v-list-tile slot="activator" ripple="ripple">
                <v-list-tile-content>
                  <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile v-for="(child, i) in subItem.children"
                           :key="child.name"
                           :to="$i18n.path(child.to)"
                           ripple="ripple"
              >
                <v-list-tile-content>
                  <v-list-tile-title>{{ child.title }}</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action v-if="child.icon">
                  <v-icon v-text="child.icon"></v-icon>
                </v-list-tile-action>
              </v-list-tile>
            </v-list-group>
            <!--child item-->
            <v-list-tile v-else
                         :key="subItem.name"
                         :to="$i18n.path(subItem.to)"
                         :disabled="subItem.disabled"
                         :target="subItem.target"
                         ripple="ripple"
            >
              <v-list-tile-content>
                <v-list-tile-title><span>{{ subItem.title }}</span></v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action v-if="subItem.icon">
                <v-icon v-text="subItem.icon"></v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </template>
        </v-list-group>
        <v-subheader v-else-if="item.header" :key="i">
          {{ item.header }}
        </v-subheader>
        <v-divider v-else-if="item.divider" :key="i"></v-divider>
        <!--top-level link-->
        <v-list-tile v-else
                     :to="$i18n.path(item.to)"
                     ripple="ripple"
                     :disabled="item.disabled"
                     :target="item.target"
                     rel="noopener"
                     :key="item.name"
        >
          <v-list-tile-action v-if="item.icon">
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action v-if="item.subAction">
            <v-icon class="success--text">{{ item.subAction }}</v-icon>
          </v-list-tile-action>
        </v-list-tile>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>
<script>

  import AuthClient from '~/plugins/lib/auth-client.class';

  export default {
    props: {
      isIcon: Boolean,
      isAvatar: Boolean,
      logoTitle: String,
      logoImage: String,
      homePath: String,
      locale: String,
      appMenu: Array,
      user: Object,
      drawer: Boolean
    },
    data: function () {
      return {
        mini: false,
        scrollSettings: {
          maxScrollbarLength: 160
        }
      }
    },
    computed: {
      compDrawer: {
        // Getter:
        get: function () {
          return this.drawer
        },
        // Setter:
        set: function (newValue) {
          this.$emit('onNavLeft', newValue)
        }
      },
      filterAppMenu() {
        // Create auth
        const auth = new AuthClient(this.$store);
        // Filter, update and sort menu
        const menu = auth.filterMenu().map(item => {
          if (item.header) {
            item.header = this.$t(`app_menu.${item.alias}`);
          }
          if (item.title) {
            item.title = this.$t(`app_menu.${item.alias}`);
          }
          if (item.items) {
            item.items.forEach((i) => {
              if (i.children) {
                i.children.forEach((child) => {
                  child.title = this.$t(`app_menu.${child.alias}`);
                });
              }
              i.title = this.$t(`app_menu.${i.alias}`);
            });
          }
          return item
        });
        return this.sortAppMenu(menu);
      },
    },
    methods: {
      sortAppMenu: function (menu) {
        const self = this;
        // reorder menu
        menu.forEach((item) => {
          if (item.items) {
            item.items.forEach((i) => {
              if (i.children) {
                self.$util.sortByStringField(i.children, 'title')
              }
            });
            self.$util.sortByStringField(item.items, 'title')
          }
        });
        return menu
      },
    },
  };
</script>


<style lang="stylus">

  #appDrawer
    overflow: hidden
    .drawer-menu--scroll
      height: calc(100vh - 48px)
      overflow: auto

</style>
