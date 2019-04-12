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
        v-model="panels"
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
              <v-treeview :items="getItems(item.panel)" activatable open-on-click></v-treeview>
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
    name: 'accounts',
    components: {
      AppPageHeader
    },
    data() {
      return {
        title: this.$t('accounts.title'),
        description: this.$t('accounts.description'),
        appMenu: appMenu,
        panels: [],
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
    },
    computed: {
      ...mapGetters({
        config: 'getConfig',
      }),
      users() {
        const data = [];
        const idField = this.$store.state.users.idField;
        const {User} = this.$FeathersVuex;
        const users = User.findInStore({query: {$sort: {fullName: 1}}}).data;
        if (isLog) debug('Users from store:', users);
        users.forEach(user => {
          // Find teams for user
          const teams = [];
          user.teams.forEach(team => {
            teams.push({
              id: `team.name_${team[idField]}`,
              name: `${team.name}`,
              children: [
                {id: `team.id_${team[idField]}`, name: `id : ${team[idField]}`}
              ]
            })
          });
          // Get user
          let item = {
            id: `user.fullName_${user[idField]}`,
            name: `${user.fullName} :`,
            children: [
              {id: `user.id_${user[idField]}`, name: `id : ${user[idField]}`},
              {id: `user.email_${user[idField]}`, name: `email : ${user.email}`},
              {id: `user.isAdmin_${user[idField]}`, name: `isAdmin : ${user.isAdmin}`},
              {
                id: `user.role_${user[idField]}`,
                name: `Role :`,
                children: user.role ? [
                  {id: `role.id_${user.role[idField]}`, name: `id : ${user.role[idField]}`},
                  {id: `role.name_${user.role[idField]}`, name: `name : ${user.role.name}`},
                ] : []
              },
              {
                id: `user.teams_${user[idField]}`,
                name: 'Teams :',
                children: teams
              }
            ]
          };
          data.push(item);
        });
        return data
      },
      roles() {
        const data = [];
        const idField = this.$store.state.roles.idField;
        const {Role} = this.$FeathersVuex;
        const roles = Role.findInStore({query: {}}).data;
        if (isLog) debug('Roles from store:', roles);
        roles.forEach(role => {
          // Find users for role
          const users = [];
          role.users.forEach(user => {
            users.push({
              id: `user.fullName_${user[idField]}`,
              name: `${user.fullName}`,
              children: [
                {id: `user.id_${user[idField]}`, name: `id : ${user[idField]}`},
                {id: `user.email_${user[idField]}`, name: `email : ${user.email}`},
              ]
            })
          });
          // Get role
          let item = {
            id: `role.name_${role[idField]}`,
            name: `${role.name} :`,
            children: [
              {id: `role.id_${role[idField]}`, name: `id : ${role[idField]}`},
              {
                id: `role.users_${role[idField]}`,
                name: 'Users :',
                children: users
              }
            ]
          };
          data.push(item);
        });
        return data
      },
      teams() {
        const data = [];
        const idField = this.$store.state.teams.idField;
        const {Team} = this.$FeathersVuex;
        const teams = Team.findInStore({query: {}}).data;
        if (isLog) debug('Teams from store:', teams);
        teams.forEach(team => {
          // Find members for team
          const members = [];
          team.members.forEach(member => {
            members.push({
              id: `member.fullName_${member[idField]}`,
              name: `${member.fullName}`,
              children: [
                {id: `member.id_${member[idField]}`, name: `id : ${member[idField]}`},
                {id: `member.isAdmin_${member[idField]}`, name: `isAdmin : ${member.isAdmin}`},
                {id: `member.email_${member[idField]}`, name: `email : ${member.email}`},
              ]
            })
          });
          // Get team
          let item = {
            id: `team.name_${team[idField]}`,
            name: `${team.name} :`,
            children: [
              {id: `team.id_${team[idField]}`, name: `id : ${team[idField]}`},
              {
                id: `team.members${team[idField]}`,
                name: 'Members :',
                children: members
              }
            ]
          };
          data.push(item);
        });
        return data
      }
    },
    methods: {
      // Open the panel
      getItems(panel) {
        if (panel === 'users') {
          return this.users;
        } else if (panel === 'roles') {
          return this.roles;
        } else if (panel === 'teams') {
          return this.teams;
        }
      },
      // Open the panels
      allOpen() {
        this.panels = this.items.map(item => true)
      },
      // Reset the panels
      allClose() {
        this.panels = []
      }
    }
  }
</script>
