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
          '    max-width="500"\n' +
          '    class="mx-auto"\n' +
          '  >\n' +
          '    <v-toolbar\n' +
          '      color="teal"\n' +
          '      dark\n' +
          '    >\n' +
          '      <v-app-bar-nav-icon></v-app-bar-nav-icon>\n' +
          '\n' +
          '      <v-toolbar-title>Topics</v-toolbar-title>\n' +
          '\n' +
          '      <v-spacer></v-spacer>\n' +
          '\n' +
          '      <v-btn icon>\n' +
          '        <v-icon>mdi-dots-vertical</v-icon>\n' +
          '      </v-btn>\n' +
          '    </v-toolbar>\n' +
          '\n' +
          '    <v-list>\n' +
          '      <v-list-group\n' +
          '        v-for="item in items"\n' +
          '        :key="item.title"\n' +
          '        v-model="item.active"\n' +
          '        :prepend-icon="item.action"\n' +
          '        no-action\n' +
          '      >\n' +
          '        <template v-slot:activator>\n' +
          '          <v-list-item-content>\n' +
          '            <v-list-item-title v-text="item.title"></v-list-item-title>\n' +
          '          </v-list-item-content>\n' +
          '        </template>\n' +
          '\n' +
          '        <v-list-item\n' +
          '          v-for="subItem in item.items"\n' +
          '          :key="subItem.title"\n' +
          '          @click=""\n' +
          '        >\n' +
          '          <v-list-item-content>\n' +
          '            <v-list-item-title v-text="subItem.title"></v-list-item-title>\n' +
          '          </v-list-item-content>\n' +
          '        </v-list-item>\n' +
          '      </v-list-group>\n' +
          '    </v-list>\n' +
          '  </v-card>\n' +
          '</template>'
      }
    }
  }
</script>
