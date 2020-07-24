<template>
  <v-textarea
    v-model="compMsgInput"
    :label="label"
    auto-grow
    outlined
    clearable
    rows="1"
    row-height="15"
  >
    <v-btn
      slot="append-outer"
      style="margin-top: -10px"
      :title="btnTitle"
      fab
      :dark="theme.dark"
      small
      color="primary"
      @click="clickSend"
    >
      <v-icon dark>mdi-send</v-icon>
    </v-btn>
  </v-textarea>
</template>

<script>
  import {mapGetters} from 'vuex'

  const debug = require('debug')('app:page.chat-messages');
  const isLog = false;

  export default {
    components: {
    },
    props: {
      label: String,
      msgInput: String,
      btnTitle: String
    },
    created: function () {

    },
    computed: {
      ...mapGetters({
        theme: 'getTheme',
      }),
      compMsgInput: {
        // Getter:
        get: function () {
          return this.msgInput
        },
        // Setter:
        set: function (newValue) {
          this.$emit('onMsgInput', newValue)
        }
      },
    },
    methods: {
      clickSend(){
        this.$emit('onClickSend')
      }
    }
  }
</script>
