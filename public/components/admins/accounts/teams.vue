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
      :items="teams"
      :search="search"
      :active.sync="active"
      :open.sync="open"
      activatable
      open-on-click
      active-class="primary--text"
      transition
    >
      <template v-slot:prepend="{ item, active }">
        <v-icon v-if="item.id.startsWith('member.fullName')">mdi-account</v-icon>
        <v-icon v-else-if="item.name.includes('id :')" :color="active ? 'primary' : ''">
          mdi-check
        </v-icon>
      </template>
    </v-treeview>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  const debug = require('debug')('app:comp.admins-accounts-teams');
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
      teams() {
        const data = [];
        const idFieldTeam = this.$store.state.teams.idField;
        const {Team} = this.$FeathersVuex;
        const teams = Team.findInStore({query: {$sort: {name: 1}}}).data;
        if (isLog) debug('Teams from store:', teams);
        teams.forEach(team => {
          const teamId = team[idFieldTeam];
          // Find members for team
          const members = [];
          team.members.forEach(member => {
            members.push({
              id: `User.fullName_${member.id}`,
              name: `${member.fullName}`,
            })
          });
          if (isLog) debug('members:', members);
          // Get team
          let item = {
            id: `Team.name_${teamId}`,
            name: `${team.name} :`,
            children: [
              {id: `Team.id_${teamId}`, name: `id : ${teamId}`},
              {
                id: `Team.members${teamId}`,
                name: `Members(${members.length ? members.length : 'Not'}) :`,
                children: members
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
