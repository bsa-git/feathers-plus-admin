<template>
  <v-treeview :items="teams" activatable open-on-click></v-treeview>
</template>

<script>
  import {mapGetters} from 'vuex'
  const debug = require('debug')('app:comp.admins-accounts-teams');

  const isLog = false;
  //  const isDebug = true;

  export default {
    computed: {
      ...mapGetters({
        getMembersForTeam: 'users/getMembersForTeam',
      }),
      teams() {
        const self = this;
        const data = [];
        const idFieldUser = this.$store.state.users.idField;
        const idFieldTeam = this.$store.state.teams.idField;
        const {Team} = this.$FeathersVuex;
        const teams = Team.findInStore({query: {}}).data;
        if (isLog) debug('Teams from store:', teams);
        teams.forEach(team => {
          // Find members for team
          const members = [];
          const teamMembers = self.getMembersForTeam(team.memberIds);
          if (isLog) debug('teamMembers from store:', teamMembers);
          teamMembers.forEach(member => {
            members.push({
              id: `member.fullName_${member[idFieldUser]}`,
              name: `${member.fullName}`,
              children: [
                {id: `member.id_${member[idFieldUser]}`, name: `id : ${member[idFieldUser]}`},
                {id: `member.isAdmin_${member[idFieldUser]}`, name: `isAdmin : ${member.isAdmin}`},
                {id: `member.email_${member[idFieldUser]}`, name: `email : ${member.email}`},
              ]
            })
          });
          if (isLog) debug('members:', members);
          // Get team
          let item = {
            id: `team.name_${team[idFieldTeam]}`,
            name: `${team.name} :`,
            children: [
              {id: `team.id_${team[idFieldTeam]}`, name: `id : ${team[idFieldTeam]}`},
              {
                id: `team.members${team[idFieldTeam]}`,
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
  }
</script>
