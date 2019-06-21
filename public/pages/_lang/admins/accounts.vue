<template>
  <v-container fluid>
    <!-- Dialog for items -->
    <v-dialog v-model="dialog" scrollable max-width="570px">
      <v-card>
        <v-card-title>
          <v-icon class="mr-3">check_circle_outline</v-icon>
          <span class="headline">{{ modelName + ' - ' + itemName }}</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 400px;">
          <v-list three-line>
            <template v-for="(item, index) in selItems">
              <v-list-tile
                :key="index"
                @click=""
              >
                <v-list-tile-content>
                  <v-list-tile-title v-html="item[0] + ' :'"></v-list-tile-title>
                  <v-list-tile-sub-title v-html="item[1]"></v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>
          </v-list>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click="dialog = false">{{ $t('management.close') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Expansion panels -->
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
              <admins-accounts-users
                v-if="item.panel === 'users'"
                :get-sel-object="getSelObject"
                v-on:onOpenDialog="dialog = true"
              ></admins-accounts-users>
              <admins-accounts-roles
                v-else-if="item.panel === 'roles'"
                :get-sel-object="getSelObject"
                v-on:onOpenDialog="dialog = true"
              ></admins-accounts-roles>
              <admins-accounts-teams
                v-else-if="item.panel === 'teams'"
                :get-sel-object="getSelObject"
                v-on:onOpenDialog="dialog = true"
              ></admins-accounts-teams>
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
  import AdminsAccountsUsers from '~/components/admins/accounts/users';
  import AdminsAccountsRoles from '~/components/admins/accounts/roles';
  import AdminsAccountsTeams from '~/components/admins/accounts/teams';

  export default {
    components: {
      AppPageHeader,
      AdminsAccountsUsers,
      AdminsAccountsRoles,
      AdminsAccountsTeams
    },
    data() {
      return {
        title: this.$t('accounts.title'),
        description: this.$t('accounts.description'),
        dialog: false,
        modelName: '',
        itemName: '',
        selItems: [],
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
      },
      getFieldName(model) {
        let fieldName = '';
        switch (model) {
          case 'Role':
            fieldName = 'name';
            break;
          case 'Team':
            fieldName = 'name';
            break;
          case 'User':
            fieldName = 'fullName';
            break;
          default:
            fieldName = '';
        }
        return fieldName
      },
      getSelObject(selItem) {
        const loCapitalize = require('lodash/capitalize');
        const loForIn = require('lodash/forIn');
        const loIsObject = require('lodash/isObject');
        const loToPairs = require('lodash/toPairs');
        //----------------------------------------
        const id = selItem.split('_')[1];
        let model = loCapitalize(selItem.split('.')[0]);
        this.modelName = model;
        const fieldName = this.getFieldName(model);
        model = this.$FeathersVuex[model];
        // Get item from store
        const objItem = model.getFromStore(id);
        this.itemName = fieldName ? objItem[fieldName] : '';
        // Get simple object
        let newObj = {};
        loForIn(objItem, (value, key) => {
          if (key !== '__v' && !loIsObject(value)) newObj[key] = value;
        });
        // Sort keys for newObj
        const keys = Object.keys(newObj);
        keys.sort();
        let sortObj = {};
        keys.forEach(key => {
          sortObj[key] = newObj[key];
        });
        this.selItems = loToPairs(sortObj);
        return sortObj
      }
    }
  }
</script>
