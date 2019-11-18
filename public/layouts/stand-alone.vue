<template>
  <v-app id="stand-alone">
    <v-content>
      <v-container fluid fill-height>
        <nuxt></nuxt>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import {mapGetters} from 'vuex';

  export default {
    created() {
      this.$util.initVuetify(this, this.theme);
    },
    computed: {
      ...mapGetters({
        theme: 'getTheme',
      })
    },
  }
</script>
