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
    <!-- Teams for user dialog -->
    <v-dialog v-model="userTeamsDialog" scrollable max-width="400px">
      <v-card>
        <v-card-title>
          <v-icon class="mr-3">person</v-icon>
          <span>{{ `${selItem.firstName} ${selItem.lastName}` }}</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 300px;">
          <v-list three-line>
            <template v-for="(team, index) in selItem.teams">
              <v-list-tile
                :key="team.id"
                avatar
                @click=""
              >
                <v-list-tile-avatar>
                  <v-icon>people</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title v-html="team.name"></v-list-tile-title>
                  <v-list-tile-sub-title v-html="team.description"></v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              <!--<v-divider v-if="index < selItem.teams.length - 1"></v-divider>-->
            </template>
          </v-list>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click="userTeamsDialog = false">{{ $t('management.close') }}</v-btn>
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
      <v-dialog v-model="dialog" max-width="600">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark class="mb-2" v-on="on">{{ $t('management.new_item') }}</v-btn>
        </template>
        <v-card class="elevation-1 pa-3">
          <v-form @submit.prevent="onSubmit">
            <v-card-text>
              <div class="layout column align-center">
                <v-icon size="120" v-if="isNewItem" v-text="isNewItem? 'fas fa-user-plus':'fas fa-user'"></v-icon>
                <v-avatar size="120" v-else><img :src="editedItem.avatar"></v-avatar>
                <h1 class="my-4 primary--text font-weight-light">{{ formTitle }}</h1>
              </div>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm6>
                    <v-text-field
                      :counter="10"
                      v-validate="'required|max:20'"
                      :error-messages="errors.collect('firstName')"
                      data-vv-name="firstName"
                      v-model="editedItem.firstName"
                      :label="$t('management.firstName')"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-text-field
                      :counter="20"
                      v-validate="'required|max:20'"
                      :error-messages="errors.collect('lastName')"
                      data-vv-name="lastName"
                      v-model="editedItem.lastName"
                      :label="$t('management.lastName')"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field
                      append-icon="email"
                      v-validate="'required|email'"
                      :error-messages="errors.collect('email')"
                      data-vv-name="email"
                      v-model="editedItem.email"
                      :label="$t('management.email')"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-text-field
                      v-if="isNewItem"
                      append-icon="lock"
                      v-validate="'required|min:3'"
                      :error-messages="errors.collect('password')"
                      data-vv-name="password"
                      v-model="editedItem.password"
                      :label="$t('management.password')"
                      type="password"
                      ref="confirmation"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-text-field
                      v-if="isNewItem"
                      append-icon="lock"
                      v-validate="'required|confirmed:confirmation'"
                      :error-messages="errors.collect('passwordConfirmation')"
                      data-vv-name="passwordConfirmation"
                      v-model="editedItem.passwordConfirmation"
                      :label="$t('management.passwordConfirmation')"
                      type="password"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-select
                      append-icon="security"
                      v-model="editedItem.roleId"
                      v-validate=""
                      item-text="name"
                      item-value="id"
                      :items="roles"
                      :error-messages="errors.collect('roleId')"
                      :label="$t('management.selectRole')"
                      data-vv-name="roleId"
                    >
                      <template v-slot:selection="{ item }">
                        <v-chip>
                          <span>{{ (item.name.length > 25) ? item.name.slice(0, 24) + '...' : item.name }}</span>
                        </v-chip>
                      </template>
                    </v-select>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-select
                      append-icon="group"
                      v-model="editedItem.teamIds"
                      v-validate=""
                      item-text="name"
                      item-value="id"
                      :items="teams"
                      :error-messages="errors.collect('teamIds')"
                      :label="$t('management.selectTeams')"
                      data-vv-name="teamIds"
                      multiple
                    >
                      <template v-slot:selection="{ item, index }">
                        <v-chip v-if="index === 0">
                          <span>{{ (item.name.length > 15) ? item.name.slice(0, 15) + '...' : item.name }}</span>
                        </v-chip>
                        <span
                          v-if="index === 1"
                          class="grey--text caption"
                        >(+{{ editedItem.teamIds.length - 1 }} {{ $t('management.others') }})</span>
                      </template>
                    </v-select>
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
      :items="users"
      :search="search"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <td>{{ props.item.id }}</td>
        <td>
          <v-avatar size="32"><img :src="props.item.avatar"></v-avatar>
        </td>
        <td>{{ props.item.fullName }}</td>
        <td>{{ props.item.email }}</td>
        <td>{{ props.item.roleName }}</td>
        <td>
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" flat icon v-if="props.item.teamNames === ''">
                <v-icon>code</v-icon>
              </v-btn>
              <v-btn v-on="on" flat icon v-else>
                <v-icon @click="clickItem(props.item)">settings_ethernet</v-icon>
              </v-btn>
            </template>
            <span>{{ props.item.teamNames === '' ? '[ ]' : props.item.teamNames}}</span>
          </v-tooltip>
        </td>
        <td class="justify-center layout px-0">
          <v-icon
            small
            class="mr-2"
            @click="clickEditItem(props.item)"
            :disabled="isYouSelf(props.item.id)"
          >
            edit
          </v-icon>
          <v-icon
            small
            @click="clickDeleteItem(props.item)"
            :disabled="isYouSelf(props.item.id)"
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

  const debug = require('debug')('app:comp.admins-management-users');

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
      userTeamsDialog: false,
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
          text: 'Avatar',
          value: 'avatar',
          sortable: false,
        },
        {
          text: 'Full Name',
          align: 'left',
          value: 'fullName'
        },
        {
          text: 'Email',
          align: 'left',
          value: 'email'
        },
        {
          text: 'Role Name',
          align: 'left',
          value: 'roleName'
        },
        {
          text: 'Teams',
          align: 'left',
          value: 'teamNames',
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
      selItem: {teams: []},
      editedItem: {
        firstName: '',
        lastName: '',
        email: '',
        avatar: '',
        roleId: '',
        teamIds: [],
        teamNames: '',
        password: '',
        passwordConfirmation: ''
      },
      defaultItem: {
        firstName: '',
        lastName: '',
        email: '',
        avatar: '',
        roleId: '',
        teamIds: [],
        teamNames: '',
        password: '',
        passwordConfirmation: ''
      }
    }),
    created: function () {
//      this.$refs.admins.value = true;
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
            firstName: user.firstName,
            lastName: user.lastName,
            fullName: user.fullName,
            email: user.email,
            avatar: user.avatar,
            teams: user.teams,
            roleId: user.roleId ? user.roleId : '',
            roleName: user.role ? user.role.name : '',
            teamIds: user.teams.map(team => team.id),
            teamNames: user.teams.map(team => team.name).join(', ')
          };
          data.push(item);
        });
        if (isLog) debug('users.data:', data);
        return data
      },
      roles() {
        const data = [];
        const idFieldRole = this.$store.state.roles.idField;
        const {Role} = this.$FeathersVuex;
        const roles = Role.findInStore({query: {$sort: {name: 1}}}).data;
        roles.forEach(role => {
          const roleId = role[idFieldRole];
          // Get role
          let item = {
            id: roleId,
            name: role.name,
          };
          data.push(item);
        });
        if (isLog) debug('roles.data:', data);
        return data
      },
      teams() {
        const data = [];
        const idFieldTeam = this.$store.state.teams.idField;
        const {Team} = this.$FeathersVuex;
        const teams = Team.findInStore({query: {$sort: {name: 1}}}).data;
        teams.forEach(team => {
          const teamId = team[idFieldTeam];
          // Get role
          let item = {
            id: teamId,
            name: team.name,
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
        this.editedIndex = this.users.indexOf(item);
        this.editedItem = Object.assign({}, item);
        this.dialog = true;
      },

      clickDeleteItem(item) {
        this.idItem = item.id;
        this.confirmDialog = true;
      },

      clickItem(item) {
        this.selItem = item;
        this.userTeamsDialog = true;
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
              if (isLog) debug('user.save().response:', saveResponse);
              const idFieldUser = this.$store.state.users.idField;
              const userId = saveResponse[idFieldUser];
              const updateMemberIds = await this.updateMemberIds(userId, this.editedItem.teamIds);
              if (isLog) debug('updateMemberIds:', updateMemberIds);
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
        try {
          let user;
          const idField = this.$store.state.users.idField;
          const {User} = this.$FeathersVuex;
          if (this.isNewItem) {
            if (!data.avatar) {
              const avatar = new this.$Avatar(data.email);
              data.avatar = await avatar.getImage();
            }
            user = new User({
              firstName: data.firstName,
              lastName: data.lastName,
              email: data.email,
              avatar: data.avatar,
              roleId: data.roleId,
              password: data.password
            });
          } else {
            user = User.getFromStore(data.id);
            if ((data.email !== user.email) || !data.avatar) {
              const avatar = new this.$Avatar(data.email);
              data.avatar = await avatar.getImage();
            }
            user = new User({
              [idField]: data.id,
              firstName: data.firstName,
              lastName: data.lastName,
              email: data.email,
              avatar: data.avatar,
              roleId: data.roleId
            });
          }
          return await user.save();
        } catch (error) {
          if (isLog) debug('user.save.error:', error);
          this.loadingSubmit = false;
          this.showError(error.message);
        }
      },

      async updateMemberIds(userId, teamIds = []) {
        try {
          if (isDebug) debug(`updateMemberIds: userId=${userId}; teamIds=${teamIds}`);
          let userTeam = null;
          const updateMemberIds = {created: [], removed: []};
          const idFieldTeam = this.$store.state.teams.idField;
          const idFieldUserTeams = this.$store.state['user-teams'].idField;
          const {Team, UserTeam} = this.$FeathersVuex;
          const teams = Team.findInStore({query: {$sort: {name: 1}}}).data;
          if (isLog) debug('updateMemberIds.teams:', teams);
          teams.forEach(async team => {
            const teamId = team[idFieldTeam];
            const data = {
              teamId: '',
              userId: ''
            };
            const isTeamId = teamIds.indexOf(teamId) >= 0;
            const memberIds = team.members.map(member => member.id);
            const indexUserId = memberIds.indexOf(userId);
            const isUserId = indexUserId >= 0;
            // Add userId to this team
            if (isTeamId && !isUserId) {
              data.teamId = teamId;
              data.userId = userId;
              userTeam = new UserTeam(data);
              const saveResponse = await userTeam.save();
              updateMemberIds.created.push(saveResponse);
            }
            // Remove userId from this team
            if (isUserId && !isTeamId) {
              const items = UserTeam.findInStore({query: {teamId: teamId, userId: userId}}).data;
              if (items.length) {
                userTeam = new UserTeam({[idFieldUserTeams]: items[0][idFieldUserTeams]});
                const removeResponse = await userTeam.remove();
                updateMemberIds.removed.push(removeResponse);
              }
            }
          });
          return updateMemberIds;
        } catch (error) {
          if (isLog) debug('team.save.error:', error);
          this.showError(error.message);
        }
      },

      async deleteItem() {
        try {
          this.confirmDialog = false;
          const {User} = this.$FeathersVuex;
          const idField = this.$store.state.users.idField;
          const user = new User({[idField]: this.idItem});
          await user.remove();
          this.showSuccess(`${this.$t('management.success')}!`);
          this.idItem = null;
        } catch (error) {
          if (isLog) debug('user.remove.error:', error);
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
