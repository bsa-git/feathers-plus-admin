<template>
  <v-container fluid>
    <input-code-dialog
      :dialog="inputCodeDialog"
      :title-dialog="$t('authManagement.titleVerifySignUp')"
      :label-input="$t('authManagement.verificationCode')"
      :hint-input="$t('authManagement.hintEnterSecurityCode')"
      :validate-type="'numeric'"
      :run-action="verifySignupShort"
      :show-error="showError"
      v-on:onCloseInputDialog="inputCodeDialog = false"
      v-on:onInput="setVerifyCode"
    ></input-code-dialog>
    <confirm-dialog
      :dialog="confirmDialog"
      :title-dialog="$t('profile.titleDialog')"
      :text-dialog="$t('profile.textDialog')"
      :run-action="remove"
      v-on:onCloseDialog="confirmDialog = false"
    ></confirm-dialog>
    <v-form @submit.prevent="onSubmit">
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            :counter="15"
            v-validate="'required|max:20'"
            :error-messages="errors.collect('firstName')"
            data-vv-name="firstName"
            v-model="model.firstName"
            :label="$t('signup.firstName')"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            :counter="20"
            v-validate="'required|max:20'"
            :error-messages="errors.collect('lastName')"
            data-vv-name="lastName"
            v-model="model.lastName"
            :label="$t('signup.lastName')"
          ></v-text-field>
        </v-col>
        <v-col cols="12" :sm="changeIdentity? 6 : 12">
          <v-text-field
            append-icon="mdi-email"
            v-validate="'required|email'"
            :error-messages="errors.collect('email')"
            data-vv-name="email"
            v-model="model.email"
            :label="$t('login.email')"
            :disabled="isExternalAccount? true : !changeIdentity"
            :hint="isExternalAccount? $t('accounts.emailForExternalAccounts') : changeIdentity? $t('profile.hintIdentity') : ''"
            persistent-hint
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" v-if="!isExternalAccount && changeIdentity">
          <v-text-field
            append-icon="mdi-lock"
            v-validate="'required|min:3'"
            :error-messages="errors.collect('password')"
            data-vv-name="password"
            v-model="model.password"
            :label="$t('login.password')"
            type="password"
            :disabled="!changeIdentity"
            :hint="changeIdentity? $t('profile.hintPassword'):''"
            persistent-hint
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" v-if="!isExternalAccount && changePassword">
          <v-text-field
            append-icon="mdi-lock"
            v-validate="'required|min:3'"
            :error-messages="errors.collect('oldPassword')"
            data-vv-name="oldPassword"
            v-model="model.oldPassword"
            :label="$t('profile.oldPassword')"
            type="password"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" v-if="!isExternalAccount && changePassword">
          <v-text-field
            append-icon="mdi-lock"
            v-validate="'required|min:3'"
            :error-messages="errors.collect('newPassword')"
            data-vv-name="newPassword"
            v-model="model.newPassword"
            :label="$t('profile.newPassword')"
            type="password"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" v-if="!isExternalAccount">
          <v-checkbox
            v-model="changeIdentity"
            :label="$t('profile.changeIdentity')"
            :disabled="changePassword"
          ></v-checkbox>
        </v-col>
        <v-col cols="12" sm="6" v-if="!isExternalAccount">
          <v-checkbox
            v-model="changePassword"
            :label="$t('profile.changePassword')"
            :disabled="changeIdentity"
          ></v-checkbox>
        </v-col>
      </v-row>
      <v-card-actions>
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
  import Auth from '~/plugins/auth/auth-client.class';
  import ConfirmDialog from '~/components/dialogs/ConfirmDialog';
  import InputCodeDialog from '~/components/dialogs/InputDialog';
  import createLogMessage from '~/plugins/service-helpers/create-log-message';

  const debug = require('debug')('app:page.user-profile');

  const isLog = false;
  const isDebug = true;

  export default {
    layout: 'user',
    $_veeValidate: {
      validator: 'new'
    },
    components: {
      ConfirmDialog,
      InputCodeDialog
    },
    data() {
      return {
        title: this.$t('profile.title'),
        description: this.$t('profile.description'),
        saveLogMessage: null,
        confirmDialog: false,
        inputCodeDialog: false,
        loadingSubmit: false,
        loadingRemove: false,
        error: undefined,
        changeIdentity: false,
        changePassword: false,
        verifyCode: '',
        model: {
          firstName: '',
          lastName: '',
          email: '',
          avatar: '',
          password: '',
          oldPassword: '',
          newPassword: ''
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
      this.saveLogMessage = createLogMessage(this.$store);
      if (isDebug) debug('created.isExternalAccount:', this.isExternalAccount);
    },
    computed: {
      ...mapGetters({
        config: 'getConfig',
        isExternalAccount: 'isExternalAccount'
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
          if (this.isAnyChange()) {
            this.loadingSubmit = true;
            if (isLog) debug('onSubmit.formData:', this.model);
            const saveResponse = await this.save(this.model);
            if (saveResponse) {
              if (isLog) debug('onSubmit.saveResponse:', saveResponse);
              if (!this.isChangeEmail()) {
                this.showSuccess(`${this.$t('profile.successSaveUser')}!`);
              }
              setTimeout(() => {
                this.loadingSubmit = false;
              }, 1000);
            }
          }
        }
      },
      async save(data) {
        let changeResult = null;
        let userData = null;
        const idFieldUser = this.$store.state.users.idField;
        const {User} = this.$FeathersVuex;
        try {
          if (this.isChangeUser()) {
            if (isDebug) debug('<<userChange>> Start userChange');
            userData = {
              [idFieldUser]: this.user[idFieldUser],
              firstName: data.firstName,
              lastName: data.lastName,
            };
            const user = new User(userData);
            changeResult = await user.save();
            if (isDebug) debug('userChange.OK');
          }
          if (this.isChangePassword()) {
            if (isDebug) debug('<<passwordChange>> Start passwordChange');
            changeResult = await Auth.passwordChange(data.oldPassword, data.newPassword, {email: this.user.email});
            if (isDebug) debug('passwordChange.OK');
          }
          if (this.isChangeEmail()) {
            if (isDebug) debug('<<identityChange>> Start identityChange');
            changeResult = await Auth.identityChange(data.password, {email: data.email}, {email: this.user.email});
            this.showWarning({text: this.$t('authManagement.resendVerification'), timeout: 10000});
            this.inputCodeDialog = true;
            if (isDebug) debug('identityChange.OK');
          }
          return changeResult;
        } catch (error) {
          if (isLog) debug('user.save.error:', error);
          this.loadingSubmit = false;
          this.error = error;
          this.showError(error.message);
          // Recover user data
          await User.get(this.user[idFieldUser]);
          this.saveLogMessage('ERROR-CLIENT', {error});
        }
      },
      async remove() {
        try {
          this.loadingRemove = true;
          const idFieldUser = this.$store.state.users.idField;
          const {User} = this.$FeathersVuex;
          const user = new User({
            [idFieldUser]: this.user[idFieldUser],
            active: false
          });
          await user.save();
          this.showSuccess(`${this.$t('profile.successRemoveUser')}!`);
          await this.logout();
          setTimeout( () => {
            this.$router.push(this.$i18n.path(this.config.homePath));
          }, 1000);
        } catch (error) {
          if (isLog) debug('user.remove.error:', error);
          this.loadingRemove = false;
          this.error = error;
          this.showError(error.message);
          this.saveLogMessage('ERROR-CLIENT', {error});
        }
      },
      isChangeUser() {
        return (this.model.firstName !== this.user.firstName) || (this.model.lastName !== this.user.lastName);
      },
      isChangeEmail() {
        const changeEmail = this.model.email !== this.user.email;
        return this.changeIdentity ? changeEmail : false;
      },
      isChangePassword() {
        return this.changePassword ? !!this.model.oldPassword : false;
      },
      isAnyChange() {
        return this.isChangeUser() || this.isChangeEmail() || this.isChangePassword();
      },
      dismissError() {
        this.error = undefined;
        this.clearError()
      },
      async verifySignupShort() {
        try {
          if (isDebug) debug('<<verifySignUpShort>> Start verifySignUpShort');
          const idFieldUser = this.$store.state.users.idField;
          const {User} = this.$FeathersVuex;
          // Close input dialog
          this.inputCodeDialog = false;
          if (isDebug) debug('verifySignUpShort.verifyCode:', this.verifyCode);
          const token = this.verifyCode;
          const changeUser = await Auth.verifySignupShort(token, {email: this.user.email});
          if (changeUser) {
            if (isLog) debug('verifySignupShort.user:', changeUser);
            if (isDebug) debug('verifySignUpShort.OK');
            this.showSuccess(this.$t('authManagement.successfulUserVerification'));
            // Get new avatar
            const avatar = new this.$Avatar(this.model.email);
            const avatarImage = await avatar.getImage();
            let userData = {
              [idFieldUser]: this.user[idFieldUser],
              avatar: avatarImage
            };
            const user = new User(userData);
            await user.save();
          } else {
            this.showError({text: this.$t('authManagement.errorUserVerification'), timeout: 10000});
//            this.$redirect(this.config.homePath);
          }
        } catch (error) {
          if (isLog) debug('verifySignupShort.error:', error);
          this.error = error;
          if (error.message === 'User not found.') {
            this.showError({text: this.$t('authManagement.msgForErrorUserNotFind'), timeout: 10000});
          } else if (error.message.includes('Invalid token.')) {
            this.showError({text: this.$t('authManagement.msgForErrorInvalidToken'), timeout: 10000});
          } else {
            this.showError({text: error.message, timeout: 10000});
          }
          this.saveLogMessage('ERROR-CLIENT', {error});
        }
      },
      setVerifyCode(val) {
        this.verifyCode = val;
      },
      ...mapMutations('auth', {
        clearError: 'clearAuthenticateError'
      }),
      ...mapMutations({
        showSuccess: 'SHOW_SUCCESS',
        showError: 'SHOW_ERROR',
        showWarning: 'SHOW_WARNING'
      }),
      ...mapActions(['logout'])
    }

  };
</script>

