<template>
  <v-app id="stand-alone">
    <v-main>
      <v-container fluid fill-height>
        <nuxt></nuxt>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  import {mapGetters} from 'vuex';
  import syncStore from '~/plugins/lib/sync-store';

  export default {
    mounted: function () {
      this.$nextTick(function () {
        syncStore.initVuetify(this);
      })
    },
  }
</script>
