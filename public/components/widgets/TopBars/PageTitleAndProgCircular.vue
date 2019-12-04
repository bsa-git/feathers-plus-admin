<template>
  <div class="text-center">
    <app-page-title v-if="pageTitle" :page-title="pageTitle"></app-page-title>
    <v-progress-circular
      class="mt-5"
      :size="size"
      :color="color"
      indeterminate
    ></v-progress-circular>
  </div>
</template>

<script>
  import AppPageTitle from '~/components/layout/PageTitle';

  export default {
    components: {
      AppPageTitle
    },
    props: {
      pageTitle: String,
      size: {
        type: Number,
        default: 80
      },
      color: {
        type: String,
        default: 'primary'
      }
    },
  };
</script>
