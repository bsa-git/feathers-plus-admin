<template>
  <v-snackbar
    :timeout="timeout"
    :multi-line="multiLine"
    bottom
    right
    :color="color"
    v-model="compShow"
  >
    {{ text }}

    <template v-slot:action="{ attrs }">
      <v-btn
        v-bind="attrs"
        @click.native="show = false"
        dark
        icon
      ><v-icon>mdi-close</v-icon></v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: undefined
    },
    timeout: {
      type: Number,
      default: 5000
    },
    multiLine: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    compShow: {
      // Getter:
      get: function () {
        return this.show
      },
      // Setter:
      set: function (newValue) {
        this.$emit('onShow', newValue)
      }
    }
  },
};
</script>
