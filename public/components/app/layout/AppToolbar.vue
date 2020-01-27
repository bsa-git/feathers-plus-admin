<template>
  <v-app-bar
    color="primary"
    dark
    app
  >
    <!-- Toggle show NavLeft -->
    <v-toolbar-title
      class="ml-0 pl-3"
    >
      <v-app-bar-nav-icon @click.stop="onNavLeft"></v-app-bar-nav-icon>
    </v-toolbar-title>
    <!-- Search web -->
    <v-text-field
      flat
      solo-inverted
      hide-details
      prepend-inner-icon="mdi-search-web"
      :label="$t('app_toolbar.search')"
      class="hidden-sm-and-down"
    ></v-text-field>

    <v-spacer></v-spacer>
    <!-- Mail to -->
    <v-btn :href="`mailto:${config.email}`">
      {{ $t('app_toolbar.hire_me') }}
    </v-btn>
    <!-- Go to GitHub project -->
    <v-btn icon :href="config.githubProject" target="_blank" title="GitHub">
      <v-icon>fab fa-github</v-icon>
    </v-btn>
    <!-- FullScreen -->
    <v-btn icon @click="toggleFullScreen()" :title="$t('app_toolbar.full_size')">
      <v-icon>mdi-fullscreen</v-icon>
    </v-btn>
    <!-- App Notifications -->
    <v-menu>
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on" :title="$t('app_toolbar.notifications')">
          <v-badge color="red" overlap>
            <template v-slot:badge>{{ amountNotifications }}</template>
            <v-icon>mdi-bell</v-icon>
          </v-badge>
        </v-btn>
      </template>
      <!-- Menu list -->
      <notification-list
        :items="appNotifications"
        :item-index="selNotification"
        v-on:onItem="onNotification($event)"
        v-on:onShowAll="onAllNotifications"
      ></notification-list>
    </v-menu>
    <!-- User menu -->
    <v-menu>
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-icon v-on="on" v-text="user? 'fas fa-user-check':'fas fa-user-alt-slash'"></v-icon>
            </template>
            <span>{{ user? user.fullName : $t('app_toolbar.not_authorized') }}</span>
          </v-tooltip>
        </v-btn>
      </template>
      <!-- Menu list -->
      <app-user-menu-list
        :user-menu="userMenu"
      ></app-user-menu-list>
    </v-menu>
  </v-app-bar>
</template>
<script>
  import {mapGetters} from 'vuex';
  import userMenu from '~/api/app/user-menu.json';
  import appNotifications from '~/api/app/app-notification.json';
  import NotificationList from '~/components/widgets/list/NotificationList';
  import AppUserMenuList from '~/components/app/layout/AppUserMenuList';
  const debug = require('debug')('app:comp.AppToolbar');

  const isLog = true;

  export default {
    components: {
      NotificationList,
      AppUserMenuList
    },
    data: function () {
      return {
        toggleFullScreen: this.$util.toggleFullScreen,
        appNotifications,
        selNotification: -1,
        userMenu: userMenu
      }
    },
    computed: {
      amountNotifications: function () {
        let amount = 0;
        const filterNotifications = this.appNotifications.filter(item => !item.header && !item.divider);
        filterNotifications.forEach(function(item){
          amount += item.amount;
        });
        return amount;
      },
      ...mapGetters({
        config: 'getConfig',
        user: 'getUser',
      }),
    },
    methods: {
      onNavLeft() {
        this.$emit('onNavLeft')
      },
      onNotification(index){
        if(index >= 0){
          const filterNotifications = this.appNotifications.filter(item => !item.header && !item.divider);
          if(isLog) debug('methods.onNotification.item:', filterNotifications[index]);
          this.selNotification = index;
          setTimeout(() => {
            this.selNotification = -1;
          }, 1000);
        }
      },
      onAllNotifications(){
        if(isLog) debug('methods.onAllNotifications: Click');
      }
    }
  };
</script>
