<template>
  <div :class="`exotic--${themeName} display-1 mt-3 mb-6 text-center page-title`">{{ pageTitle }}</div>
</template>

<script>
  export default {
    props: {
      pageTitle: String
    },
    computed: {
      themeName: function () {
        return this.$vuetify.theme.dark? 'dark' : 'light';
      },
    }
  };
</script>

<style lang="sass" scoped>
  .page-title
    transform: scaleY(1.2)
</style>
