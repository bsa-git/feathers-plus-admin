<template>
  <v-layout align-center justify-center>
    <v-flex xs12 sm8 md4 lg4>
      <v-card class="elevation-1 pa-3">
        <v-form @submit.prevent="onSubmit">
          <v-card-text>
            <div class="layout column align-center">
              <v-icon size="120">fas fa-user-plus</v-icon>
              <router-link :to="$i18n.path(config.homePath)">
                <h1 class="my-4 primary--text font-weight-light">Material Admin Template</h1>
              </router-link>
            </div>
            <v-text-field
              :counter="10"
              v-validate="'required|max:20'"
              :error-messages="errors.collect('firstName')"
              data-vv-name="firstName"
              v-model="model.firstName"
              :label="$t('signup.firstName')"
            ></v-text-field>
            <v-text-field
              :counter="20"
              v-validate="'required|max:20'"
              :error-messages="errors.collect('lastName')"
              data-vv-name="lastName"
              v-model="model.lastName"
              :label="$t('signup.lastName')"
            ></v-text-field>
            <v-text-field
              append-icon="email"
              v-validate="'required|email'"
              :error-messages="errors.collect('email')"
              data-vv-name="email"
              v-model="model.email"
              :label="$t('login.email')"
            ></v-text-field>
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
            <v-text-field
              append-icon="lock"
              v-validate="'confirmed:confirmation'"
              :error-messages="errors.collect('passwordConfirmation')"
              data-vv-name="passwordConfirmation"
              v-model="model.passwordConfirmation"
              :label="$t('signup.passwordConfirmation')"
              type="password"

            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn block color="primary" type="submit" :loading="loadingSubmit" :disabled="!!user">
              {{ $t('signup.title') }}
            </v-btn>
            <v-btn block @click="btnClick" :loading="loadingLogout">
              {{ !!user ? $t('login.logout') : $t('login.clear') }}
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'

  const debug = require('debug')('app:user.signup');

  const isLog = true;

  export default {
    layout: 'user',
    $_veeValidate: {
      validator: 'new'
    },
    data() {
      return {
        title: this.$t('signup.title'),
        description: this.$t('signup.description'),
        loadingSubmit: false,
        loadingLogout: false,
        error: undefined,
        model: {
          firstName: '',
          lastName: '',
          email: '',
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
      if(this.user){
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
          if (isLog) debug('formData:', this.model);
          const signupResponse = await this.save(this.model);
          if (signupResponse) {
            if (isLog) debug('signupResponse:', signupResponse);
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
      },
      btnClick() {
        if (this.user) {
          this.logout();
          this.loadingLogout = true;
          this.showSuccess(`${this.$t('login.successLogout')}!`);
          setTimeout(() => {
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

      async save(data) {
        try {
          const {User} = this.$FeathersVuex;
          const user = new User({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password
          });
          return await user.save();
        } catch (error) {
          this.loadingSubmit = false;
          let type = error.className;
          error = Object.assign({}, error);
          error.message = (type === 'conflict')
            ? `${this.$t('signup.conflictEmail')}.`
            : `${this.$t('signup.errSignup')}.`;
          this.error = error;
          console.error('error.type:', type, '; error.message:', error.message);
          this.showError(error.message);
        }
      },
      async login(email, password) {
        try {
          return await this.authenticate({strategy: 'local', email, password});
        } catch (error) {
          this.loadingSubmit = false;
          // Convert the error to a plain object and add a message.
          let type = error.className;
          error = Object.assign({}, error);
          error.message = (type === 'not-authenticated')
            ? `${this.$t('login.notAuthenticated')}`
            : `${this.$t('login.errAuthenticated')}`;
          this.error = error;
          this.showError(error.message);
          console.error('error.className:', type, '; error.message:', error.message);
        }
      },
      ...mapMutations('auth', {
        clearError: 'clearAuthenticateError'
      }),
      ...mapMutations({
        showSuccess: 'SHOW_SUCCESS',
        showError: 'SHOW_ERROR',
      }),
      ...mapActions(['authenticate', 'logout'])
    }

  };
</script>

