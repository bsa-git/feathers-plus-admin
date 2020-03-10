<template>
  <v-dialog v-model="showDialog" scrollable :max-width="maxWidth">
    <v-card>
      <!-- Toolbar -->
      <v-toolbar color="primary" elevation="0" dense dark>
        <v-icon class="mr-3" v-if="headerIcon">{{ headerIcon }}</v-icon>
        <v-app-bar-nav-icon v-else></v-app-bar-nav-icon>
        <v-toolbar-title>{{ headerTitle }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="showDialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <!-- Card content -->
      <slot name="card-content"></slot>
      <!-- Text content -->
      <v-card-text v-if="isTextContent">
        <slot name="text-content"></slot>
      </v-card-text>
      <!-- Actions -->
      <v-card-actions  class="primary">
        <v-btn class="mx-auto" @click="showDialog = false" small dark text>{{ actionText }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    dialog: Boolean,
    headerIcon: String,
    headerTitle: String,
    actionText: {
      type: String,
      default: 'Close'
    },
    maxWidth: {
      type: Number,
      default: 400
    },
    isTextContent: {
      type: Boolean,
      default: true
    },
  },
  computed: {
    showDialog: {
      // Getter:
      get: function () {
        return this.dialog
      },
      // Setter:
      set: function (newValue) {
        this.$emit('onClose', newValue)
      }
    }
  },
};
</script>
