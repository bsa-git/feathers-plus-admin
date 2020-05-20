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
          '  <v-data-table\n' +
          '    :headers="headers"\n' +
          '    :items="desserts"\n' +
          '    :single-expand="singleExpand"\n' +
          '    :expanded.sync="expanded"\n' +
          '    item-key="name"\n' +
          '    show-expand\n' +
          '    class="elevation-1"\n' +
          '  >\n' +
          '    <template v-slot:top>\n' +
          '      <v-toolbar flat>\n' +
          '        <v-toolbar-title>Expandable Table</v-toolbar-title>\n' +
          '        <v-spacer></v-spacer>\n' +
          '        <v-switch v-model="singleExpand" label="Single expand" class="mt-2"></v-switch>\n' +
          '      </v-toolbar>\n' +
          '    </template>\n' +
          '    <template v-slot:expanded-item="{ headers, item }">\n' +
          '      <td :colspan="headers.length">More info about {{ item.name }}</td>\n' +
          '    </template>\n' +
          '  </v-data-table>\n' +
          '</template>'
      }
    }
  }
</script>
