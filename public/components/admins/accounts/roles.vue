<template>
   <v-treeview :items="roles" activatable open-on-click></v-treeview>
</template>

<script>
  import {mapGetters} from 'vuex'
  const debug = require('debug')('app:comp.admins-accounts-roles');

  const isLog = false;
  //  const isDebug = true;

  export default {
    computed: {
      ...mapGetters({
        getUsersForRole: 'users/getUsersForRole',
      }),
      roles() {
        const self = this;
        const data = [];
        const idFieldRole = this.$store.state.roles.idField;
        const idFieldUser = this.$store.state.users.idField;
        const {Role} = this.$FeathersVuex;
        const roles = Role.findInStore({query: {}}).data;
        if (isLog) debug('Roles from store:', roles);
        roles.forEach(role => {
          // Find users for role
          const users = [];
          const roleUsers = self.getUsersForRole(role[idFieldRole]);
          if (isLog) debug('roleUsers from store:', roleUsers);
          roleUsers.forEach(user => {
            users.push({
              id: `user.fullName_${user[idFieldUser]}`,
              name: `${user.fullName}`,
              children: [
                {id: `user.id_${user[idFieldUser]}`, name: `id : ${user[idFieldUser]}`},
                {id: `user.email_${user[idFieldUser]}`, name: `email : ${user.email}`},
              ]
            })
          });
          if (isLog) debug('users:', users);
          // Get role
          let item = {
            id: `role.name_${role[idFieldRole]}`,
            name: `${role.name} :`,
            children: [
              {id: `role.id_${role[idFieldRole]}`, name: `id : ${role[idFieldRole]}`},
              {
                id: `role.users_${role[idFieldRole]}`,
                name: 'Users :',
                children: users
              }
            ]
          };
          data.push(item);
        });
        return data
      },
    },
  }
</script>
