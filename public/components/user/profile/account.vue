<template>
  <v-container fluid>
    <confirm-dialog
      :confirm-dialog="confirmDialog"
      :title-dialog="$t('profile.titleDialog')"
      :text-dialog="$t('profile.textDialog')"
      :run-action="remove"
      v-on:onCloseDialog="confirmDialog = false"
    ></confirm-dialog>
    <v-form @submit.prevent="onSubmit">
      <v-container grid-list-md>
        <v-layout wrap>
          <v-flex xs12 sm6>
            <v-text-field
              :counter="15"
              v-validate="'required|max:20'"
              :error-messages="errors.collect('firstName')"
              data-vv-name="firstName"
              v-model="model.firstName"
              :label="$t('signup.firstName')"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm6>
            <v-text-field
              :counter="20"
              v-validate="'required|max:20'"
              :error-messages="errors.collect('lastName')"
              data-vv-name="lastName"
              v-model="model.lastName"
              :label="$t('signup.lastName')"
            ></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-text-field
              append-icon="email"
              v-validate="'required|email'"
              :error-messages="errors.collect('email')"
              data-vv-name="email"
              v-model="model.email"
              :label="$t('login.email')"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm6 v-if="changePassword">
            <v-text-field
              append-icon="lock"
              v-validate="'required|min:3'"
              :error-messages="errors.collect('password')"
              data-vv-name="password"
              v-model="model.password"
              :label="$t('login.password')"
              type="password"
              ref="confirmation"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm6 v-if="changePassword">
            <v-text-field
              append-icon="lock"
              v-validate="'required|confirmed:confirmation'"
              :error-messages="errors.collect('passwordConfirmation')"
              data-vv-name="passwordConfirmation"
              v-model="model.passwordConfirmation"
              :label="$t('signup.passwordConfirmation')"
              type="password"
            ></v-text-field>
          </v-flex>
        </v-layout>
      </v-container>
      <v-card-actions>
        <v-checkbox
          v-model="changePassword"
          :label="$t('profile.changePassword')"
        ></v-checkbox>
        <v-spacer></v-spacer>
        <v-btn color="primary" type="submit" :loading="loadingSubmit">
          {{ $t('profile.save') }}
        </v-btn>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" @click="confirmDialog = true" :loading="loadingRemove" color="error" class="ml-3">
              {{ $t('profile.remove') }}
            </v-btn>
          </template>
          <span>{{ $t('profile.removeAccount') }}</span>
        </v-tooltip>
      </v-card-actions>
    </v-form>
  </v-container>
</template>

<script>

  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
  import ConfirmDialog from '~/components/layout/ConfirmDialog';

  const debug = require('debug')('app:page.user-profile');

  const isLog = false;

  export default {
    layout: 'user',
    $_veeValidate: {
      validator: 'new'
    },
    components: {
      ConfirmDialog,
    },
    data() {
      return {
        title: this.$t('profile.title'),
        description: this.$t('profile.description'),
        confirmDialog: false,
        loadingSubmit: false,
        loadingRemove: false,
        error: undefined,
        changePassword: false,
        model: {
          firstName: '',
          lastName: '',
          email: '',
          avatar: '',
          password: '',
          passwordConfirmation: ''
        },
      }
    },
    created: function () {
      if (this.user) {
        this.model.avatar = this.user.avatar;
        this.model.firstName = this.user.firstName;
        this.model.lastName = this.user.lastName;
        this.model.email = this.user.email;
      }
    },
    computed: {
      ...mapGetters({
        config: 'getConfig',
      }),
      ...mapState('auth', [
        'user'
      ]),
    },
    methods: {
      async onSubmit() {
        this.dismissError();
        await this.$validator.validateAll();
        if (this.$validator.errors.any()) {
          this.showError('Validation Error!');
        } else {
          this.loadingSubmit = true;
          if (isLog) debug('onSubmit.formData:', this.model);
          const profileResponse = await this.save(this.model);
          if (profileResponse) {
            if (isLog) debug('onSubmit.profileResponse:', profileResponse);
            this.showSuccess(`${this.$t('profile.successSaveUser')}!`);
            setTimeout(() => {
              this.loadingSubmit = false;
//              this.$router.push(this.$i18n.path(this.config.homePath));
            }, 1000);
          }
        }
      },
      isChangeEmail() {
        return (this.model.email !== this.user.email);
      },
      isChangePassword() {
        return !!this.model.password;
      },
      dismissError() {
        this.error = undefined;
        this.clearError()
      },

      async save(data) {
        try {
          const idFieldUser = this.$store.state.users.idField;
          const {User} = this.$FeathersVuex;
          let userData = {
            [idFieldUser]: this.user[idFieldUser],
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
          };
          if (this.isChangeEmail()) {
            const avatar = new this.$Avatar(data.email);
            userData.avatar = await avatar.getImage();
          }
          if (this.isChangePassword()) {
            userData.password = data.password;
          }
          const user = new User(userData);
          return await user.save();
        } catch (error) {
          if (isLog) debug('user.save.error:', error);
          this.loadingSubmit = false;
          this.error = error;
          this.showError(error.message);
        }
      },

      async remove() {
        try {
          this.loadingRemove = true;
          const idFieldUser = this.$store.state.users.idField;
          const {User} = this.$FeathersVuex;
          const user = new User({
            [idFieldUser]: this.user[idFieldUser],
          });
          await user.remove();
          this.showSuccess(`${this.$t('profile.successRemoveUser')}!`);
          setTimeout(() => {
            this.logout();
            this.$router.push(this.$i18n.path(this.config.homePath));
          }, 1000);
        } catch (error) {
          if (isLog) debug('user.remove.error:', error);
          this.loadingRemove = false;
          this.error = error;
          this.showError(error.message);
        }
      },

      ...mapMutations('auth', {
        clearError: 'clearAuthenticateError'
      }),
      ...mapMutations({
        showSuccess: 'SHOW_SUCCESS',
        showError: 'SHOW_ERROR',
      }),
      ...mapActions(['logout'])
    }

  };
</script>

