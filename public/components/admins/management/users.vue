<template>
  <div>
    <!--=== Confirm Dialog ===-->
    <confirm-dialog
      :confirm-dialog="confirmDialog"
      :title-dialog="$t('management.confirm_delete_title')"
      :text-dialog="$t('management.confirm_delete_description')"
      :run-action="deleteItem"
      v-on:onCloseDialog="confirmDialog = false"
    ></confirm-dialog>

    <!--=== Teams for user dialog ===-->
    <v-dialog v-model="userTeamsDialog" scrollable max-width="400px">
      <v-card>
        <!-- Toolbar -->
        <v-toolbar color="primary" dark>
          <v-icon class="mr-3">mdi-account-check</v-icon>
          <v-toolbar-title>{{ `${selItem.firstName} ${selItem.lastName}` }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon v-on:click="userTeamsDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <!-- Text content -->
        <v-card-text>
          <v-list three-line>
            <template v-for="(team, index) in selItem.teams">
              <v-list-item
                :key="team.id"
              >
                <v-list-item-avatar>
                  <v-icon>mdi-account-group</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title v-html="team.name"></v-list-item-title>
                  <v-list-item-subtitle v-html="team.description"></v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list>
        </v-card-text>
        <v-divider></v-divider>
        <!-- Actions -->
        <v-card-actions>
          <v-btn text class="mx-auto mb-3" color="primary" @click="userTeamsDialog = false">{{ $t('management.close') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!--=== Profile for user dialog ===-->
    <v-dialog v-model="userProfileDialog" scrollable max-width="400px">
      <v-card>
        <!-- Toolbar -->
        <v-toolbar color="primary" dark>
          <v-icon class="mr-3">mdi-account-check</v-icon>
          <v-toolbar-title>{{ `${selItem.firstName} ${selItem.lastName}` }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon v-on:click="userProfileDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <!-- Text content -->
        <v-card-text>
          <span v-if="!profileList(selItem.profileId).length">{{ $t('management.noData') }}</span>
          <v-list two-line v-else>
            <template v-for="(item, index) in profileList(selItem.profileId)">
              <v-subheader
                v-if="item.header"
                :key="item.header"
              >
                {{ item.header }}
              </v-subheader>
              <v-list-item
                v-else
                :key="`${item.name}-${index}`"
                @click=""
              >
                <v-list-item-avatar>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title v-html="item.name"></v-list-item-title>
                  <v-list-item-subtitle v-html="item.val"></v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list>
        </v-card-text>
        <v-divider></v-divider>
        <!-- Actions -->
        <v-card-actions>
          <v-btn class="mx-auto mb-3" color="primary" @click="userProfileDialog = false" text>{{ $t('management.close') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!--=== Save User Dialog ===-->
    <v-dialog v-model="userSaveDialog" max-width="600">
      <v-card>
        <!-- Toolbar -->
        <v-toolbar color="primary" dark>
          <v-icon v-if="isNewItem" class="mr-3">fas fa-plus-square</v-icon>
          <v-icon v-else class="mr-3">fas fa-edit</v-icon>
          <v-toolbar-title>{{ formTitle }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon v-on:click="userSaveDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <!-- User Form -->
        <v-form @submit.prevent="onSubmit">
          <v-card-text>
            <div class="text-center">
              <v-icon size="120" v-if="isNewItem">mdi-account-plus</v-icon>
              <v-avatar size="120" v-else><img :src="editedItem.avatar"></v-avatar>
              <h1 class="my-4 primary--text font-weight-light">{{ formTitle }}</h1>
            </div>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  :counter="10"
                  v-validate="'required|max:20'"
                  :error-messages="errors.collect('firstName')"
                  data-vv-name="firstName"
                  v-model="editedItem.firstName"
                  :label="$t('management.firstName')"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  :counter="20"
                  v-validate="'required|max:20'"
                  :error-messages="errors.collect('lastName')"
                  data-vv-name="lastName"
                  v-model="editedItem.lastName"
                  :label="$t('management.lastName')"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  append-icon="mdi-email"
                  v-validate="'required|email'"
                  :error-messages="errors.collect('email')"
                  data-vv-name="email"
                  v-model="editedItem.email"
                  :label="$t('management.email')"
                  :disabled="editedItem.isExternalAccount"
                  :hint="editedItem.isExternalAccount? $t('accounts.emailForExternalAccounts') : ''"
                  persistent-hint
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-if="isNewItem"
                  append-icon="mdi-lock"
                  v-validate="'required|min:3'"
                  :error-messages="errors.collect('password')"
                  data-vv-name="password"
                  v-model="editedItem.password"
                  :label="$t('management.password')"
                  type="password"
                  ref="confirmation"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-if="isNewItem"
                  append-icon="mdi-lock"
                  v-validate="'required|confirmed:confirmation'"
                  :error-messages="errors.collect('passwordConfirmation')"
                  data-vv-name="passwordConfirmation"
                  v-model="editedItem.passwordConfirmation"
                  :label="$t('management.passwordConfirmation')"
                  type="password"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  append-icon="mdi-security"
                  v-model="editedItem.roleId"
                  v-validate=""
                  item-text="name"
                  item-value="id"
                  :items="roles"
                  :error-messages="errors.collect('roleId')"
                  :label="$t('management.selectRole')"
                  data-vv-name="roleId"
                  :disabled="isYouAuth(editedItem.id)"
                >
                  <template v-slot:selection="{ item }">
                    <v-chip>
                      <span>{{ (item.name.length > 25) ? item.name.slice(0, 24) + '...' : item.name }}</span>
                    </v-chip>
                  </template>
                </v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  append-icon="mdi-account-group"
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
              </v-col>
            </v-row>
          </v-card-text>
          <!-- Actions -->
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" type="submit" :loading="loadingSubmit">
              {{ $t('management.save') }}
            </v-btn>
            <v-btn @click="closeUserDialog">
              {{ $t('management.cancel') }}
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>

    <!--=== TopBar for table ===-->
    <v-sheet class="d-flex align-baseline mb-5">
      <!-- User search from table -->
      <v-text-field
        v-model="search"
        append-icon="fas fa-search"
        :label="$t('management.search')"
        single-line
        hide-details
      ></v-text-field>
      <v-spacer></v-spacer>
      <!-- Activator open save dialog  -->
      <v-btn text color="primary" @click="clickNewItem">{{ $t('management.new_item') }}</v-btn>
    </v-sheet>

    <!--==== Data Table ===-->
    <v-data-table
      :headers="headers"
      :items="users"
      :search="search"
    >
      <!-- Field fullName -->
      <template v-slot:item.avatar="{ item }">
        <v-avatar class="" size="32"><img :src="item.avatar"></v-avatar>
      </template>
      <!-- Field Profile -->
      <template v-slot:item.profile="{ item }">
        <v-icon v-if="profileList(item.profileId).length" @click="clickUserProfile(item)">mdi-contain</v-icon>
        <v-icon v-else >mdi-code-brackets</v-icon>
      </template>
      <!-- Field teamNames -->
      <template v-slot:item.teamNames="{ item }">
        <v-btn icon v-if="item.teamNames" @click="clickUserTeams(item)">
          <v-badge color="red" overlap>
            <template v-slot:badge>{{ item.teamIds.length }}</template>
            <v-icon>mdi-account-group</v-icon>
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
          :disabled="isYouAuth(item.id)"
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

  const debug = require('debug')('app:comp.admins-management-users');
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
      confirmDialog: false,
      userSaveDialog: false,
      userTeamsDialog: false,
      userProfileDialog: false,
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
          text: 'Profile',
          align: 'left',
          value: 'profile',
          sortable: false,
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
          value: 'actions',
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

    },
    computed: {
      ...mapGetters({
        user: 'getUser',
        profileList: 'user-profiles/profileList',
        isUserExternalAccount: 'isUserExternalAccount',
        isYouAuth: 'isYouAuth'
      }),
      formTitle() {
        return this.editedIndex === -1 ? this.$t('management.new_item') : this.$t('management.edit_item')
      },
      isNewItem() {
        return this.editedIndex === -1
      },
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
            isExternalAccount: this.isUserExternalAccount(user),
            profileId: user.profileId,
//            profile: user.profile,
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
      userSaveDialog(val) {
        if (val) {
          this.$validator.reset();
          this.dismissError();
        }
      }
    },
    methods: {
      clickEditItem(item) {
        this.editedIndex = this.users.indexOf(item);
        this.editedItem = Object.assign({}, item);
        this.userSaveDialog = true;
      },

      clickNewItem() {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
        this.userSaveDialog = true;
      },

      clickDeleteItem(item) {
        this.idItem = item.id;
        this.confirmDialog = true;
      },

      clickUserTeams(item) {
        this.selItem = item;
        this.userTeamsDialog = true;
      },

      clickUserProfile(item) {
        this.selItem = item;
        this.userProfileDialog = true;
      },

      closeUserDialog() {
        this.userSaveDialog = false;
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
                this.closeUserDialog();
              }, 1000);
            }
          }
        } catch (error) {
          if (isLog) debug('onSubmit.error:', error);
        }
      },

      async save(data) {
        const idField = this.$store.state.users.idField;
        const {User} = this.$FeathersVuex;
        try {
          let user;
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
          // Recover user data
          if (!this.isNewItem) {
            await User.get(data.id);
          }
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
