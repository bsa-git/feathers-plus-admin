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
      <notification-list></notification-list>
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
        <v-list-tile v-for="(item,index) in userMenu" :to="!item.href ? { name: item.name } : null" :href="item.href"
                     @click="item.click" ripple="ripple" :disabled="item.disabled" :target="item.target" rel="noopener"
                     :key="index">
          <v-list-tile-action v-if="item.icon">
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-menu>
  </v-toolbar>
</template>
<script>
  import NotificationList from '~/components/widgets/list/NotificationList';
  import util from '~/plugins/lib/util';

  export default {
    components: {
      NotificationList
    },
    props: {
      mailto: String,
      githubProject: String,
      userAvatar: String,
      userMenu: Array
    },
    data: () => ({}),
    computed: {
      toolbarColor() {
        return this.$vuetify.options.extra.mainNav;
      }
    },
    methods: {
//      handleDrawerToggle() {
//        window.getApp.$emit('APP_DRAWER_TOGGLED');
//      },
      onNavLeft: function () {
        this.$emit('onNavLeft')
      },
      handleFullScreen() {
        util.toggleFullScreen();
      }
    }
  };
</script>
