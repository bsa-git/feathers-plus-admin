<template>
  <div>
    <!--=== Page Header ===-->
    <app-page-header
      :page-title="description"
    ></app-page-header>
    <!--=== Gradients ===-->
    <div class="title">Gradients</div>
    <div class="subtitle-1">The <kbd>gradient</kbd> prop can be used to apply a simple gradient overlay to the image. More complex
      gradients should be written as a class on the content slot instead.</div>

  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import AppPageHeader from '~/components/app/layout/AppPageHeader';

  export default {
    components: {
      AppPageHeader,
    },
    data() {
      return {
        title: this.$t('timePicker.title'),
        description: this.$t('timePicker.description'),
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
      }),
    },
  }
</script>
