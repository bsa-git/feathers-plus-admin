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
    <!-- Users for role dialog -->
    <v-dialog v-model="roleUsersDialog" scrollable max-width="400px">
      <v-card>
        <v-card-title>
          <v-icon class="mr-3">security</v-icon>
          <span>{{ selItem.roleName }}</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 300px;">
          <v-list three-line>
            <template v-for="(user, index) in selItem.users">
              <v-list-tile
                :key="user.id"
                avatar
                @click=""
              >
                <v-list-tile-avatar>
                  <img :src="user.avatar">
                </v-list-tile-avatar>

                <v-list-tile-content>
                  <v-list-tile-title v-html="user.fullName"></v-list-tile-title>
                  <v-list-tile-sub-title v-html="`<span class='font-italic'>Email:</span> ${user.email}`"></v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              <!--<v-divider v-if="index < selItem.users.length - 1"></v-divider>-->
            </template>
          </v-list>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click="roleUsersDialog = false">{{ $t('management.close') }}</v-btn>
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
                <!--<v-icon size="120">security</v-icon>-->
                <h1 class="my-4 primary--text font-weight-light">{{ formTitle }}</h1>
              </div>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12>
                    <v-text-field
                      :counter="60"
                      v-validate="'required|max:60'"
                      :error-messages="errors.collect('roleName')"
                      data-vv-name="roleName"
                      v-model="editedItem.roleName"
                      :label="$t('management.roleName')"
                      :hint="$t('management.matchEnvValue')"
                      persistent-hint
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
      :items="roles"
      :search="search"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <td>{{ props.item.id }}</td>
        <td>{{ props.item.roleName }}</td>
        <td>{{ props.item.description }}</td>
        <td>
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" flat icon v-if="props.item.userNames === ''"><v-icon>code</v-icon></v-btn>
              <v-btn v-on="on" flat icon v-else><v-icon @click="clickItem(props.item)">settings_ethernet</v-icon></v-btn>
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
            :disabled="!isDelete(props.item.roleName)"
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
      roleUsersDialog: false,
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
          text: 'Role Name',
          align: 'left',
          value: 'roleName'
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
        roleName: '',
        description: '',
        userIds: [],
        userNames: '',
      },
      defaultItem: {
        roleName: '',
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
        getRoles: 'getRoles',
        isEnvRole: 'isEnvRole'
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
            roleName: role.name,
            description: role.description,
            users: role.users,
            userIds: role.users.map(user => user.id),
            userNames: role.users.map(user => user.fullName).join(', ')
          };
          data.push(item);
        });
        if (isLog) debug('roles.data:', data);
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

      isDelete(roleName) {
        return !this.isEnvRole(roleName);
      },

      isYouSelf(userId) {
        const idField = this.$store.state.users.idField;
        return userId === this.user[idField];
      },

      clickEditItem(item) {
        this.editedIndex = this.roles.indexOf(item);
        const role = this.getRole(item.id);
        this.editedItem = Object.assign({}, role);
        this.dialog = true;
      },

      clickDeleteItem(item) {
        this.idItem = item.id;
        this.confirmDialog = true;
      },

      clickItem(item) {
        this.selItem = item;
        this.roleUsersDialog = true;
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

      getRole(id) {
        const idFieldRole = this.$store.state.roles.idField;
        const {Role} = this.$FeathersVuex;
        const role = Role.getFromStore(id);
        const roleId = role[idFieldRole];
        // Get role
        let item = {
          id: roleId,
          roleName: role.name,
          description: role.description,
          userIds: role.users.map(user => user.id),
          userNames: role.users.map(user => user.fullName).join(', ')
        };
        if (isLog) debug('getRole.item:', item);
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
              const idFieldRole = this.$store.state.roles.idField;
              const roleId = saveResponse[idFieldRole];
//              if (isLog) debug('onSubmit.editedItem.userIds:', this.editedItem.userIds);
              const updatedUserIds = await this.updateUserIds(roleId, this.editedItem.userIds);
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
        const idField = this.$store.state.roles.idField;
        const {Role} = this.$FeathersVuex;
        try {
          let role;
          if (this.isNewItem) {
            role = new Role({
              name: data.roleName,
              description: data.description
            });
          } else {
            if (!this.isEnvRole(data.roleName)) throw new errors.Conflict(this.$t('management.errRoleNameNotExistInEnv'));
            role = new Role({
              [idField]: data.id,
              name: data.roleName,
              description: data.description
            });
          }
          return await role.save();
        } catch (error) {
          if (isLog) debug('role.save.error:', error);
          this.loadingSubmit = false;
          this.showError(error.message);
          // Recover role data
          if (!this.isNewItem) {
            await Role.get(data.id);
          }
        }
      },

      async updateUserIds(roleId, userIds = []) {
        try {
          if (isDebug) debug('updateUserIds.roleId:', roleId, 'userIds:', userIds);
          let omitUserIds = [];
          let newUser, saveResponse = null;
          const updatedUserIds = {added: [], removed: []};
          const idFieldRole = this.$store.state.roles.idField;
          const idFieldUser = this.$store.state.users.idField;
          const {Role, User} = this.$FeathersVuex;
          const guestName = this.getRoles('isGuest');
          const roles = Role.findInStore({query: {name: guestName}}).data;
          const guestId = roles.length ? roles[0][idFieldRole] : '';
          const role = Role.getFromStore(roleId);
          if (!guestId) throw new errors.NotFound(this.$t('management.errGuestRoleNotExist'));
          // Users excluded from the role
          let users = User.findInStore({query: {roleId: roleId}}).data;
          users.forEach(async user => {
            const userId = user[idFieldUser];
            const isUserId = userIds.indexOf(userId) >= 0;
            if (isUserId) {
              omitUserIds.push(userId);
            } else {
              if (roleId !== guestId && !this.isYouSelf(userId)) {
                newUser = new User({[idFieldUser]: userId, roleId: guestId});
                saveResponse = await newUser.save();
                updatedUserIds.removed.push(saveResponse);
              }
            }
          });
          if (isLog) debug('updateUserIds.removed', updatedUserIds.removed);
          // Users added to the role
          const filterUserIds = userIds.filter(userId => omitUserIds.indexOf(userId) < 0);
          users = User.findInStore({query: {[idFieldUser]: {$in: filterUserIds}}}).data;
          users.forEach(async user => {
            const userId = user[idFieldUser];
            if (!this.isYouSelf(userId) && this.isEnvRole(role.name)) {
              newUser = new User({[idFieldUser]: userId, roleId: roleId});
              saveResponse = await newUser.save();
              updatedUserIds.added.push(saveResponse);
            }
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
          const {Role} = this.$FeathersVuex;
          const idField = this.$store.state.roles.idField;
          const role = new Role({[idField]: this.idItem});
          await role.remove();
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
