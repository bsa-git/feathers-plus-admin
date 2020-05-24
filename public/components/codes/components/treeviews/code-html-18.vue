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
          '    class="mx-auto"\n' +
          '    max-width="500"\n' +
          '  >\n' +
          '    <v-sheet class="pa-4 primary lighten-2">\n' +
          '      <v-text-field\n' +
          '        v-model="search"\n' +
          '        label="Search Company Directory"\n' +
          '        dark\n' +
          '        flat\n' +
          '        solo-inverted\n' +
          '        hide-details\n' +
          '        clearable\n' +
          '        clear-icon="mdi-close-circle-outline"\n' +
          '      ></v-text-field>\n' +
          '      <v-checkbox\n' +
          '        v-model="caseSensitive"\n' +
          '        dark\n' +
          '        hide-details\n' +
          '        label="Case sensitive search"\n' +
          '      ></v-checkbox>\n' +
          '    </v-sheet>\n' +
          '    <v-card-text>\n' +
          '      <v-treeview\n' +
          '        :items="items"\n' +
          '        :search="search"\n' +
          '        :filter="filter"\n' +
          '        :open.sync="open"\n' +
          '      >\n' +
          '        <template v-slot:prepend="{ item }">\n' +
          '          <v-icon\n' +
          '            v-if="item.children"\n' +
          '            v-text="`mdi-${item.id === 1 ? \'home-variant\' : \'folder-network\'}`"\n' +
          '          ></v-icon>\n' +
          '        </template>\n' +
          '      </v-treeview>\n' +
          '    </v-card-text>\n' +
          '  </v-card>\n' +
          '</template>'
      }
    }
  }
</script>
