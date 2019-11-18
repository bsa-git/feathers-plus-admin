<template>
  <v-footer
    height="auto"
    class="app-footer pa-3"
  >
    <span :class="`caption exotic--${theme.name} hidden-sm-and-down`">{{ copyright.toUpperCase() }}</span>
    <v-spacer></v-spacer>
    <div class="footer__developer">
      <v-btn :href="site" color="primary" target="_blank" text>{{ developer }}</v-btn>
      <span :class="`caption exotic--${theme.name} mr-1`">{{ $t('app_footer.designed_with_by') }}</span>
      <v-icon color="red" small>mdi-cards-heart</v-icon>
    </div>
  </v-footer>
</template>


<script>
  import {mapGetters} from 'vuex';

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
    computed: {
      ...mapGetters({
        theme: 'getTheme'
      }),
    }
  };


</script>

<style lang="sass" scoped>

  @import '~vuetify/src/styles/styles.sass'

  .footer__developer
    margin-right: 50px
  .theme--dark.v-footer
    background-color: map-get($material-dark, 'background')
  .theme--light.v-footer
    background-color: map-get($material-light, 'background')

</style>

