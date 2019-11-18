<template>
  <v-snackbar
    :timeout="timeout"
    bottom
    right
    :color="color"
    v-model="compShow"
  >
    {{ text }}
    <v-btn dark @click.native="show = false" icon>
      <v-icon>mdi-close</v-icon>
    </v-btn>
  </v-snackbar>
</template>

<script>
export default {
  props: {
    show: Boolean,
    text: String,
    color: String,
    timeout: Number
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
