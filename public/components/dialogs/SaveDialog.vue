<template>
  <v-row justify="center">
    <v-dialog v-model="showDialog" :max-width="maxWidth" persistent>
      <v-card
        color="secondary"
        :dark="theme.dark"
      >
        <!-- Toolbar -->
        <v-toolbar color="primary" elevation="0" dark>
          <v-icon v-if="isNewItem" class="mr-3">fas fa-plus-square</v-icon>
          <v-icon v-else class="mr-3">fas fa-edit</v-icon>
          <v-toolbar-title v-if="dialogTitle">{{ dialogTitle }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="showDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <!-- Text content -->
        <v-form @submit.prevent="onSubmit">
          <v-card-text>
            <div class="text-center">
              <slot name="save-header"></slot>
              <h1 v-if="contentTitle" class="my-4 primary--text font-weight-light">{{ contentTitle }}</h1>
            </div>
            <slot name="save-content"></slot>
          </v-card-text>
          <!-- Actions -->
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" type="submit" :loading="loadingSubmit">
              {{ $t('management.save') }}
            </v-btn>
            <v-btn @click="closeDialog">
              {{ $t('management.cancel') }}
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    props: {
      onSubmit: Function,
      closeDialog: Function,
      dialog: {
        type: Boolean,
        default: false
      },
      loadingSubmit: {
        type: Boolean,
        default: false
      },
      dialogTitle: {
        type: String,
        default: ''
      },
      contentTitle: {
        type: String,
        default: ''
      },
      isNewItem: {
        type: Boolean,
        default: false
      },
      actionSaveText: {
        type: String,
        default: 'Save'
      },
      actionCancelText: {
        type: String,
        default: 'Cancel'
      },
      maxWidth: {
        type: Number,
        default: 600
      },
    },
    computed: {
      ...mapGetters({
        theme: 'getTheme',
      }),
      showDialog: {
        // Getter:
        get: function () {
          return this.dialog
        },
        // Setter:
        set: function (newValue) {
          this.closeDialog();
        }
      }
    },
  };
</script>
