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
  import syncStore from '~/plugins/lib/sync-store';

  export default {
    created() {
      syncStore.initVuetify(this);
    }
  }
</script>
