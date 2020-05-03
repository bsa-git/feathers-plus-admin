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
          '  <v-card>\n' +
          '    <v-card-title class="headline font-weight-regular blue-grey white--text">Profile</v-card-title>\n' +
          '    <v-card-text>\n' +
          '      <v-subheader class="pa-0">Where do you live?</v-subheader>\n' +
          '      <v-autocomplete\n' +
          '        v-model="model"\n' +
          '        :hint="!isEditing ? \'Click the icon to edit\' : \'Click the icon to save\'"\n' +
          '        :items="states"\n' +
          '        :readonly="!isEditing"\n' +
          '        :label="`State — ${isEditing ? \'Editable\' : \'Readonly\'}`"\n' +
          '        persistent-hint\n' +
          '        prepend-icon="mdi-city"\n' +
          '      >\n' +
          '        <template v-slot:append-outer>\n' +
          '          <v-slide-x-reverse-transition\n' +
          '            mode="out-in"\n' +
          '          >\n' +
          '            <v-icon\n' +
          '              :key="`icon-${isEditing}`"\n' +
          '              :color="isEditing ? \'success\' : \'info\'"\n' +
          '              @click="isEditing = !isEditing"\n' +
          '              v-text="isEditing ? \'mdi-check-outline\' : \'mdi-circle-edit-outline\'"\n' +
          '            ></v-icon>\n' +
          '          </v-slide-x-reverse-transition>\n' +
          '        </template>\n' +
          '      </v-autocomplete>\n' +
          '    </v-card-text>\n' +
          '  </v-card>\n' +
          '</template>'
      }
    }
  }
</script>
