<template>
  <div>
    <app-page-header
      :app-menu="appMenu"
      :home-path="homePath"
    ></app-page-header>
    <v-layout align-center justify-center row>
      <div class="text-md-center">
        <h1>Error/Index</h1>
      </div>
    </v-layout>
  </div>
</template>

<script>
  import appMenu from '~/api/data/app-menu';
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
