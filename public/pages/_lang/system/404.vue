<template>
  <v-layout id="error" align-center justify-center row>
    <div class="error-box text-md-center">
      <h1>404</h1>
      <h2 class="my-3 headline ">Sorry, page not found</h2>
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
      title: 'Error: 404',
      description: 'Page not found',
    }),
    head() {
      return {
        title: this.title,
        meta: [
          {hid: 'description', name: 'description', content: this.description}
        ],
      }
    },
    methods: {
      goHome () {
        throw new Error('Test Error');
        this.$router.push(process.env.HOME_PATH);
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

