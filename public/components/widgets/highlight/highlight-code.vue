<template>
  <v-row justify="center">
    <v-col
      cols="12"
      :md="md"
    >
      <v-card
        class="my-5"
        :color="$vuetify.theme.themes.dark.secondary"
        dark
        outlined
      >
        <v-card-title class="d-flex justify-center">{{title}}</v-card-title>
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
      init: {
        type: Boolean,
        default: false
      },
      lang: {// xml, javascript, json
        type: String,
        default: ''
      },
      title: {
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
      md: {
        type: Number,
        default: 6
      },
    },
    mounted: function () {
      this.$nextTick(function () {
        if(this.init){
          const hl = new Highlight(this.lang);
          hl.initBlock('pre code.hljs');
        }
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

