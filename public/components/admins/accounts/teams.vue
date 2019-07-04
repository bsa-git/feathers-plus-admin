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
        :items="teams"
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
          <v-icon v-if="item.id.startsWith('member.fullName')">person</v-icon>
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

  const debug = require('debug')('app:comp.admins-accounts-teams');

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
