<template>
  <div>
    <!-- Page Header -->
    <app-page-header
      :page-title="description"
    ></app-page-header>
    <!-- Bootons -->
    <div class="d-flex justify-space-around mb-3">
      <v-btn text color="primary" @click="allOpen">{{ $t('accounts.allOpen') }}</v-btn>
      <v-btn text color="primary" @click="allClose">{{ $t('accounts.allClose') }}</v-btn>
    </div>
    <!-- Expansion panels -->
    <v-expansion-panels
      v-model="panels"
      focusable
      multiple
      inset
    >
      <v-expansion-panel
        v-for="(item,i) in items"
        :key="i"
      >
        <v-expansion-panel-header>
          <div class="d-flex align-baseline">
            <v-icon class="mr-3">{{ item.icon }}</v-icon>
            <span>{{ item.name }}</span>
          </div>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <admins-management-users v-if="item.panel === 'users'"></admins-management-users>
          <admins-management-roles v-else-if="item.panel === 'roles'"></admins-management-roles>
          <admins-management-teams v-else-if="item.panel === 'teams'"></admins-management-teams>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
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
        panels: [],
        items: [
          {
            panel: 'users',
            name: this.$t('accounts.users'),
            icon: 'mdi-account-multiple'
          },
          {
            panel: 'roles',
            name: this.$t('accounts.roles'),
            icon: 'mdi-security'
          },
          {
            panel: 'teams',
            name: this.$t('accounts.teams'),
            icon: 'mdi-account-group'
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
        this.panels = this.items.map((item, i) => i)
      },
      // Reset the panels
      allClose() {
        this.panels = []
      }
    }
  }
</script>
