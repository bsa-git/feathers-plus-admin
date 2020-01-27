<template>
  <div>
    <treeview-top-bar
      :search="search"
      :labelSearch="$t('management.search')"
      v-on:onSearch="search = $event"
    ></treeview-top-bar>
    <v-treeview
      :items="users"
      :search="search"
      :active.sync="active"
      :open.sync="open"
      activatable
      open-on-click
      active-class="primary--text"
      transition
    >
      <template v-slot:prepend="{ item, active }">
        <v-icon v-if="item.id.startsWith('Role.name')" :color="active ? 'primary' : ''">mdi-check</v-icon>
        <v-icon v-else-if="item.id.startsWith('Team.name_')" :color="active ? 'primary' : ''">mdi-check</v-icon>
        <v-icon v-else-if="item.name.includes('id :')" :color="active ? 'primary' : ''">mdi-check</v-icon>
      </template>
    </v-treeview>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import TreeviewTopBar from '~/components/widgets/top-bars/Search';

  const debug = require('debug')('app:comp.admins-accounts-users');
  const isLog = true;

  export default {
    components: {
      TreeviewTopBar
    },
    props: {
      getSelObject: Function
    },
    data: () => ({
      search: '',
      active: [],
      open: [],
    }),
    computed: {
      users() {
        const data = [];
        const idFieldUser = this.$store.state.users.idField;
        const {User} = this.$FeathersVuex;
        const users = User.findInStore({query: {$sort: {fullName: 1}}}).data;
        if (isLog) debug('Users from store:', users);

        users.forEach(user => {
          const userId = user[idFieldUser];
          const teams = [];
          user.teams.forEach(team => {
            teams.push({
              id: `Team.name_${team.id}`,
              name: `${team.name}`,
            })
          });
          if (isLog) debug('teams:', teams);
          // Get user
          let item = {
            id: `User.fullName_${userId}`,
            name: `${user.fullName} :`,
            children: [
              {id: `User.id_${userId}`, name: `id : ${userId}`},
              {
                id: `User.profile_${userId}`,
                name: `Profile :`,
                children: user.profile ? [
                  {id: `UserProfile.id_${user.profile.id}`, name: `id : ${user.profile.id}`},
                ] : []
              },
              {
                id: `User.role_${userId}`,
                name: `Role :`,
                children: user.role ? [
                  {id: `Role.name_${user.role.id}`, name: `${user.role.name}`},
                ] : []
              },
              {
                id: `User.teams_${userId}`,
                name: `Teams(${teams.length ? teams.length : 'Not'}) :`,
                children: teams
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
