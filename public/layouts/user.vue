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

  export default {
    components: {
      AppSnackBar
    },
    data: function () {
      return {}
    },
    async created() {
      await this.checkAuth();
    },
    computed: {
      ...mapGetters({
        snackBar: 'getSnackBar',
      })
    },
    methods: {
      modelSnackBar: function (newValue) {
        this.$store.commit('SET_SNACK_BAR', { show: newValue });
      },
      ...mapActions(['checkAuth'])
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
