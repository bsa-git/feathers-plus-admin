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
            <v-text-field append-icon="person" name="login" label="Login" type="text"
                          v-model="model.username"></v-text-field>
            <v-text-field append-icon="lock" name="password" label="Password" id="password" type="password"
                          v-model="model.password"></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn icon>
            <v-icon color="blue">fab fa-facebook-square fa-lg</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon color="red">fab fa-google fa-lg</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon color="light-blue">fab fa-twitter fa-lg</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn block color="primary" @click="login" :loading="loading">Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    layout: 'login',
    data: () => ({
      title: 'Login',
      description: 'Enter credentials',
      loading: false,
      model: {
        username: 'admin@isockde.com',
        password: 'password'
      }
    }),
    head() {
      return {
        title: this.title,
        meta: [
          {hid: 'description', name: 'description', content: this.description}
        ],
        link: []
      }
    },
    methods: {
      login() {
        this.loading = true;
        setTimeout(() => {
          this.$router.push('/dashboard');
        }, 1000);
      }
    }

  };
</script>

