<template>
  <div>
    <!--=== Confirm Dialog ===-->
    <confirm-dialog
      :dialog="confirmDialog"
      :title-dialog="$t('management.confirm_delete_title')"
      :text-dialog="$t('management.confirm_delete_description')"
      :run-action="deleteItem"
      v-on:onCloseDialog="confirmDialog = false"
    ></confirm-dialog>

    <!--=== Users for role dialog ===-->
    <view-dialog
      :dialog="roleUsersDialog"
      header-icon="mdi-security"
      :header-title="selItem.roleName"
      :action-text="$t('management.close')"
      v-on:onClose="roleUsersDialog = false"
    >
      <div slot="list-content">
        <template v-for="(user, index) in selItem.users">
          <v-list-item
            :key="user.id"
          >
            <v-list-item-avatar><img :src="user.avatar"></v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title v-html="user.fullName"></v-list-item-title>
              <v-list-item-subtitle
                v-html="`<span class='font-italic'>Email:</span> ${user.email}`"></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>
      </div>
    </view-dialog>

    <!--=== Role Save Dialog ===-->
    <save-dialog
      :dialog="roleSaveDialog"
      :on-submit="onSubmit"
      :close-dialog="closeRoleDialog"
      :loading-submit="loadingSubmit"
      :is-new-item="isNewItem"
      :dialog-title="formTitle"
      :content-title="formTitle"
      :action-save-text="$t('management.save')"
      :action-cancel-text="$t('management.cancel')"
    >
      <!-- Slot save-content -->
      <div slot="save-content">
        <v-row>
          <v-col cols="12">
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
                  v-bind="data.attrs"
                  :input-value="data.selected"
                  close
                  @click="data.select"
                  @click:close="deleteItemFromSelection(data.item)"
                >
                  <v-avatar left>
                    <v-img :src="data.item.avatar"></v-img>
                  </v-avatar>
                  {{ data.item.fullName }}
                </v-chip>
              </template>
              <template v-slot:item="data">
                <template>
                  <v-list-item-avatar>
                    <img :src="data.item.avatar">
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title v-html="data.item.fullName"></v-list-item-title>
                    <v-list-item-subtitle v-html="data.item.roleName"></v-list-item-subtitle>
                  </v-list-item-content>
                </template>
              </template>
            </v-autocomplete>
          </v-col>
        </v-row>
      </div>
    </save-dialog>

    <!--=== TopBar for table ===-->
    <table-top-bar
      :search="search"
      :search-label="$t('management.search')"
      :btn-text="$t('management.new_item')"
      :btn-click="clickNewItem"
      v-on:onSearch="search = $event"
    ></table-top-bar>

    <!--=== Data Table ===-->
    <v-data-table
      :headers="headers"
      :items="roles"
      :search="search"
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

      <template v-slot:no-results>
        <v-alert :value="true" color="error" icon="warning">
          {{ $t('management.searchNoResults') }}
        </v-alert>
      </template>
    </v-data-table>
  </div>
</template>

