<template>
  <div :class="`exotic--${theme.name} display-1 mt-3 mb-6 text-center page-title`">{{ pageTitle }}</div>
</template>

<script>
  import {mapGetters} from 'vuex';

  export default {
    props: {
      pageTitle: String
    },
    computed: {
      ...mapGetters({
        theme: 'getTheme'
      }),
    }
  };
</script>

<style lang="sass" scoped>
  .page-title
    transform: scaleY(1.2)
</style>
