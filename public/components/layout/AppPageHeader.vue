<template>
  <div>
    <!-- Breadcrumbs -->
    <app-breadcrumbs
      :app-menu="appMenu"
      :home-path="config.homePath"
    ></app-breadcrumbs>
    <!-- Page Title -->
    <app-page-title v-if="pageTitle" :page-title="pageTitle"></app-page-title>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import appMenu from '~/api/data/app-menu';
  import AppBreadcrumbs from '~/components/layout/AppBreadcrumbs';
  import AppPageTitle from '~/components/layout/AppPageTitle';

  export default {
    components: {
      AppBreadcrumbs,
      AppPageTitle
    },
    props: {
      pageTitle: String
    },
    data() {
      return {
        appMenu
      };
    },
    computed: {
      ...mapGetters({
        config: 'getConfig',
      }),
    }
  };
</script>
