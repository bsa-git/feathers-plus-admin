<template>
  <div>
    <!-- Confirm Dialog -->
    <v-dialog v-model="confirmDialog" persistent max-width="320">
      <v-card>
        <v-card-title class="headline">{{ $t('management.confirm_delete_title') }}?</v-card-title>
        <v-card-text>
          {{ $t('management.confirm_delete_description') }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat @click="confirmDialog = false">{{ $t('management.disagree') }}</v-btn>
          <v-btn color="primary" flat @click="deleteItem">{{ $t('management.agree') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Users for team dialog -->
    <v-dialog v-model="teamUsersDialog" scrollable max-width="400px">
      <v-card>
        <v-card-title>
          <v-icon class="mr-3">people</v-icon>
          <span>{{ selItem.teamName }}</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 300px;">
          <v-list three-line>
            <template v-for="(member, index) in selItem.members">
              <v-list-tile
                :key="member.id"
                avatar
                @click=""
              >
                <v-list-tile-avatar>
                  <img :src="member.avatar">
                </v-list-tile-avatar>

                <v-list-tile-content>
                  <v-list-tile-title v-html="member.fullName"></v-list-tile-title>
                  <v-list-tile-sub-title
                    v-html="`<span class='font-italic'>Email:</span> ${member.email}`"></v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              <!--<v-divider v-if="index < selItem.members.length - 1"></v-divider>-->
            </template>
          </v-list>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click="teamUsersDialog = false">{{ $t('management.close') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Toolbar for table -->
    <v-toolbar flat color="white">
      <v-text-field
        v-model="search"
        append-icon="search"
        :label="$t('management.search')"
        single-line
        hide-details
      ></v-text-field>
      <v-spacer></v-spacer>
      <!-- Save Dialog -->
      <v-dialog v-model="dialog" max-width="620">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark class="mb-2" v-on="on">{{ $t('management.new_item') }}</v-btn>
        </template>
        <v-card class="elevation-1 pa-3">
          <v-form @submit.prevent="onSubmit">
            <v-card-text>
              <div class="layout column align-center">
                <!--<v-icon size="120">people</v-icon>-->
                <h1 class="my-4 primary--text font-weight-light">{{ formTitle }}</h1>
              </div>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12>
                    <v-text-field
                      :counter="60"
                      v-validate="'required|max:60'"
                      :error-messages="errors.collect('teamName')"
                      data-vv-name="teamName"
                      v-model="editedItem.teamName"
                      :label="$t('management.teamName')"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-textarea
                      v-model="editedItem.description"
                      :value="editedItem.description"
                      :label="$t('management.formDescription')"
                    ></v-textarea>
                  </v-flex>
                  <v-flex xs12>
                    <v-autocomplete
                      v-model="editedItem.userIds"
                      :items="users"
                      box
                      chips
                      :label="$t('management.selectUsers')"
                      item-text="fullName"
                      item-value="id"
                      multiple
                    >
                      <template v-slot:selection="data">
                        <v-chip
                          :selected="data.selected"
                          close
                          class="chip--select-multi"
                          @input="deleteItemFromSelection(data.item)"
                        >
                          <v-avatar>
                            <img :src="data.item.avatar">
                          </v-avatar>
                          {{ data.item.fullName }}
                        </v-chip>
                      </template>
                    </v-autocomplete>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn block color="primary" type="submit" :loading="loadingSubmit">
                {{ $t('management.save') }}
              </v-btn>
              <v-btn block @click="close">
                {{ $t('management.cancel') }}
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <!-- Data Table -->
    <v-data-table
      :headers="headers"
      :items="teams"
      :search="search"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <td>{{ props.item.id }}</td>
        <td>{{ props.item.teamName }}</td>
        <td>{{ props.item.description }}</td>
        <td>
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" flat icon v-if="props.item.userNames === ''">
                <v-icon>code</v-icon>
              </v-btn>
              <v-btn v-on="on" flat icon v-else>
                <v-icon @click="clickItem(props.item)">settings_ethernet</v-icon>
              </v-btn>
            </template>
            <span>{{ props.item.userNames === '' ? '[ ]' : props.item.userNames}}</span>
          </v-tooltip>
        </td>
        <td class="justify-center layout px-0">
          <v-icon
            small
            class="mr-2"
            @click="clickEditItem(props.item)"
          >
            edit
          </v-icon>
          <v-icon
            small
            @click="clickDeleteItem(props.item)"
          >
            delete
          </v-icon>
        </td>
      </template>
      <template v-slot:no-data>
        <span color="primary" class="headline">{{ $t('management.noData') }}</span>
      </template>
      <template v-slot:no-results>
        <v-alert :value="true" color="error" icon="warning">
          {{ $t('management.searchNoResults') }}
        </v-alert>
      </template>
    </v-data-table>
  </div>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex'

  const errors = require('@feathersjs/errors');
  const debug = require('debug')('app:comp.admins-management-roles');

  const isLog = false;
  const isDebug = false;

  export default {
    $_veeValidate: {
      validator: 'new'
    },
    data: () => ({
      search: '',
      dialog: false,
      confirmDialog: false,
      teamUsersDialog: false,
      loadingSubmit: false,
      error: undefined,
      headers: [
        {
          text: 'ID',
          align: 'left',
          value: 'id',
          sortable: false,
        },
        {
          text: 'Team Name',
          align: 'left',
          value: 'teamName'
        },
        {
          text: 'Description',
          align: 'left',
          value: 'description',
          sortable: false,
        },
        {
          text: 'Users',
          align: 'left',
          value: 'userNames',
          sortable: false,
        },
        {
          text: 'Actions',
          value: 'name',
          sortable: false
        }
      ],
      editedIndex: -1,
      idItem: null,
      selItem: {users: []},
      editedItem: {
        teamName: '',
        description: '',
        userIds: [],
        userNames: '',
      },
      defaultItem: {
        teamName: '',
        description: '',
        userIds: [],
        userNames: '',
      }
    }),
    created: function () {
    },
    computed: {
      formTitle() {
        return this.editedIndex === -1 ? this.$t('management.new_item') : this.$t('management.edit_item')
      },
      isNewItem() {
        return this.editedIndex === -1
      },
      ...mapGetters({
        user: 'getUser',
      }),
      users() {
        const data = [];
        const idFieldUser = this.$store.state.users.idField;
        const {User} = this.$FeathersVuex;
        const users = User.findInStore({query: {$sort: {fullName: 1}}}).data;
        users.forEach(user => {
          const userId = user[idFieldUser];
          // Get user
          let item = {
            id: userId,
            fullName: user.fullName,
            email: user.email,
            avatar: user.avatar,
            roleId: user.roleId ? user.roleId : '',
            roleName: user.role ? user.role.name : '',
          };
          data.push(item);
        });
        if (isLog) debug('users.data:', data);
        return data
      },
      teams() {
        const data = [];
        const idFieldTeam = this.$store.state.teams.idField;
        const {Team} = this.$FeathersVuex;
        const teams = Team.findInStore({query: {$sort: {name: 1}}}).data;
        teams.forEach(team => {
          const teamId = team[idFieldTeam];
          // Get team
          let item = {
            id: teamId,
            teamName: team.name,
            description: team.description,
            members: team.members,
            userIds: team.members.map(member => member.id),
            userNames: team.members.map(member => member.fullName).join(', ')
          };
          data.push(item);
        });
        if (isLog) debug('teams.data:', data);
        return data
      },
    },

    watch: {
      dialog(val) {
        if (val) {
          this.$validator.reset();
          this.dismissError();
        }
      }
    },
    methods: {

      isYouSelf(userId) {
        const idField = this.$store.state.users.idField;
        return userId === this.user[idField];
      },

      clickEditItem(item) {
        this.editedIndex = this.teams.indexOf(item);
        const team = this.getTeam(item.id);
        this.editedItem = Object.assign({}, team);
        this.dialog = true;
      },

      clickDeleteItem(item) {
        this.idItem = item.id;
        this.confirmDialog = true;
      },

      clickItem(item) {
        this.selItem = item;
        this.teamUsersDialog = true;
      },

      deleteItemFromSelection(item) {
        const index = this.editedItem.userIds.indexOf(item.id);
        if (index >= 0) this.editedItem.userIds.splice(index, 1)
      },

      close() {
        this.dialog = false;
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
        this.$validator.reset();
        this.dismissError();
      },

      dismissError() {
        this.error = undefined;
      },

      getTeam(id) {
        const idFieldTeam = this.$store.state.teams.idField;
        const {Team} = this.$FeathersVuex;
        const team = Team.getFromStore(id);
        const teamId = team[idFieldTeam];
        // Get role
        let item = {
          id: teamId,
          teamName: team.name,
          description: team.description,
          userIds: team.members.map(member => member.id),
          userNames: team.members.map(member => member.fullName).join(', ')
        };
        if (isLog) debug('getTeam.item:', item);
        return item
      },

      async onSubmit() {
        try {
          this.dismissError();
          await this.$validator.validateAll();
          if (this.$validator.errors.any()) {
            this.showError('Validation Error!');
          } else {
            this.loadingSubmit = true;
            if (isLog) debug('formData:', this.editedItem);
            const saveResponse = await this.save(this.editedItem);
            if (saveResponse) {
              if (isLog) debug('save().response:', saveResponse);
              const idFieldTeam = this.$store.state.teams.idField;
              const teamId = saveResponse[idFieldTeam];
              const updatedUserIds = await this.updateUserIds(teamId, this.editedItem.userIds);
              if (isLog) debug('updatedUserIds:', updatedUserIds);
              this.showSuccess(`${this.$t('management.success')}!`);
              setTimeout(() => {
                this.loadingSubmit = false;
                this.close();
              }, 1000);
            }
          }
        } catch (error) {
          if (isLog) debug('onSubmit.error:', error);
        }
      },

      async save(data) {
        const idField = this.$store.state.teams.idField;
        const {Team} = this.$FeathersVuex;
        try {
          let team;
          if (this.isNewItem) {
            team = new Team({
              name: data.teamName,
              description: data.description
            });
          } else {
            team = new Team({
              [idField]: data.id,
              name: data.teamName,
              description: data.description
            });
          }
          return await team.save();
        } catch (error) {
          if (isLog) debug('team.save.error:', error);
          this.loadingSubmit = false;
          this.showError(error.message);
          // Recover team data
          if (!this.isNewItem) {
            await Team.get(data.id);
          }
        }
      },

      async updateUserIds(teamId, userIds = []) {
        try {
          if (isDebug) debug('updateUserIds.teamId:', teamId, 'userIds:', userIds);
          let omitUserIds = [];
          const updatedUserIds = {added: [], removed: []};
          const idFieldUserTeams = this.$store.state['user-teams'].idField;
          const {UserTeam} = this.$FeathersVuex;
          // Users excluded from the team
          const userTeams = UserTeam.findInStore({query: {teamId: teamId}}).data;
          userTeams.forEach(async userTeam => {
            const userId = userTeam[userId];
            const isUserId = userIds.indexOf(userId) >= 0;
            if (isUserId) {
              omitUserIds.push(userId);
            } else {
              const userTeamId = userTeam[idFieldUserTeams];
              userTeam = new UserTeam({[idFieldUserTeams]: userTeamId});
              const removeResponse = await userTeam.remove();
              updatedUserIds.removed.push(removeResponse);
            }
          });
          if (isLog) debug('updateUserIds.removed', updatedUserIds.removed);
          // Users added to the team
          const filterUserIds = userIds.filter(userId => omitUserIds.indexOf(userId) < 0);
          filterUserIds.forEach(async userId => {
            const userTeam = new UserTeam({teamId: teamId, userId: userId});
            const saveResponse = await userTeam.save();
            updatedUserIds.added.push(saveResponse);
          });
          if (isLog) debug('updateUserIds.added', updatedUserIds.added);
          return updatedUserIds;
        } catch (error) {
          if (isLog) debug('updateUserIds.error:', error);
          this.showError(error.message);
        }
      },

      async deleteItem() {
        try {
          this.confirmDialog = false;
          const {Team} = this.$FeathersVuex;
          const idField = this.$store.state.teams.idField;
          const team = new Team({[idField]: this.idItem});
          await team.remove();
          this.showSuccess(`${this.$t('management.success')}!`);
          this.idItem = null;
        } catch (error) {
          if (isLog) debug('deleteItem.error:', error);
          this.showError(error.message);
        }
      },
      ...mapMutations({
        showSuccess: 'SHOW_SUCCESS',
        showError: 'SHOW_ERROR',
      }),
    }
  }
</script>
