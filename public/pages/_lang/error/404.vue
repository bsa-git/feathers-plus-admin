<template>
  <div class="error-box text-center mx-auto">
    <h1 :class="`exotic--${theme.name}`">404</h1>
    <h2 :class="`exotic--${theme.name} my-3 headline`">{{ $t('error.sorry_page_not_found') }}.</h2>
    <div>
      <v-btn color="primary" @click="goHome">{{ $t('error.go_home') }}</v-btn>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';

  export default {
    layout: 'stand-alone',
    data() {
      return {
        title: `${this.$t('error.title')}: 404`,
        description: this.$t('error.page_not_found'),
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
        config: 'getConfig',
        theme: 'getTheme',
      })
    },
    methods: {
      goHome () {
        this.$router.push({path: this.$i18n.path(this.config.homePath)});
      }
    }
  };
</script>

