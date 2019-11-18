<template>
  <div class="main-content">
    <input-dialog
      :input-dialog="inputDialog"
      :title-dialog="$t('authManagement.titleVerifySignUp')"
      :label-input="$t('authManagement.verificationCode')"
      :hint-input="$t('authManagement.hintEnterSecurityCode')"
      :validate-type="'numeric'"
      :run-action="verifySignupShort"
      v-on:onCloseInputDialog="closeInputDialog"
      v-on:onInput="setVerifyCode"
    ></input-dialog>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card>
          <v-card-title>
            <!--<v-icon>mdi-account-plus</v-icon>-->
            <span class="headline">{{ $t('user_menu.signup') }}</span>
            <v-spacer></v-spacer>
            <router-link :to="$i18n.path(config.homePath)" class="close-icon">
              <v-icon>mdi-close</v-icon>
            </router-link>
          </v-card-title>
          <v-form @submit.prevent="onSubmit">
            <v-card-text>
              <div class="text-center">
                <v-avatar size="120" v-if="user"><img :src="model.avatar"></v-avatar>
                <v-icon size="120" v-else>mdi-account-plus</v-icon>
              </div>
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
                <v-col cols="12">
                  <v-text-field
                    append-icon="mdi-email"
                    v-validate="'required|email'"
                    :error-messages="errors.collect('email')"
                    data-vv-name="email"
                    v-model="model.email"
                    :label="$t('login.email')"
                    :hint="config.isAuthMng? $t('authManagement.hintSingUpEmail') : ''"
                    persistent-hint
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    append-icon="mdi-lock"
                    v-validate="'required|min:3'"
                    :error-messages="errors.collect('password')"
                    data-vv-name="password"
                    v-model="model.password"
                    :label="$t('login.password')"
                    type="password"
                    ref="confirmation"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    append-icon="mdi-lock"
                    v-validate="'required|confirmed:confirmation'"
                    :error-messages="errors.collect('passwordConfirmation')"
                    data-vv-name="passwordConfirmation"
                    v-model="model.passwordConfirmation"
                    :label="$t('signup.passwordConfirmation')"
                    type="password"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" type="submit" :loading="loadingSubmit" :disabled="!!user">
                {{ $t('signup.title') }}
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
  import Auth from '~/plugins/lib/auth-client.class';
  import InputDialog from '~/components/layout/InputDialog';

  const debug = require('debug')('app:page.user-signup');

  const isLog = true;
  const isDebug = true;

  export default {
    layout: 'user',
    $_veeValidate: {
      validator: 'new'
    },
    components: {
      InputDialog,
    },
    data() {
      return {
        title: this.$t('signup.title'),
        description: this.$t('signup.description'),
        inputDialog: false,
        verifyCode: '',
        loadingSubmit: false,
        loadingLogout: false,
        error: undefined,
        model: {
          firstName: '',
          lastName: '',
          email: '',
          avatar: '',
          password: '',
          passwordConfirmation: ''
        }
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
        if (isDebug) debug('<<onSubmit>> Start onSubmit');
        this.dismissError();
        await this.$validator.validateAll();
        if (this.$validator.errors.any()) {
          this.showError({text: 'Validation Error!', timeout: 10000});
        } else {
          this.loadingSubmit = true;
          const signupResponse = await this.save(this.model);
          if (signupResponse) {
            if (isLog) debug('signupResponse:', signupResponse);
            if (this.config.isAuthMng) {
              this.showWarning({text: `${this.$t('authManagement.signUpVerification')}`, timeout: 10000});
              setTimeout(() => {
                this.loadingSubmit = false;
                this.inputDialog = true;
              }, 1000);
            } else {
              const loginResponse = await this.login(this.model.email, this.model.password);
              if (loginResponse && loginResponse.accessToken) {
                if (isLog) debug('loginResponse:', loginResponse);
                this.showSuccess(`${this.$t('signup.successSignupAndLogin')}!`);
                setTimeout(() => {
                  this.$router.push(this.$i18n.path(this.config.homePath));
                }, 1000);
              }
            }
          }
        }
      },
      async save(data) {
        try {
          if (isDebug) debug('<<save>> Start save');
          const {User} = this.$FeathersVuex;
          if (!data.avatar) {
            const avatar = new this.$Avatar(data.email);
            data.avatar = await avatar.getImage();
          }
          const user = new User({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            avatar: data.avatar,
            password: data.password
          });
          return await user.save();
        } catch (error) {
          if (isLog) debug('user.save.error:', error);
          this.loadingSubmit = false;
          this.error = error;
          this.showError({text: error.message, timeout: 10000});
        }
      },
      async login(email, password) {
        try {
          if (isDebug) debug('<<login>> Start login');
          return await this.authenticate({strategy: 'local', email, password});
        } catch (error) {
          if (isLog) debug('authenticate.error:', error);
          this.loadingSubmit = false;
          this.error = error;
          this.showError({text: error.message, timeout: 10000});
        }
      },
      async verifySignupShort() {
        try {
          if (isDebug) debug('<<verifySignupShort>> Start verifySignupShort');
          this.inputDialog = false;
          if (isDebug) debug('verifySignupShort.verifyCode:', this.verifyCode);
          const token = this.verifyCode;
          const user = await Auth.verifySignupShort(token, {email: this.model.email});
          if (user.isVerified) {
            this.showSuccess(this.$t('authManagement.successfulUserVerification'));
            const loginResponse = await this.login(this.model.email, this.model.password);
            if (loginResponse && loginResponse.accessToken) {
              if (isLog) debug('loginResponse:', loginResponse);
              setTimeout(() => {
                this.showSuccess(`${this.$t('signup.successSignupAndLogin')}!`);
                this.$router.push(this.$i18n.path(this.config.homePath));
              }, 1000);
            }
          } else {
            this.showError({text: this.$t('authManagement.errorUserVerification'), timeout: 10000});
            this.$redirect(this.config.homePath);
          }
        } catch (error) {
          if (isLog) debug('action.error:', error);
          this.error = error;
          if (error.message === 'User not found.') {
            this.showError({text: this.$t('authManagement.msgForErrorUserNotFind'), timeout: 10000});
          } else if (error.message.includes('Invalid token.')) {
            this.showError({text: this.$t('authManagement.msgForErrorInvalidToken'), timeout: 10000});
          } else {
            this.showError({text: error.message, timeout: 10000});
          }
        }
      },
      setVerifyCode(val) {
        this.verifyCode = val;
      },
      closeInputDialog() {
        this.inputDialog = false;
        this.$router.push(this.$i18n.path(this.config.homePath));
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
        this.model.firstName = '';
        this.model.lastName = '';
        this.model.email = '';
        this.model.password = '';
        this.model.passwordConfirmation = '';
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

