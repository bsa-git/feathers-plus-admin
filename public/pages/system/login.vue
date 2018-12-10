<template>
  <v-layout align-center justify-center>
    <v-flex xs12 sm8 md4 lg4>
      <v-card class="elevation-1 pa-3">
        <v-card-text>
          <div class="layout column align-center">
            <img src="/static/img/m.png" alt="Vue Material Admin" width="120" height="120">
            <h1 class="my-4 primary--text font-weight-light">Material Admin Template</h1>
          </div>
          <v-form>
            <!--<v-form @submit.prevent="onSubmit(model.email, model.password)">-->
            <v-text-field append-icon="person" name="login" label="Email" type="text"
                          v-model="model.email"></v-text-field>
            <v-text-field append-icon="lock" name="password" label="Password" id="password" type="password"
                          v-model="model.password"></v-text-field>
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
          <v-btn block color="primary" @click="login" :loading="loading" :disabled="user? true : false">Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>

  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'

  export default {
    layout: 'auth',
    components: {
//      AppSnackbar
    },
    data: () => ({
      title: 'Login',
      description: 'Enter credentials',
      loading: false,
      error: undefined,
      model: {
        email: 'Sandrine.Torphy@yahoo.com',
        password: 'Sandrine.Torphy'
      },
    }),
    head() {
      return {
        title: this.title,
        meta: [
          {hid: 'description', name: 'description', content: this.description}
        ],
      }
    },
    computed: {
      ...mapGetters('users', {
        user: 'current'
      })
    },
    methods: {
      async login() {
        const self = this;
        const response = await self.onSubmit(self.model.email, self.model.password);
//        console.log('response:', response);
        if(response && response.accessToken){
          this.loading = true;
          setTimeout(() => {
            this.$router.push('/dashboard');
          }, 1000);
        }
      },
      dismissError() {
        this.error = undefined;
        this.clearAuthenticateError()
      },

      async onSubmit(email, password) {
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

