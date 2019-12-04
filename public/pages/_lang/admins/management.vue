<template>
  <div>
    <!--=== Page Header ===-->
    <app-page-header
      :page-title="description"
    ></app-page-header>
    <!--=== Bootons ===-->
    <panels-top-bar
      :btn1-text="$t('accounts.allOpen')"
      :btn2-text="$t('accounts.allClose')"
      :click-btn1="allOpen"
      :click-btn2="allClose"
    ></panels-top-bar>

    <!--=== Expansion panels ===-->
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
  import AppPageHeader from '~/components/app/layout/AppPageHeader';
  import PanelsTopBar from '~/components/widgets/TopBars/TwoButtons';
  import AdminsManagementUsers from '~/components/app/admins/management/users';
  import AdminsManagementRoles from '~/components/app/admins/management/roles';
  import AdminsManagementTeams from '~/components/app/admins/management/teams';

  export default {
    components: {
      AppPageHeader,
      PanelsTopBar,
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
