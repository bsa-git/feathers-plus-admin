<template>
  <div>
    {{ code }}
  </div>
</template>

<script>
  export default {
    data() {
      return {
        code: '<template>\n' +
          '  <v-card\n' +
          '    class="overflow-hidden"\n' +
          '    color="purple lighten-1"\n' +
          '    dark\n' +
          '  >\n' +
          '    <v-toolbar\n' +
          '      flat\n' +
          '      color="purple"\n' +
          '    >\n' +
          '      <v-icon>mdi-account</v-icon>\n' +
          '      <v-toolbar-title class="font-weight-light">User Profile</v-toolbar-title>\n' +
          '      <v-spacer></v-spacer>\n' +
          '      <v-btn\n' +
          '        color="purple darken-3"\n' +
          '        fab\n' +
          '        small\n' +
          '        @click="isEditing = !isEditing"\n' +
          '      >\n' +
          '        <v-icon v-if="isEditing">mdi-close</v-icon>\n' +
          '        <v-icon v-else>mdi-pencil</v-icon>\n' +
          '      </v-btn>\n' +
          '    </v-toolbar>\n' +
          '    <v-card-text>\n' +
          '      <v-text-field\n' +
          '        :disabled="!isEditing"\n' +
          '        color="white"\n' +
          '        label="Name"\n' +
          '      ></v-text-field>\n' +
          '      <v-autocomplete\n' +
          '        :disabled="!isEditing"\n' +
          '        :items="states"\n' +
          '        :filter="customFilter"\n' +
          '        color="white"\n' +
          '        item-text="name"\n' +
          '        label="State"\n' +
          '      ></v-autocomplete>\n' +
          '    </v-card-text>\n' +
          '    <v-divider></v-divider>\n' +
          '    <v-card-actions>\n' +
          '      <v-spacer></v-spacer>\n' +
          '      <v-btn\n' +
          '        :disabled="!isEditing"\n' +
          '        color="success"\n' +
          '        @click="save"\n' +
          '      >\n' +
          '        Save\n' +
          '      </v-btn>\n' +
          '    </v-card-actions>\n' +
          '    <v-snackbar\n' +
          '      v-model="hasSaved"\n' +
          '      :timeout="2000"\n' +
          '      absolute\n' +
          '      bottom\n' +
          '      left\n' +
          '    >\n' +
          '      Your profile has been updated\n' +
          '    </v-snackbar>\n' +
          '  </v-card>\n' +
          '</template>'
      }
    }
  }
</script>
