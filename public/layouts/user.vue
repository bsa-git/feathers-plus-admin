<template>
  <v-app id="user-pages" :style="`background-color: ${primaryColor}`">
    <!-- Main Content -->
    <v-content>
      <v-container fluid fill-height>
        <nuxt></nuxt>
      </v-container>
    </v-content>
    <!-- Snackbar -->
    <app-snack-bar
      :show="snackBar.show"
      :text="snackBar.text"
      :color="snackBar.color"
      :timeout="snackBar.timeout"
      v-on:onShow="modelSnackBar"
    ></app-snack-bar>
    <!-- Bottom navigation  -->
    <v-bottom-navigation
      id="bottom-navigation"
      height="50%"
      absolute
    ></v-bottom-navigation>
  </v-app>
</template>

<script>
  import {mapGetters} from 'vuex';
  import syncStore from '~/plugins/lib/sync-store';
  import AppSnackBar from '~/components/layout/Snackbar';

  export default {
    components: {
      AppSnackBar
    },
    data: function () {
      return {
        primaryColor: '',
      }
    },
    created() {
      this.primaryColor = this.$colors[this.theme.primary].base;
      syncStore.initVuetify(this);
    },
    computed: {
      ...mapGetters({
        snackBar: 'getSnackBar',
        theme: 'getTheme',
      }),
    },
    methods: {
      modelSnackBar: function (newValue) {
        this.$store.commit('SET_SNACK_BAR', {show: newValue});
      },
    },
  }
</script>

<style scoped lang="sass">

  @import '~vuetify/src/styles/styles.sass'

  #user-pages
    height: 50%
    width: 100%
    position: absolute
    top: 0
    left: 0
    content: ""
    z-index: 0

  #bottom-navigation
    z-index: 0

  main
    z-index: 1

  .theme--dark.v-bottom-navigation
    background-color: map-get($material-dark, 'background')

  .theme--light.v-bottom-navigation
    background-color: map-get($material-light, 'background')

</style>
