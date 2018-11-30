<template>
  <v-snackbar
    :timeout="3000"
    bottom
    right
    :color="color"
    v-model="show"
  >
    {{ text }}
    <v-btn dark flat @click.native="show = false" icon>
      <v-icon>close</v-icon>
    </v-btn>
  </v-snackbar>
</template>

<script>
export default {
  props: {
    show: Boolean,
    text: String,
    color: String
  },
};
</script>
