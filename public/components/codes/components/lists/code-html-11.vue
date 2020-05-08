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
          '    max-width="450"\n' +
          '    class="mx-auto"\n' +
          '  >\n' +
          '    <v-toolbar\n' +
          '      color="cyan"\n' +
          '      dark\n' +
          '    >\n' +
          '      <v-app-bar-nav-icon></v-app-bar-nav-icon>\n' +
          '\n' +
          '      <v-toolbar-title>Inbox</v-toolbar-title>\n' +
          '\n' +
          '      <v-spacer></v-spacer>\n' +
          '\n' +
          '      <v-btn icon>\n' +
          '        <v-icon>mdi-magnify</v-icon>\n' +
          '      </v-btn>\n' +
          '    </v-toolbar>\n' +
          '\n' +
          '    <v-list three-line>\n' +
          '      <template v-for="(item, index) in items">\n' +
          '        <v-subheader\n' +
          '          v-if="item.header"\n' +
          '          :key="item.header"\n' +
          '          v-text="item.header"\n' +
          '        ></v-subheader>\n' +
          '\n' +
          '        <v-divider\n' +
          '          v-else-if="item.divider"\n' +
          '          :key="index"\n' +
          '          :inset="item.inset"\n' +
          '        ></v-divider>\n' +
          '\n' +
          '        <v-list-item\n' +
          '          v-else\n' +
          '          :key="item.title"\n' +
          '          @click=""\n' +
          '        >\n' +
          '          <v-list-item-avatar>\n' +
          '            <v-img :src="item.avatar"></v-img>\n' +
          '          </v-list-item-avatar>\n' +
          '\n' +
          '          <v-list-item-content>\n' +
          '            <v-list-item-title v-html="item.title"></v-list-item-title>\n' +
          '            <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>\n' +
          '          </v-list-item-content>\n' +
          '        </v-list-item>\n' +
          '      </template>\n' +
          '    </v-list>\n' +
          '  </v-card>\n' +
          '</template>'
      }
    }
  }
</script>
