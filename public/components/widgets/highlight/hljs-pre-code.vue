<template>
  <v-row justify="center">
    <v-col
      cols="12"
      md="6"
    >
      <v-card
        class="my-5"
        :color="$vuetify.theme.themes.dark.secondary"
        dark
        outlined
      >
        <v-card-text>
          <pre><code  class="hljs" :class="[lang, { plaintext: isPlaintext, nohighlight: isDisable }]"><slot></slot></code></pre>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
  import {mapGetters} from 'vuex';
  import Highlight from '~/plugins/lib/highlight.class';

  export default {
    props: {
      lang: {
        type: String,
        default: ''
      },
      isPlaintext: {
        type: Boolean,
        default: false
      },
      isDisable: {
        type: Boolean,
        default: false
      },
    },
    mounted: function () {
      this.$nextTick(function () {
        const hl = new Highlight(this.lang);
        hl.initBlock('pre code');
      })
    },
    computed: {
      ...mapGetters({
        theme: 'getTheme',
      }),
    },
  };
</script>

<style scoped lang="sass">
  .hljs
    background-color: inherit
    color: inherit
    box-shadow: none
</style>

