<template>
  <v-treeview :items="users" activatable open-on-click></v-treeview>
</template>

<script>
  import {mapGetters} from 'vuex'
  const debug = require('debug')('app:comp.admins-accounts-users');

  const isLog = false;
  //  const isDebug = true;

  export default {
    computed: {
      ...mapGetters({
        getTeamsForUser: 'teams/getTeamsForUser',
        getRoleForUser: 'roles/getRoleForUser',
      }),
      users() {
        const data = [];
        const idFieldUser = this.$store.state.users.idField;
        const idFieldTeam = this.$store.state.teams.idField;
        const idFieldRole = this.$store.state.roles.idField;
        const {User} = this.$FeathersVuex;
        const users = User.findInStore({query: {$sort: {fullName: 1}}}).data;
        if (isLog) debug('Users from store:', users);

        users.forEach(user => {
          // Find teams for user
          const teams = [];
          const userTeams = this.getTeamsForUser(user[idFieldUser]);
          if (isLog) debug('userTeams from store:', userTeams);
          const userRole = user.roleId ? this.getRoleForUser(user.roleId) : null;
          if (isLog) debug('userRole from store:', userRole);
          userTeams.forEach(team => {
            teams.push({
              id: `team.name_${team[idFieldTeam]}`,
              name: `${team.name}`,
              children: [
                {id: `team.id_${team[idFieldTeam]}`, name: `id : ${team[idFieldTeam]}`}
              ]
            })
          });
          if (isLog) debug('teams:', teams);
          // Get user
          let item = {
            id: `user.fullName_${user[idFieldUser]}`,
            name: `${user.fullName} :`,
            children: [
              {id: `user.id_${user[idFieldUser]}`, name: `id : ${user[idFieldUser]}`},
              {id: `user.email_${user[idFieldUser]}`, name: `email : ${user.email}`},
              {
                id: `user.role_${user[idFieldUser]}`,
                name: `Role :`,
                children: userRole ? [
                  {id: `role.id_${userRole[idFieldRole]}`, name: `id : ${userRole[idFieldRole]}`},
                  {id: `role.name_${userRole[idFieldRole]}`, name: `name : ${userRole.name}`},
                ] : []
              },
              {
                id: `user.teams_${user[idFieldUser]}`,
                name: 'Teams :',
                children: teams
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
