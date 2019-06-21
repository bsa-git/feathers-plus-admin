<template>
  <v-container fluid>
    <app-page-header
      :app-menu="appMenu"
      :home-path="config.homePath"
    ></app-page-header>
    <v-layout align-center justify-center row>
      <div class="text-md-center">
        <h1>Services/GraphQL/Index</h1>
      </div>
    </v-layout>
  </v-container>
</template>

<script>
  import {mapGetters} from 'vuex'
  import appMenu from '~/api/data/app-menu';
  import AppPageHeader from '~/components/layout/AppPageHeader';

  export default {
    components: {
      AppPageHeader
    },
    data() {
      return {
        appMenu: appMenu,
      }
    },
    computed: {
      ...mapGetters({
        config: 'getConfig',
      }),
    },
  }
</script>
