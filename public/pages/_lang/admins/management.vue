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
              <admins-management-users v-if="item.panel === 'users'"></admins-management-users>
              <admins-management-roles v-else-if="item.panel === 'roles'"></admins-management-roles>
              <admins-management-teams v-else-if="item.panel === 'teams'"></admins-management-teams>
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
  import AdminsManagementUsers from '~/components/admins/management/users';
  import AdminsManagementRoles from '~/components/admins/management/roles';
  import AdminsManagementTeams from '~/components/admins/management/teams';

  export default {
    components: {
      AppPageHeader,
      AdminsManagementUsers,
      AdminsManagementRoles,
      AdminsManagementTeams
    },
    data() {
      return {
        title: this.$t('management.title'),
        description: this.$t('management.description'),
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
    },
    methods: {
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
