<template>
  <v-dialog v-model="showDialog" scrollable :max-width="maxWidth">
    <v-card>
      <!-- Toolbar -->
      <v-toolbar color="primary" dark>
        <v-icon class="mr-3" v-if="headerIcon">{{ headerIcon }}</v-icon>
        <v-app-bar-nav-icon v-else></v-app-bar-nav-icon>
        <v-toolbar-title>{{ headerTitle }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="showDialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <!-- Text content -->
      <v-card-text>
        <slot name="view-content"></slot>
      </v-card-text>
      <v-divider></v-divider>
      <!-- Actions -->
      <v-card-actions>
        <v-btn class="mx-auto mb-3" color="primary" @click="showDialog = false" text>{{ actionText }}</v-btn>
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