<script>
  const errors = require('@feathersjs/errors');
  import {mapGetters, mapMutations} from 'vuex'
  import ConfirmDialog from '~/components/dialogs/ConfirmDialog';
  import ViewDialog from '~/components/dialogs/ViewDialog';
  import SaveDialog from '~/components/dialogs/SaveDialog';
  import TableTopBar from '~/components/widgets/top-bars/SearchAndBtn';
  import createLogMessage from '~/plugins/service-helpers/create-log-message';


  const debug = require('debug')('app:comp.admins-management-roles');
  const isLog = false;
  const isDebug = true;

  export default {
    $_veeValidate: {
      validator: 'new'
    },
    components: {
      ConfirmDialog,
      ViewDialog,
      SaveDialog,
      TableTopBar
    },
    data: () => ({
      saveLogMessage: null,
      search: '',
      confirmDialog: false,
      roleSaveDialog: false,
      roleUsersDialog: false,
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
          value: 'actions',
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
      this.saveLogMessage = createLogMessage(this.$store);
    },
    computed: {
      ...mapGetters({
        user: 'getUser',
        getRoles: 'getRoles',
        isEnvRole: 'isEnvRole',
        isBaseRole: 'isBaseRole',
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
      roleSaveDialog(val) {
        if (val) {
          this.$validator.reset();
          this.dismissError();
        }
      }
    },
    methods: {
      ...mapMutations({
        showSuccess: 'SHOW_SUCCESS',
        showError: 'SHOW_ERROR',
      }),
      isDelete(roleName) {
        return !this.isBaseRole(roleName);
      },
      clickEditItem(item) {
        this.editedIndex = this.roles.indexOf(item);
        const role = this.getRole(item.id);
        this.editedItem = Object.assign({}, role);
        this.roleSaveDialog = true;
      },
      clickNewItem() {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
        this.roleSaveDialog = true;
      },
      deleteItemFromSelection(item) {
        const index = this.editedItem.userIds.indexOf(item.id);
        if (index >= 0) this.editedItem.userIds.splice(index, 1)
      },
      clickDeleteItem(item) {
        // Check can I delete role
        if (this.isDelete(item.roleName)) {
          this.idItem = item.id;
          this.confirmDialog = true;
        } else {
          this.showError(this.$t('management.errNotPossibleRemoveBaseRoles'));
        }
      },
      clickItem(item) {
        this.selItem = item;
        this.roleUsersDialog = true;
      },
      closeRoleDialog() {
        this.roleSaveDialog = false;
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
              const updatedUserIds = await this.updateUserIds(roleId, this.editedItem.userIds);
              if (isLog) debug('updatedUserIds:', updatedUserIds);
              this.showSuccess(`${this.$t('management.success')}!`);
              setTimeout(() => {
                this.loadingSubmit = false;
                this.closeRoleDialog();
              }, 1000);
            }
          }
        } catch (error) {
          if (isLog) debug('onSubmit.error:', error);
        }
      },
      async save(data) {
        const idFieldUser = this.$store.state.users.idField;
        const userId = this.user[idFieldUser];
        const idField = this.$store.state.roles.idField;
        const {Role} = this.$FeathersVuex;
        try {
          let role;
          if (this.isNewItem) {
            role = new Role({
              name: data.roleName,
              description: data.description
            });
            return await role.save();
          } else {
            // Role has not been changed
            role = Role.getFromStore(data.id);
            if ((data.roleName === role.name) &&
              (data.description === role.description)) {
              return role
            }
            // Change role
            // Error: role name not exist in env
            if (data.roleName !== role.name && !this.isEnvRole(data.roleName)) {
              throw new errors.Conflict(this.$t('management.errRoleNameNotExistInEnv'));
            }
            role = new Role({
              [idField]: data.id,
              name: data.roleName,
              description: data.description
            });
            return await role.save();
          }
        } catch (error) {
          if (isLog) debug('role.save.error:', error);
          this.loadingSubmit = false;
          this.showError(error.message);
          // Recover role data
          if (!this.isNewItem) {
            await Role.get(data.id);
          }
          this.saveLogMessage('ERROR-CLIENT', {error});
        }
      },
      async updateUserIds(roleId, userIds = []) {
        try {

          const _userHandle = async user => {
            const userId = user[idFieldUser];
            const isUserId = userIds.indexOf(userId) >= 0;
            if (isUserId) {
              omitUserIds.push(userId);
            } else {
              // Warning: not possible remove role from oneself
              // Warning: It is not possible to remove a guest role
              if (roleId !== guestId && !this.isYouAuth(userId)) {
                newUser = new User({[idFieldUser]: userId, roleId: guestId});
                saveResponse = await newUser.save();
                updatedUserIds.removed.push(saveResponse);
              }
            }
          }

          const _userHandle2 = async user => {
            const userId = user[idFieldUser];
            if (!this.isYouAuth(userId)) {
              newUser = new User({[idFieldUser]: userId, roleId: roleId});
              saveResponse = await newUser.save();
              updatedUserIds.added.push(saveResponse);
            }
          }

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
          if (!guestId) throw new errors.NotFound(this.$t('management.errGuestRoleNotExist'));
          const role = Role.getFromStore(roleId);
          // Users excluded from the role
          let users = User.findInStore({query: {roleId: roleId}}).data;
          for (let i = 0; i < users.length; i++) {
            const user = users[i];
            await _userHandle(user);
          }
          if (isLog) debug('updateUserIds.removed', updatedUserIds.removed);
          // Users added to the role
          const filterUserIds = userIds.filter(userId => omitUserIds.indexOf(userId) < 0);
          users = User.findInStore({query: {[idFieldUser]: {$in: filterUserIds}}}).data;
          for (let i = 0; i < users.length; i++) {
            const user = users[i];
            await _userHandle2(user);
          }
          if (isLog) debug('updateUserIds.added', updatedUserIds.added);
          return updatedUserIds;
        } catch (error) {
          if (isLog) debug('updateUserIds.error:', error);
          this.showError(error.message);
          this.saveLogMessage('ERROR-CLIENT', {error});
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
          this.saveLogMessage('ERROR-CLIENT', {error});
        }
      },
    }
  }
</script>
