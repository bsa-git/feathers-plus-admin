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
      label="Search"
      class="hidden-sm-and-down"
    >
    </v-text-field>
    <v-spacer></v-spacer>
    <v-btn :href="`mailto:${mailto}`">
      Hire Me
    </v-btn>
    <v-btn icon :href="githubProject" target="_blank">
      <v-icon>fab fa-github</v-icon>
    </v-btn>
    <v-btn icon @click="handleFullScreen()">
      <v-icon>fullscreen</v-icon>
    </v-btn>
    <v-menu offset-y origin="center center" class="elelvation-1" :nudge-bottom="14" transition="scale-transition">
      <v-btn icon flat slot="activator">
        <v-badge color="red" overlap>
          <span slot="badge">3</span>
          <v-icon medium>notifications</v-icon>
        </v-badge>
      </v-btn>
      <!-- Slot - notification -->
      <slot name="notification"></slot>
    </v-menu>
    <v-menu offset-y origin="center center" :nudge-bottom="10" transition="scale-transition">
      <v-btn v-if="userAvatar" icon large flat slot="activator">
        <v-avatar size="30px">
          <img :src="userAvatar" alt="Michael Wang"/>
        </v-avatar>
      </v-btn>
      <v-btn v-else icon flat slot="activator">
        <v-icon>fas fa-user-circle</v-icon>
      </v-btn>
      <v-list class="pa-0">
        <!--<v-list-tile v-for="(item,index) in userMenu" :to="!item.href ? { name: item.name } : null" :href="item.href"-->
        <!--@click="item.click" ripple="ripple" :disabled="item.disabled" :target="item.target" rel="noopener"-->
        <!--:key="index">-->
        <!--<v-list-tile-action v-if="item.icon">-->
        <!--<v-icon>{{ item.icon }}</v-icon>-->
        <!--</v-list-tile-action>-->
        <!--<v-list-tile-content>-->
        <!--<v-list-tile-title>{{ item.title }}</v-list-tile-title>-->
        <!--</v-list-tile-content>-->
        <!--</v-list-tile>-->

        <template v-for="(item, i) in userMenu">
          <!--group with subitems-->
          <v-list-group v-if="item.items" :key="item.name" :group="item.group" :prepend-icon="item.icon"
                        no-action="no-action" :value="true">
            <v-list-tile slot="activator" ripple="ripple" >
              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <template v-for="(subItem, i) in item.items">
              <!--sub item-->
              <v-list-tile :key="subItem.name" :to="subItem.to ? $i18n.path(subItem.to) : null"
                           :href="subItem.href" :disabled="subItem.disabled" :target="subItem.target"
                           @click="subItem.click ? subItem.click : null" ripple="ripple">
                <v-list-tile-content>
                  <v-list-tile-title><span>{{ subItem.title }}</span></v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action v-if="subItem.icon">
                  <v-icon v-text="subItem.icon"></v-icon>
                </v-list-tile-action>
              </v-list-tile>
            </template>
          </v-list-group>
          <!--divider-->
          <v-divider v-else-if="item.divider" :key="i"></v-divider>
          <!--top-level link-->
          <v-list-tile v-else :to="item.to ? $i18n.path(item.to) : null" :href="item.href" ripple="ripple"
                       :disabled="item.disabled" :target="item.target"
                       @click="item.click ? item.click : null" rel="noopener" :key="item.name">
            <v-list-tile-action v-if="item.icon">
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>

      </v-list>
    </v-menu>
  </v-toolbar>
</template>
<script>
  import util from '~/plugins/lib/util';

  export default {
    props: {
      mailto: String,
      githubProject: String,
      userAvatar: String,
      userMenu: Array
    },
    computed: {
      toolbarColor() {
        return this.$vuetify.options.extra.mainNav;
      }
    },
    methods: {
      onNavLeft: function () {
        this.$emit('onNavLeft')
      },
      handleFullScreen() {
        util.toggleFullScreen();
      }
    }
  };
</script>
