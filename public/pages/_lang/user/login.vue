<template>
  <div class="main-content">

    <!--=== Input code dialog ===-->
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

    <!--=== Input email dialog ===-->
    <input-email-dialog
      :dialog="inputEmailDialog"
      :title-dialog="$t('authManagement.titleResetPwd')"
      :label-input="$t('authManagement.yourEmail')"
      :hint-input="$t('authManagement.hintResetPwd')"
      :validate-type="'email'"
      :run-action="sendResetPwd"
      :show-error="showError"
      v-on:onCloseInputDialog="inputEmailDialog = false"
      v-on:onInput="setUserEmail"
    ></input-email-dialog>

    <!--=== Confirm dialog ===-->
    <confirm-dialog
      :dialog="confirmDialog"
      :title-dialog="$t('authManagement.titleDialog')"
      :text-dialog="$t('authManagement.textDialog')"
      :run-action="resendVerifySignup"
      v-on:onCloseDialog="openInputCodeDialog"
    ></confirm-dialog>

    <!--=== Login form ===-->
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card>
          <!-- Form title -->
          <v-card-title>
            <v-icon class="mr-3">mdi-login</v-icon>
            <span class="headline">{{ $t('user_menu.login') }}</span>
            <v-spacer></v-spacer>
            <router-link :to="$i18n.path(config.homePath)" class="close-icon">
              <v-icon>mdi-close</v-icon>
            </router-link>
          </v-card-title>
          <!-- Form content -->
          <v-form @submit.prevent="onSubmit">
            <v-card-text>
              <div class="text-center">
                <v-avatar size="120" v-if="user && model.avatar"><img :src="model.avatar"></v-avatar>
                <v-icon v-else size="120">fas fa-user-slash</v-icon>
              </div>
              <v-text-field
                append-icon="mdi-email"
                v-validate="'required|email'"
                :error-messages="errors.collect('email')"
                data-vv-name="email"
                v-model="model.email"
                :label="$t('login.email')"
                :hint="$t('authManagement.hintLoginEmail')"
                persistent-hint
              ></v-text-field>
              <v-text-field
                append-icon="mdi-lock"
                v-validate="'required|min:3'"
                :error-messages="errors.collect('password')"
                data-vv-name="password"
                v-model="model.password"
                :label="$t('login.password')"
                type="password"
              ></v-text-field>
              <div v-if="!user">
                <v-icon>mdi-security</v-icon>
                <a href="#" @click="openInputEmailDialog">{{ $t('authManagement.forgotYourPassword') }}</a>
              </div>
            </v-card-text>
            <!-- Form actions -->
            <v-card-actions>
              <v-btn href="/auth/google" icon :disabled="!!user">
                <v-icon color="red">fab fa-google fa-lg</v-icon>
              </v-btn>
              <v-btn href="/auth/github" icon :disabled="!!user">
                <v-icon color="light-blue">fab fa-github fa-lg</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn color="primary" type="submit" :loading="loadingSubmit" :disabled="!!user">
                {{ $t('login.title') }}
              </v-btn>
              <v-btn @click="btnClick" :loading="loadingLogout">
                {{ !!user ? $t('login.logout') : $t('login.clear') }}
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>

  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
  import Http from '~/plugins/lib/http.client.class';
  import Auth from '~/plugins/auth/auth-client.class';
  import fakeData from '~~/seeds/fake-data.json'
  import ConfirmDialog from '~/components/dialogs/ConfirmDialog';
  import InputCodeDialog from '~/components/dialogs/InputDialog';
  import InputEmailDialog from '~/components/dialogs/InputDialog';
  import createLogMessage from '~/plugins/service-helpers/create-log-message';

  const debug = require('debug')('app:user.login');
  const isLog = false;
  const isDebug = false;

  export default {
    layout: 'user',
    $_veeValidate: {
      validator: 'new'
    },
    components: {
      ConfirmDialog,
      InputCodeDialog,
      InputEmailDialog
    },
    data() {
      return {
        title: this.$t('login.title'),
        description: this.$t('login.description'),
        saveLogMessage: null,
        loadingSubmit: false,
        loadingLogout: false,
        confirmDialog: false,
        inputCodeDialog: false,
        inputEmailDialog: false,
        verifyCode: '',
        error: undefined,
        model: {
          email: '',
          password: '',
          avatar: ''
        },
      }
    },
    head() {
      return {
        title: this.title,
        meta: [
          {hid: 'description', name: 'description', content: this.description}
        ],
      }
    },
    created: async function () {
      if (this.user) {
        // Login form should be open for non-logged users
        await this.logout();
      }
      this.initModel();
      this.saveLogMessage = createLogMessage(this.$store);
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
      initModel() {
        const isDev = process.env.NODE_ENV === 'development';
        const http = new Http();
        let userEmail = http.getParams('email');
        userEmail = userEmail ? Http.urlDecode(userEmail) : '';
        const fakeUser = fakeData.users[0];
        const fakeEmail = isDev ? fakeUser.email : '';
        const fakePassword = isDev ? fakeUser.email.slice(0, fakeUser.email.indexOf("@")) : '';
        this.model.email = userEmail ? userEmail : fakeEmail;
        this.model.password = userEmail ? '' : fakePassword;
      },
      async onSubmit() {
        if (isDebug) debug('<<onSubmit>> Start onSubmit');
        this.dismissError();
        await this.$validator.validateAll();
        if (this.$validator.errors.any()) {
          this.showError({text: this.$t('form.validationError'), timeout: 10000});
        } else {
          this.loadingSubmit = true;
          const loginResponse = await this.login(this.model.email, this.model.password);
          if (loginResponse && loginResponse.accessToken) {
            if (!this.model.avatar) {
              this.model.avatar = this.user.avatar;
            }
            if (isLog) debug('loginResponse:', loginResponse);
            this.showSuccess(`${this.$t('login.success')}!`);
            setTimeout(() => {
              this.$router.push(this.$i18n.path(this.config.homePath));
            }, 1000);
          }
        }
      },
      async login(email, password) {
        try {
          if (isDebug) debug('<<login>> Start authenticate');
          return await this.authenticate({strategy: 'local', email, password});
        } catch (error) {
          if (isLog) debug('authenticate.error:', error);
          this.loadingSubmit = false;
          this.error = error;
          if (error.message === 'User\'s email is not yet verified.') {
            this.showError({text: this.$t('authManagement.msgForErrorEmailNotYetVerified'), timeout: 10000});
            // Open resendVerifySignup confirm dialog
            this.confirmDialog = true;
          } else if (error.message === '\'user\' record in the database is missing a \'password\''){
            this.showError({text: this.$t('login.errAuthenticatedMissingPassword'), timeout: 10000});
          } else {
            this.showError({text: error.message, timeout: 10000});
          }
          this.saveLogMessage('ERROR-CLIENT', {error});
        }
      },
      async resendVerifySignup() {
        try {
          if (isDebug) debug('<<resendVerifySignUp>> Start ResendVerifySignUp');
          // Close confirm dialog
          this.confirmDialog = false;
          const user = await Auth.resendVerifySignup({email: this.model.email});
          if (user) {
            if (isDebug) debug('ResendVerifySignUp - OK');
            this.showWarning({text: this.$t('authManagement.resendVerification'), timeout: 10000});
            // Open verifySignupShort input dialog
            this.inputCodeDialog = true;
          }
        } catch (error) {
          if (isLog) debug('resendVerifySignup.error:', error);
          this.error = error;
          this.showError({text: error.message, timeout: 10000});
          this.saveLogMessage('ERROR-CLIENT', {error});
        }
      },
      openInputCodeDialog() {
        // Close confirm dialog
        this.confirmDialog = false;
        // Open verifySignupShort input dialog
        this.inputCodeDialog = true;
      },
      async verifySignupShort() {
        try {
          if (isDebug) debug('<<verifySignUpShort>> Start verifySignUpShort');
          // Close input dialog
          this.inputCodeDialog = false;
          if (isDebug) debug('verifySignupShort.verifyCode:', this.verifyCode);
          const token = this.verifyCode;
          const user = await Auth.verifySignupShort(token, {email: this.model.email});
          if (user.isVerified) {
            this.showSuccess(this.$t('authManagement.successfulUserVerification'));
            const loginResponse = await this.login(this.model.email, this.model.password);
            if (loginResponse && loginResponse.accessToken) {
              if (isLog) debug('loginResponse:', loginResponse);
              setTimeout(() => {
                this.showSuccess(`${this.$t('signup.successSignUpAndLogin')}!`);
                this.$router.push(this.$i18n.path(this.config.homePath));
              }, 1000);
            }
          } else {
            this.showError({text: this.$t('authManagement.errorUserVerification'), timeout: 10000});
            this.$redirect(this.config.homePath);
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
      async sendResetPwd() {
        if (isDebug) debug('<<sendResetPwd>> Start sendResetPwd');
        try {
          await Auth.checkUnique({email: this.model.email}, '');
          this.showError({text: this.$t('authManagement.errorUnregisteredEmail'), timeout: 10000});
        } catch (checkUniqueError) {
          if (checkUniqueError.message === 'Values already taken.') {// This is OK!
            try {
              if (isDebug) debug('sendResetPwd.checkUnique: OK');
              // Close input dialog
              this.inputEmailDialog = false;
              const result = await Auth.sendResetPwd({email: this.model.email});
              if (isDebug) debug('sendResetPwd.Auth.sendResetPwd.result:', result);
              // sendResetPwd running...
              setTimeout(() => {
                this.showWarning({text: this.$t('authManagement.sendResetPwdVerification'), timeout: 10000});
                this.$router.push(this.$i18n.path(this.config.homePath));
              }, 1000);
            } catch (error) {
              if (isLog) debug('sendResetPwd.error:', error);
              this.error = error;
              this.showError({text: error.message, timeout: 10000});
              this.saveLogMessage('ERROR-CLIENT', {error});
            }
          } else {// Unexpected error
            if (isLog) debug('sendResetPwd.checkUniqueError:', checkUniqueError);
            this.error = checkUniqueError;
            this.showError({text: checkUniqueError.message, timeout: 10000});
          }
        }
      },
      openInputEmailDialog() {
        this.inputEmailDialog = true;
      },
      setUserEmail(val) {
        this.model.email = val;
      },
      btnClick() {
        if (this.user) {
          this.loadingLogout = true;
          this.showSuccess(`${this.$t('login.successLogout')}!`);
          setTimeout(() => {
            this.logout();
            this.$router.push(this.$i18n.path(this.config.homePath));
          }, 1000);
        } else {
          this.onClear();
        }
      },
      onClear() {
        this.model.password = '';
        this.model.email = '';
        this.$validator.reset();
        this.dismissError();
      },
      dismissError() {
        this.error = undefined;
        this.clearError()
      },
      ...mapMutations('auth', {
        clearError: 'clearAuthenticateError'
      }),
      ...mapMutations({
        showSuccess: 'SHOW_SUCCESS',
        showError: 'SHOW_ERROR',
        showWarning: 'SHOW_WARNING'
      }),
      ...mapActions(['authenticate', 'logout'])
    }

  };
</script>

