<template>
  <v-layout align-center justify-center row>
    <div class="mr-3 hidden-sm-and-down">
      <img src="/static/img/error/500.svg" alt="">
    </div>
    <div class="error-box text-md-center">
      <h1>500</h1>
      <h2 class="my-3 headline ">{{ $t('error.sorry_server_is_down') }}</h2>
      <div>
        <v-btn color="primary" @click="goHome">{{ $t('error.go_home') }}</v-btn>
      </div>
    </div>
  </v-layout>
</template>

<script>
  export default {
    layout: 'stand-alone',
    data() {
      return {
        title: `${this.$t('error.title')}: 500`,
        description: this.$t('error.server_is_down'),
        homePath: this.$i18n.path(process.env.HOME_PATH)
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
    methods: {
      goHome() {
        this.$router.push({path: this.homePath});
      }
    }
  };
</script>

<style lang="stylus" scoped>
  .error-box h1 {
    font-size: 150px;
    line-height: 150px;
    font-weight: 700;
    color: #252932;
    text-shadow: rgba(61, 61, 61, 0.3) 1px 1px, rgba(61, 61, 61, 0.2) 2px 2px, rgba(61, 61, 61, 0.3) 3px 3px;
  }
</style>

