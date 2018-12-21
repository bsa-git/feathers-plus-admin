<template>
  <v-footer height="auto" class="app-footer pa-3">
    <span class="caption exotic--light hidden-sm-and-down">{{ copyright.toUpperCase() }}</span>
    <v-spacer></v-spacer>
    <div class="footer__developer">
      <v-btn :href="site" flat color="primary" target="_blank">{{ developer }}</v-btn>
      <span class="caption exotic--light mr-1">{{ $t('app_footer.designed_with_by') }}</span>
      <v-icon color="red" small>favorite</v-icon>
    </div>
  </v-footer>
</template>


<script>
  export default {
    props: {
      copyright: {
        type: String,
        default: '© 2018 Sergey Beskorovainy'
      },
      developer: {
        type: String,
        default: 'BSA Lab.'
      },
      site: {
        type: String,
        default: 'http://bsa-git.github.io'
      }
    },
  };
</script>

<style lang="stylus" scoped>

  @require "../../../node_modules/vuetify/src/stylus/settings/_colors"

  .app-footer
    background-color: $grey.lighten-5
  .footer__developer
    margin-right: 50px
</style>

