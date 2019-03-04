<template>
  <v-layout align-center justify-center>
    <v-flex xs12 sm8 md4 lg4>
      <v-card class="elevation-1 pa-3">
        <v-card-text>
          <div class="layout column align-center">
            <v-icon size="120">fas fa-user-plus</v-icon>
            <router-link :to="$i18n.path(config.homePath)">
              <h1 class="my-4 primary--text font-weight-light">Material Admin Template</h1>
            </router-link>
          </div>
          <v-form>
            <v-text-field
              :counter="10"
              v-validate="'required|max:20'"
              :error-messages="errors.collect('first_name')"
              data-vv-name="first_name"
              v-model="model.first_name"
              :label="$t('sign_up.first_name')"
            ></v-text-field>
            <v-text-field
              :counter="10"
              v-validate="'required|max:20'"
              :error-messages="errors.collect('last_name')"
              data-vv-name="last_name"
              v-model="model.last_name"
              :label="$t('sign_up.last_name')"
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
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn block color="primary" @click="onSubmit" :loading="loading" :disabled="!!user">
            {{ $t('sign_up.title') }}
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

  export default {
    layout: 'user',
    $_veeValidate: {
      validator: 'new'
    },
    data() {
      return {
        title: this.$t('sign_up.title'),
        description: this.$t('sign_up.description'),
        loading: false,
        error: undefined,
        model: {
          first_name: 'Thea',
          last_name: 'Ferry',
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
          const response = await this.login(this.model.email, this.model.password);
          if (response && response.accessToken) {
            this.loading = true;
            setTimeout(() => {
              this.$router.push(this.$i18n.path(this.config.homePath));
            }, 1000);
          }
        }
      },
      onClear () {
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

