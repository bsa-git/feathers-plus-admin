<template>
  <v-app id="login" class="primary">
    <v-content>
      <v-container fluid fill-height>
        <nuxt></nuxt>
      </v-container>
      <!-- Snackbar -->
      <app-snack-bar
        :show="snackBar.show"
        :text="snackBar.text"
        :color="snackBar.color"
        v-on:onShow="modelSnackBar"
      ></app-snack-bar>
    </v-content>
  </v-app>
</template>

<script>
  import {mapGetters, mapMutations, mapActions} from 'vuex';
  import AppSnackBar from '~/components/layout/AppSnackbar';
  import HttpBox from '~/plugins/lib/http.client.class';

  export default {
    components: {
      AppSnackBar
    },
    data: function () {
      return {
      }
    },
    created() {
      if(HttpBox.isAccessToken()){
        this.authenticate().catch(error => {
          if (error.message.includes('Could not find stored JWT')) {
            HttpBox.removeAccessToken();
          }else {
            console.error(error);
            this.showError(error.message);
          }
        })
      }
    },
    computed: {
      ...mapGetters({
        snackBar: 'getSnackBar',
      })
    },
    methods: {
      modelSnackBar: function (newValue) {
        this.$store.commit('SET_SNACKBAR', { show: newValue });
      },
      ...mapMutations({
        showError: 'SHOW_ERROR',
      }),
      ...mapActions('auth', ['authenticate'])
    },
  }
</script>

<style scoped lang="css">
  #login {
    height: 50%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    z-index: 0;
  }
</style>
