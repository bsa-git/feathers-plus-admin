<template>
  <v-container fluid>
    <app-page-header
      :app-menu="appMenu"
      :home-path="homePath"
    ></app-page-header>
    <v-layout align-center justify-center row>
      <div class="text-md-center">
        <h1><h1>System/Index</h1></h1>
      </div>
    </v-layout>
  </v-container>
</template>

<script>
  import appMenu from '~/store/data/app-menu';
  import AppPageHeader from '~/components/layout/AppPageHeader';

  export default {
    components: {
      AppPageHeader
    },
    data() {
      return {
        appMenu: appMenu,
        homePath: process.env.HOME_PATH,
      }
    },
  }
</script>
