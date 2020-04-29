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
          '    color="red lighten-2"\n' +
          '    dark\n' +
          '  >\n' +
          '    <v-card-title class="headline red lighten-3">\n' +
          '      Search for Public APIs\n' +
          '    </v-card-title>\n' +
          '    <v-card-text>\n' +
          '      Explore hundreds of free API\'s ready for consumption! For more information visit\n' +
          '      <a\n' +
          '        class="grey--text text--lighten-3"\n' +
          '        href="https://github.com/toddmotto/public-apis"\n' +
          '        target="_blank"\n' +
          '      >the Github repository</a>.\n' +
          '    </v-card-text>\n' +
          '    <v-card-text>\n' +
          '      <v-autocomplete\n' +
          '        v-model="model"\n' +
          '        :items="items"\n' +
          '        :loading="isLoading"\n' +
          '        :search-input.sync="search"\n' +
          '        color="white"\n' +
          '        hide-no-data\n' +
          '        hide-selected\n' +
          '        item-text="Description"\n' +
          '        item-value="API"\n' +
          '        label="Public APIs"\n' +
          '        placeholder="Start typing to Search"\n' +
          '        prepend-icon="mdi-database-search"\n' +
          '        return-object\n' +
          '      ></v-autocomplete>\n' +
          '    </v-card-text>\n' +
          '    <v-divider></v-divider>\n' +
          '    <v-expand-transition>\n' +
          '      <v-list v-if="model" class="red lighten-3">\n' +
          '        <v-list-item\n' +
          '          v-for="(field, i) in fields"\n' +
          '          :key="i"\n' +
          '        >\n' +
          '          <v-list-item-content>\n' +
          '            <v-list-item-title v-text="field.value"></v-list-item-title>\n' +
          '            <v-list-item-subtitle v-text="field.key"></v-list-item-subtitle>\n' +
          '          </v-list-item-content>\n' +
          '        </v-list-item>\n' +
          '      </v-list>\n' +
          '    </v-expand-transition>\n' +
          '    <v-card-actions>\n' +
          '      <v-spacer></v-spacer>\n' +
          '      <v-btn\n' +
          '        :disabled="!model"\n' +
          '        color="grey darken-3"\n' +
          '        @click="model = null"\n' +
          '      >\n' +
          '        Clear\n' +
          '        <v-icon right>mdi-close-circle</v-icon>\n' +
          '      </v-btn>\n' +
          '    </v-card-actions>\n' +
          '  </v-card>\n' +
          '</template>'
      }
    }
  }
</script>
