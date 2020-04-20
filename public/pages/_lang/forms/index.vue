<template>
  <div>
    <!-- Page Header -->
    <app-page-header
      :page-title="description"
    ></app-page-header>
    <!-- Nodal Menu Item -->
    <nodal-menu-item
      nodalName="forms"
      page-name="forms"
      :app-menu="appMenu"
    ></nodal-menu-item>
  </div>
</template>

<script>
  import AppPageHeader from '~/components/app/layout/AppPageHeader';
  import NodalMenuItem from '~/components/menu/NodalMenuItem';
  import appMenu from '~/api/app/app-menu';

  export default {
    components: {
      AppPageHeader,
      NodalMenuItem
    },
    data() {
      return {
        title: this.$t('app_menu.forms_controls'),
        description: this.$t('app_menu.forms_controls'),
        appMenu
      }
    },
    head() {
      return {
        title: this.title,
        meta: [
          {hid: 'description', name: 'description', content: this.description}
        ],
      }
    },
  }
</script>
