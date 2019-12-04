<template>
  <v-dialog v-model="dialog" persistent max-width="320">
    <v-card>
      <v-card-title class="title">{{ titleDialog }}?</v-card-title>
      <v-card-text>
        {{ textDialog }}
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="$emit('onCloseDialog')">{{ $t('common.disagree') }}</v-btn>
        <v-btn text color="primary"  @click="runAction">{{ $t('common.agree') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    dialog: Boolean,
    runAction: Function,
    titleDialog: String,
    textDialog: String
  }
};
</script>
