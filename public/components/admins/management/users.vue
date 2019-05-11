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
    <!-- Save Dialog -->
    <v-toolbar flat color="white">
      <v-toolbar-title>{{ $t('management.user_management') }}</v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
      <v-spacer></v-spacer>

      <v-dialog v-model="dialog" max-width="600">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark class="mb-2" v-on="on">{{ $t('management.new_item') }}</v-btn>
        </template>
        <v-card class="elevation-1 pa-3">
          <v-form @submit.prevent="onSubmit">
            <v-card-text>
              <div class="layout column align-center">
                <v-icon size="120" v-if="isNewItem">fas fa-user-plus</v-icon>
                <v-icon size="120" v-else>fas fa-user</v-icon>
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
                    <v-select
                      append-icon="security"
                      v-model="editedItem.roleId"
                      v-validate=""
                      item-text="name"
                      item-value="id"
                      :items="roles"
                      :error-messages="errors.collect('roleId')"
                      label="Select Role"
                      data-vv-name="roleId"
                    ></v-select>
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
                      label="Select Teams"
                      data-vv-name="teamIds"
                      multiple
                    ></v-select>
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
      class="elevation-1"
    >
      <template v-slot:items="props">
        <td>{{ props.item.id }}</td>
        <td>{{ props.item.firstName }}</td>
        <td>{{ props.item.lastName }}</td>
        <td>{{ props.item.email }}</td>
        <td>{{ props.item.roleName }}</td>
        <td>
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-icon v-on="on" v-if="props.item.userTeams === '[]'">code</v-icon>
              <v-icon v-on="on" v-else>settings_ethernet</v-icon>
            </template>
            <span>{{ props.item.userTeams === '[]' ? '[ ]' : props.item.userTeams}}</span>
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
        <v-btn color="primary" @click="initialize">{{ $t('management.reset') }}</v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex'

  const debug = require('debug')('app:comp.admins-management-users');

  const isLog = true;
  const isDebug = true;

  export default {
    $_veeValidate: {
      validator: 'new'
    },
    data: () => ({
      dialog: false,
      confirmDialog: false,
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
          text: 'First Name',
          align: 'left',
          value: 'firstName'
        },
        {
          text: 'Last Name',
          align: 'left',
          value: 'lastName'
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
          text: 'User Teams',
          align: 'left',
          value: 'userTeams',
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
      editedItem: {
        firstName: '',
        lastName: '',
        email: '',
        roleId: '',
        teamIds: [],
        userTeams: '',
        password: '',
        passwordConfirmation: ''
      },
      defaultItem: {
        firstName: '',
        lastName: '',
        email: '',
        roleId: '',
        teamIds: [],
        userTeams: '',
        password: '',
        passwordConfirmation: ''
      }
    }),

    computed: {
      formTitle() {
        return this.editedIndex === -1 ? this.$t('management.new_item') : this.$t('management.edit_item')
      },
      isNewItem() {
        return this.editedIndex === -1
      },
      ...mapGetters({
        user: 'getUser',
        getTeamsForUser: 'teams/getTeamsForUser',
        getRoleForUser: 'roles/getRoleForUser',
      }),
      users() {
        const data = [];
        const idFieldUser = this.$store.state.users.idField;
        const idFieldTeam = this.$store.state.teams.idField;
        const {User} = this.$FeathersVuex;
        const users = User.findInStore({query: {$sort: {lastName: 1}}}).data;
        users.forEach(user => {
          // Find teams for user
          const teams = this.getTeamsForUser(user[idFieldUser]);
          const userRole = user.roleId ? this.getRoleForUser(user.roleId) : null;

          // Get user
          let item = {
            id: `${user[idFieldUser]}`,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            roleId: user.roleId ? user.roleId : '',
            roleName: userRole ? userRole.name : '',
            teamIds: teams.map(team => team[idFieldTeam]),
            userTeams: JSON.stringify(teams.map(team => team.name)),
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
          // Get role
          let item = {
            id: `${role[idFieldRole]}`,
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
          // Get role
          let item = {
            id: `${team[idFieldTeam]}`,
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

      initialize() {
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
              if (isLog) debug('saveResponse:', saveResponse);
              const idFieldUser = this.$store.state.users.idField;
              const updatedTeams = await this.updateMemberIds(saveResponse[idFieldUser], this.editedItem.teamIds);
              if (isLog && updatedTeams.length) debug('updatedTeams:', updatedTeams);
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
            user = new User({
              firstName: data.firstName,
              lastName: data.lastName,
              email: data.email,
              roleId: data.roleId,
              password: data.password
            });
          } else {
            user = new User({
              [idField]: data.id,
              firstName: data.firstName,
              lastName: data.lastName,
              email: data.email,
              roleId: data.roleId
            });
          }
          return await user.save();
        } catch (error) {
          if (isLog) debug('user.save.error:', error);
          this.loadingSubmit = false;
          let type = error.className ? error.className : 'error';
          error = Object.assign({}, error);
          error.message = (type === 'conflict')
            ? `${this.$t('signup.conflictEmail')}.`
            : `${this.$t('management.errSave')}.`;
          this.error = error;
          this.showError(error.message);
        }
      },

      async updateMemberIds(userId, teamIds = []) {
        try {
          if(isDebug)debug('updateMemberIds.userId:', userId, 'updateMemberIds.teamIds:', teamIds);
          let newTeam = null;
          const updatedTeams = [];
          const idFieldTeam = this.$store.state.teams.idField;
          const {Team} = this.$FeathersVuex;
          const teams = Team.findInStore({query: {$sort: {name: 1}}}).data;
          teams.forEach(async team => {
            const id = team[idFieldTeam];
            const isTeamId = teamIds.indexOf(id) !== -1;
            const indexUserId = team.memberIds.indexOf(userId);
            const isUserId = indexUserId !== -1;
            // Add userId to this team
            if (isTeamId && !isUserId) {
              team.memberIds.push(userId);
              newTeam = new Team({
                [idFieldTeam]: id,
                memberIds: team.memberIds,
              });
              const saveResponse = await newTeam.save();
              updatedTeams.push(saveResponse);
            }
            // Remove userId from this team
            if (isUserId && !isTeamId) {
              team.memberIds.splice(indexUserId, 1);
              newTeam = new Team({
                [idFieldTeam]: id,
                memberIds: team.memberIds,
              });
              const saveResponse = await newTeam.save();
              updatedTeams.push(saveResponse);
            }
          });
          return updatedTeams;
        } catch (error) {
          if (isLog) debug('team.save.error:', error);
          let type = error.className;
          error = Object.assign({}, error);
          error.message = (type === 'forbidden')
            ? `${this.$t('management.errForbidden')}.`
            : `${this.$t('management.errSave')}.`;
          this.error = error;
          this.showError(error.message);
        }
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

      async deleteItem() {
        try {
          this.confirmDialog = false;
          const idField = this.$store.state.users.idField;
          // You can not delete yourself
          if (this.idItem === this.user[idField]) {
            this.showError(this.$t('management.errDeleteYourself'));
          } else {
            const {User} = this.$FeathersVuex;
            const user = new User({[idField]: this.idItem});
            await user.remove();
            this.showSuccess(`${this.$t('management.success')}!`);
            this.idItem = null;
          }
        } catch (error) {
          if (isLog) debug('user.remove.error:', error);
          let type = error.className ? error.className : 'error';
          error = Object.assign({}, error);
          error.message = (type === 'forbidden')
            ? `${this.$t('management.errForbidden')}.`
            : `${this.$t('management.errDelete')}.`;
          this.error = error;
          this.showError(error.message);
        }
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
      ...mapMutations({
        showSuccess: 'SHOW_SUCCESS',
        showError: 'SHOW_ERROR',
      }),
    }
  }
</script>
