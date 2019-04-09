<template>
  <v-container fluid>
    <app-page-header
      :app-menu="appMenu"
      :home-path="config.homePath"
    ></app-page-header>
    <v-flex xs10 offset-xs1>
      <div class="text-xs-center">
        <div class="exotic--light display-1 my-3">{{ description }}</div>
      </div>
      <div class="d-flex justify-between align-center mb-3">
        <v-btn color="primary" @click="allOpen">{{ $t('accounts.allOpen') }}</v-btn>
        <v-btn color="primary" @click="allClose">{{ $t('accounts.allClose') }}</v-btn>
      </div>

      <v-expansion-panel
        v-model="panel"
        expand
        light
      >
        <v-expansion-panel-content
          v-for="(item,i) in items"
          :key="i"
        >
          <template v-slot:header>
            <div>
              <v-icon>{{ item.icon }}</v-icon>
              {{ item.name }}
            </div>
          </template>
          <v-card>
            <v-card-text class="grey lighten-3">
              <!--<v-treeview :items="getItems(item.panel)" activatable open-on-click></v-treeview>-->
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-flex>
  </v-container>
</template>

<script>
  import {mapGetters} from 'vuex'
  import appMenu from '~/api/data/app-menu';
  import AppPageHeader from '~/components/layout/AppPageHeader';

  const debug = require('debug')('app:page.accounts');

  const isLog = true;

  export default {
    name: 'management',
    components: {
      AppPageHeader
    },
    data() {
      return {
        title: this.$t('management.title'),
        description: this.$t('management.description'),
        appMenu: appMenu,
        panel: [],
        items: [
          {
            panel: 'users',
            name: this.$t('accounts.users'),
            icon: 'wc'
          },
          {
            panel: 'roles',
            name: this.$t('accounts.roles'),
            icon: 'security'
          },
          {
            panel: 'teams',
            name: this.$t('accounts.teams'),
            icon: 'group'
          },
        ]
      }
    },
    head() {
      return {
        title: this.title,
        meta: [
          {hid: 'description', name: 'description', content: this.description}
        ],
      }
    },
    created: async function () {
      let response;
      if (isLog) debug('created: OK');
      const {Role, User, Team} = this.$FeathersVuex;
      // findRoles
      response = await Role.find({query: {}});
      const roles = response.data || response;
      if (isLog) debug('Roles from server:', roles);
      // findUsers
      response = await User.find({query: {}});
      const users = response.data || response;
      if (isLog) debug('Users from server:', users);
      // findUsers
      response = await Team.find({query: {}});
      const teams = response.data || response;
      if (isLog) debug('Teams from server:', teams);
    },
    computed: {
      ...mapGetters({
        config: 'getConfig',
      }),
      users() {
        const data = [];
        const idField = this.$store.state.users.idField;
        const {User} = this.$FeathersVuex;
        const users = User.findInStore({query: {}}).data;
        if (isLog) debug('Users from store:', users);
      },
      roles() {
        const data = [];
        const idField = this.$store.state.roles.idField;
        const {Role} = this.$FeathersVuex;
        const roles = Role.findInStore({query: {}}).data;
        if (isLog) debug('Roles from store:', roles);
      },
      teams() {
        const data = [];
        const idField = this.$store.state.teams.idField;
        const {Team} = this.$FeathersVuex;
        const teams = Team.findInStore({query: {}}).data;
        if (isLog) debug('Teams from store:', teams);
      }
    },
    methods: {
      // Open the panel
      allOpen() {
        this.panel = this.items.map(item => true)
      },
      // Reset the panel
      allClose() {
        this.panel = []
      }
    }
  }
</script>
