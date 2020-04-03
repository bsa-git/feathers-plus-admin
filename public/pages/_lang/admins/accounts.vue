<template>
  <div>
    <!--=== Dialog for items ===-->
    <view-dialog
      :dialog="dialog"
      :max-width="570"
      header-icon="mdi-account-check"
      :header-title="$t('graphql.responseToRequest')"
      :action-text="$t('management.close')"
      v-on:onClose="dialog = false"
    >
      <div slot="list-content">
        <template v-for="(item, index) in selItems">
          <v-list-item
            :key="index"
            @click=""
          >
            <v-list-item-content>
              <v-list-item-title v-html="item[0] + ' :'"></v-list-item-title>
              <v-list-item-subtitle v-html="item[1]"></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>
      </div>
    </view-dialog>

    <!--=== Page Header ===-->
    <app-page-header
      :page-title="description"
    ></app-page-header>
    <div>
      <!--=== Bootons ===-->
      <panels-top-bar
        btn1-icon="mdi-plus"
        :btn1-tooltip="$t('accounts.allOpen')"
        btn2-icon="mdi-minus"
        :btn2-tooltip="$t('accounts.allClose')"
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
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import AppPageHeader from '~/components/app/layout/AppPageHeader';
  import ViewDialog from '~/components/dialogs/ViewDialog';
  import PanelsTopBar from '~/components/widgets/top-bars/TwoButtons';
  import AdminsAccountsUsers from '~/components/app/admins/accounts/users';
  import AdminsAccountsRoles from '~/components/app/admins/accounts/roles';
  import AdminsAccountsTeams from '~/components/app/admins/accounts/teams';

  const debug = require('debug')('app:page.admins-accounts');

  const isDebug = true;

  export default {
    components: {
      AppPageHeader,
      ViewDialog,
      PanelsTopBar,
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
        const loForIn = require('lodash/forIn');
        const loIsObject = require('lodash/isObject');
        const loToPairs = require('lodash/toPairs');
        //----------------------------------------
        const id = selItem.split('_')[1];
        let model = selItem.split('.')[0];
        if (isDebug) debug('getSelObject.model:', model);
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
