<template>
  <v-layout align-center justify-center>
    <v-flex xs12 sm8 md4 lg4>
      <v-card class="elevation-1 pa-3">
        <v-card-text>
          <div class="layout column align-center">
            <img src="/static/img/m.png" alt="Vue Material Admin" width="120" height="120">
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
          <v-btn icon :disabled="user? true : false">
            <v-icon color="blue">fab fa-facebook-square fa-lg</v-icon>
          </v-btn>
          <v-btn icon :disabled="user? true : false">
            <v-icon color="red">fab fa-google fa-lg</v-icon>
          </v-btn>
          <v-btn icon :disabled="user? true : false">
            <v-icon color="light-blue">fab fa-twitter fa-lg</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn block color="primary" @click="submit" :loading="loading" :disabled="user? true : false">
            {{ $t('login.title') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>

  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'

  export default {
    layout: 'auth',
    $_veeValidate: {
      validator: 'new'
    },
    data: function () {
      return {
        title: this.$t('login.title'),
        description: this.$t('login.description'),
        loading: false,
        error: undefined,
        model: {
          email: 'Sandrine.Torphy@yahoo.com',
          password: 'Sandrine.Torphy'
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
    mounted() {
//      this.$validator.localize('en', this.dictionary)
//      console.log('$i18n:', this.$t('login.title'));// this.$t('login.title')
    },
    computed: {
      ...mapGetters('users', {
        user: 'current'
      }),
      ...mapGetters({
        config: 'getConfig',
      })
    },
    methods: {
      async submit() {
        const self = this;
        await this.$validator.validateAll();
        if (this.$validator.errors.any()) {
          this.showError('Validation Error!');
        } else {
          const response = await self.login(self.model.email, self.model.password);
          if (response && response.accessToken) {
            this.loading = true;
            setTimeout(() => {
              self.$router.push('/dashboard');
            }, 1000);
          }
        }
      },
      dismissError() {
        this.error = undefined;
        this.clearAuthenticateError()
      },

      async login(email, password) {
        try {
          const response = await this.authenticate({strategy: 'local', email, password});
          this.showSuccess('Success Login!');
          return response
        } catch (error) {
          // Convert the error to a plain object and add a message.
          let type = error.className;
          error = Object.assign({}, error);
          error.message = (type === 'not-authenticated')
            ? 'Incorrect email or password.'
            : 'An error prevented login.';
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

