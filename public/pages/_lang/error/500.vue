<template>
  <div class="d-flex mx-auto">
    <div class="mr-3 hidden-sm-and-down">
      <img src="/static/img/error/500.svg" alt="">
    </div>
    <div class="error-box text-center">
      <h1 :class="`exotic--${theme.name}`">500</h1>
      <h2 :class="`exotic--${theme.name} my-3 headline`">{{ $t('error.sorry_server_is_down') }}.</h2>
      <div>
        <v-btn color="primary" @click="goHome">{{ $t('error.go_home') }}</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';

  export default {
    layout: 'stand-alone',
    data() {
      return {
        title: `${this.$t('error.title')}: 500`,
        description: this.$t('error.server_is_down'),
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
      goHome() {
        this.$router.push({path: this.$i18n.path(this.config.homePath)});
      }
    }
  };
</script>
