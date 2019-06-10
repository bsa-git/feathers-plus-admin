<template>
  <v-card
    class="mx-auto"
  >
    <v-sheet class="pa-3">
      <v-text-field
        v-model="search"
        :label="$t('management.search')"
        hide-details
        clearable
        clear-icon="highlight_off"
        append-icon="search"
      ></v-text-field>
    </v-sheet>
    <v-card-text>
      <v-treeview
        :items="roles"
        :search="search"
        :active.sync="active"
        :open.sync="open"
        activatable
        open-on-click
        active-class="primary--text"
        class="grey lighten-5"
        transition
      >
        <template v-slot:prepend="{ item, active }">
          <v-icon v-if="item.id.startsWith('user.fullName')">person</v-icon>
          <v-icon v-else-if="item.name.includes('id :')" :color="active ? 'primary' : 'teal darken-2'">
            check_circle_outline
          </v-icon>
        </template>
      </v-treeview>
    </v-card-text>
  </v-card>
</template>

<script>
  import {mapGetters} from 'vuex'

  const debug = require('debug')('app:comp.admins-accounts-roles');
  const isLog = false;
  //  const isDebug = true;

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
              id: `user.fullName_${user.id}`,
              name: `${user.fullName}`,
            })
          });
          if (isLog) debug('users:', users);
          // Get role
          let item = {
            id: `role.name_${roleId}`,
            name: `${role.name} :`,
            children: [
              {id: `role.id_${roleId}`, name: `id : ${roleId}`},
              {
                id: `role.users_${roleId}`,
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
