<template>
  <v-layout align-center justify-center row>
    <div class="mr-3 hidden-sm-and-down">
      <img src="/static/img/error/403.svg" alt="">
    </div>
    <div class="error-box text-md-center">
      <h1>403</h1>
      <h2 class="my-3 headline ">Sorry, access denied.</h2>
      <div>
        <v-btn color="primary" @click="goHome">Go Home</v-btn>
      </div>
    </div>
  </v-layout>
</template>

<script>
  export default {
    layout: 'stand-alone',
    data: () => ({
      title: 'Error: 403',
      description: 'Access denied',
    }),
    head() {
      return {
        title: this.title,
        meta: [
          {hid: 'description', name: 'description', content: this.description}
        ],
        link: []
      }
    },
    methods: {
      goHome() {
        this.$router.push({path: process.env.HOME_PATH});
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

