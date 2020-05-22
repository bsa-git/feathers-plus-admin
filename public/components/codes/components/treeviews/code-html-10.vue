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
          '  <v-container>\n' +
          '    <v-select v-model="selectionType" :items="[\'leaf\', \'independent\']" label="Selection type"></v-select>\n' +
          '    <v-row>\n' +
          '      <v-col>\n' +
          '        <v-treeview\n' +
          '          v-model="selection"\n' +
          '          :items="items"\n' +
          '          :selection-type="selectionType"\n' +
          '          selectable\n' +
          '          return-object\n' +
          '          open-all\n' +
          '        ></v-treeview>\n' +
          '      </v-col>\n' +
          '      <v-divider vertical></v-divider>\n' +
          '      <v-col class="pa-6" cols="6">\n' +
          '        <template v-if="!selection.length">\n' +
          '          No nodes selected.\n' +
          '        </template>\n' +
          '        <template v-else>\n' +
          '          <div v-for="node in selection" :key="node.id">\n' +
          '            {{ node.name }}\n' +
          '          </div>\n' +
          '        </template>\n' +
          '      </v-col>\n' +
          '    </v-row>\n' +
          '\n' +
          '  </v-container>\n' +
          '</template>'
      }
    }
  }
</script>
