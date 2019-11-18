<template>
  <div>
    <!-- Confirm Dialog -->
    <confirm-dialog
      :confirm-dialog="confirmDialog"
      :title-dialog="$t('management.confirm_delete_title')"
      :text-dialog="$t('management.confirm_delete_description')"
      :run-action="deleteItem"
      v-on:onCloseDialog="confirmDialog = false"
    ></confirm-dialog>
    <!-- Users for team dialog -->
    <v-dialog v-model="teamUsersDialog" scrollable max-width="400px">
      <v-card>
        <!-- Toolbar -->
        <v-toolbar color="primary" dark>
          <v-icon class="mr-3">mdi-account-group</v-icon>
          <v-toolbar-title>{{ selItem.teamName }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon v-on:click="teamUsersDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <!-- Text content -->
        <v-card-text style="height: 300px;">
          <v-list three-line>
            <template v-for="(member, index) in selItem.members">
              <v-list-item
                :key="member.id"
              >
                <v-list-item-avatar><img :src="member.avatar"></v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title v-html="member.fullName"></v-list-item-title>
                  <v-list-item-subtitle
                    v-html="`<span class='font-italic'>Email:</span> ${member.email}`"></v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list>
        </v-card-text>
        <!-- Actions -->
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn text class="mx-auto mb-3" color="primary" @click="teamUsersDialog = false">{{ $t('management.close')
            }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Toolbar for table -->
    <v-sheet class="d-flex align-baseline mb-5">
      <v-text-field
        v-model="search"
        append-icon="fas fa-search"
        :label="$t('management.search')"
        single-line
        hide-details
      ></v-text-field>
      <v-spacer></v-spacer>
      <!-- Save Dialog -->
      <v-dialog v-model="dialog" max-width="620">
        <!-- Activator -->
        <template v-slot:activator="{ on }">
          <v-btn text color="primary" v-on="on">{{ $t('management.new_item') }}</v-btn>
        </template>
        <!-- Content Dialog -->
        <v-card>
          <!-- Team Form -->
          <v-form @submit.prevent="onSubmit">
            <v-card-text>
              <div class="text-center">
                <h1 class="my-4 primary--text font-weight-light">{{ formTitle }}</h1>
              </div>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    :counter="60"
                    v-validate="'required|max:60'"
                    :error-messages="errors.collect('teamName')"
                    data-vv-name="teamName"
                    v-model="editedItem.teamName"
                    :label="$t('management.teamName')"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    v-model="editedItem.description"
                    :value="editedItem.description"
                    :label="$t('management.formDescription')"
                  ></v-textarea>
                </v-col>
                <v-col cols="12">
                  <v-autocomplete
                    v-model="editedItem.userIds"
                    :items="users"
                    filled
                    chips
                    :label="$t('management.selectUsers')"
                    item-text="fullName"
                    item-value="id"
                    multiple
                  >
                    <template v-slot:selection="data">
                      <v-chip
                        :input-value="data.selected"
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
                </v-col>
              </v-row>
            </v-card-text>
            <!-- Actions -->
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" type="submit" :loading="loadingSubmit">
                {{ $t('management.save') }}
              </v-btn>
              <v-btn @click="close">
                {{ $t('management.cancel') }}
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>
    </v-sheet>
    <!-- Data Table -->
    <v-data-table
      :headers="headers"
      :items="teams"
      :search="search"
      class="elevation-1"
    >

      <!-- Field userNames -->
      <template v-slot:item.userNames="{ item }">
        <v-btn icon v-if="item.userNames" @click="clickItem(item)">
          <v-badge color="red" overlap>
            <template v-slot:badge>{{ item.userIds.length }}</template>
            <v-icon>mdi-account-multiple</v-icon>
          </v-badge>
        </v-btn>
        <v-icon v-else>mdi-code-brackets</v-icon>
      </template>
      <!-- Field Actions -->
      <template v-slot:item.actions="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="clickEditItem(item)"
          :title="$t('common.edit')"
        >fas fa-pencil-alt
        </v-icon>
        <v-icon
          small
          @click="clickDeleteItem(item)"
          :title="$t('common.remove')"
        >fas fa-trash-alt
        </v-icon>
      </template>
      <!-- No Data -->
      <template v-slot:no-data>
        <span color="primary" class="headline">{{ $t('management.noData') }}</span>
      </template>
      <!-- No Results -->
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
  import ConfirmDialog from '~/components/layout/ConfirmDialog';

  const errors = require('@feathersjs/errors');
  const debug = require('debug')('app:comp.admins-management-roles');

  const isLog = false;
  const isDebug = false;

  export default {
    $_veeValidate: {
      validator: 'new'
    },
    components: {
      ConfirmDialog,
    },
    data: () => ({
      search: '',
      dialog: false,
      confirmDialog: false,
      teamUsersDialog: false,
      loadingSubmit: false,
      error: undefined,
      headers: [
//        {
//          text: 'ID',
//          align: 'left',
//          value: 'id',
//          sortable: false,
//        },
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
          value: 'actions',
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
      isYouSelf(teamId) {
        const teamIds = this.user? this.user.teams.map(team => team.id) : [];
        return teamIds.includes(teamId);
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
