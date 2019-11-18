<template>
  <div>
    <v-sheet class="pa-3" max-width="50%">
      <v-text-field
        v-model="search"
        :label="$t('management.search')"
        hide-details
        clearable
        clear-icon="mdi-close"
        append-icon="fas fa-search"
      ></v-text-field>
    </v-sheet>
    <v-treeview
      :items="roles"
      :search="search"
      :active.sync="active"
      :open.sync="open"
      activatable
      open-on-click
      active-class="primary--text"
      transition
    >
      <template v-slot:prepend="{ item, active }">
        <v-icon v-if="item.id.startsWith('user.fullName')">mdi-account</v-icon>
        <v-icon v-else-if="item.name.includes('id :')" :color="active ? 'primary' : ''">
          mdi-check-circle
        </v-icon>
      </template>
    </v-treeview>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  const debug = require('debug')('app:comp.admins-accounts-roles');
  const isLog = false;

  export default {
    props: {
      getSelObject: Function
    },
    data: () => ({
      search: '',
      active: [],
      open: [],
    }),
    computed: {
      roles() {
        const data = [];
        const idFieldRole = this.$store.state.roles.idField;
        const {Role} = this.$FeathersVuex;
        const roles = Role.findInStore({query: {$sort: {name: 1}}}).data;
        if (isLog) debug('Roles from store:', roles);
        roles.forEach(role => {
          const roleId = role[idFieldRole];
          // Find users for role
          const users = [];
          role.users.forEach(user => {
            users.push({
              id: `User.fullName_${user.id}`,
              name: `${user.fullName}`,
            })
          });
          if (isLog) debug('users:', users);
          // Get role
          let item = {
            id: `Role.name_${roleId}`,
            name: `${role.name} :`,
            children: [
              {id: `Role.id_${roleId}`, name: `id : ${roleId}`},
              {
                id: `Role.users_${roleId}`,
                name: `Users(${users.length ? users.length : 'Not'}) :`,
                children: users
              }
            ]
          };
          data.push(item);
        });
        return data
      },
      selected() {
        if (!this.active.length) return undefined;
        const selItem = this.active[0];
        return this.getSelObject(selItem);
      }
    },
    watch: {
      selected: function (val) {
        if (val) this.openDialog();
      }
    },
    methods: {
      openDialog() {
        this.$emit('onOpenDialog')
      },
    }
  }
</script>
