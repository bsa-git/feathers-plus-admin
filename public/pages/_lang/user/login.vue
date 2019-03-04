<template>
  <v-layout align-center justify-center>
    <v-flex xs12 sm8 md4 lg4>
      <v-card class="elevation-1 pa-3">
        <v-card-text>
          <div class="layout column align-center">
            <v-icon v-if="user" size="120">fas fa-user-check</v-icon>
            <v-icon v-else size="120">fas fa-user-alt-slash</v-icon>
            <router-link :to="$i18n.path(config.homePath)">
              <h1 class="my-4 primary--text font-weight-light">Material Admin Template</h1>
            </router-link>
          </div>
          <v-form>
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
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn href="/auth/google" icon :disabled="!!user">
            <v-icon color="red">fab fa-google fa-lg</v-icon>
          </v-btn>
          <v-btn href="/auth/github" icon :disabled="!!user">
            <v-icon color="light-blue">fab fa-github fa-lg</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn block color="primary" @click="onSubmit" :loading="loading" :disabled="!!user">
            {{ $t('login.title') }}
          </v-btn>
          <v-btn block @click="onClear">
            {{ $t('login.clear') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>

  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
  import fakeData from '~~/seeds/fake-data.json'

  const fakeUser = fakeData.users[0];
  const isDev = process.env.NODE_ENV === 'development';
  const _email = isDev ? fakeUser.email : '';
  const _password = isDev ? fakeUser.email.slice(0, fakeUser.email.indexOf("@")) : '';

  export default {
    layout: 'user',
    $_veeValidate: {
      validator: 'new'
    },
    data() {
      return {
        title: this.$t('login.title'),
        description: this.$t('login.description'),
        loading: false,
        error: undefined,
        model: {
          email: _email,
          password: _password
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
          this.showError(`${this.$t('form.validation_error')}!`);
        } else {
          const response = await this.login(this.model.email, this.model.password);
          if (response && response.accessToken) {
            this.loading = true;
            setTimeout(() => {
              this.$router.push(this.$i18n.path(this.config.homePath));
            }, 1000);
          }
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

      async login(email, password) {
        try {
          const response = await this.authenticate({strategy: 'local', email, password});
          this.showSuccess(`${this.$t('login.success_login')}!`);
          return response
        } catch (error) {
          // Convert the error to a plain object and add a message.
          let type = error.className;
          error = Object.assign({}, error);
          error.message = (type === 'not-authenticated')
            ? `${this.$t('login.not_authenticated')}.`
            : `${this.$t('login.err_authenticated')}.`;
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
      ...mapActions('auth', ['authenticate'])
    }

  };
</script>

