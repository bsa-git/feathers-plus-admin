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
          '  <v-treeview\n' +
          '    v-model="tree"\n' +
          '    :open="open"\n' +
          '    :items="items"\n' +
          '    activatable\n' +
          '    item-key="name"\n' +
          '    open-on-click\n' +
          '  >\n' +
          '    <template v-slot:prepend="{ item, open }">\n' +
          '      <v-icon v-if="!item.file">\n' +
          '        {{ open ? \'mdi-folder-open\' : \'mdi-folder\' }}\n' +
          '      </v-icon>\n' +
          '      <v-icon v-else>\n' +
          '        {{ files[item.file] }}\n' +
          '      </v-icon>\n' +
          '    </template>\n' +
          '  </v-treeview>\n' +
          '</template>'
      }
    }
  }
</script>
