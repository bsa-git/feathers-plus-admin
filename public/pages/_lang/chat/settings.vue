<template>
  <div>
    <!--=== Page Header ===-->
    <app-page-header
      :page-title="description"
    ></app-page-header>

  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import AppPageHeader from '~/components/app/layout/AppPageHeader';

  export default {
    // layout: 'chat',
    components: {
      AppPageHeader
    },
    data() {
      return {
        title: this.$t('chat_settings.title'),
        description: this.$t('chat_settings.description'),
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
    computed: {
      ...mapGetters({
        theme: 'getTheme',
        config: 'getConfig'
      }),
    },
    methods: {},
  }
</script>
