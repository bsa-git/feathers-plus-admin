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
          '  <v-toolbar\n' +
          '    dark\n' +
          '    color="teal"\n' +
          '  >\n' +
          '    <v-toolbar-title>State selection</v-toolbar-title>\n' +
          '    <v-autocomplete\n' +
          '      v-model="select"\n' +
          '      :loading="loading"\n' +
          '      :items="items"\n' +
          '      :search-input.sync="search"\n' +
          '      cache-items\n' +
          '      class="mx-4"\n' +
          '      flat\n' +
          '      hide-no-data\n' +
          '      hide-details\n' +
          '      label="What state are you from?"\n' +
          '      solo-inverted\n' +
          '    ></v-autocomplete>\n' +
          '    <v-btn icon>\n' +
          '      <v-icon>mdi-dots-vertical</v-icon>\n' +
          '    </v-btn>\n' +
          '  </v-toolbar>\n' +
          '</template>'
      }
    }
  }
</script>
