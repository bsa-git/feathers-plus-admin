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
          '      color="indigo"\n' +
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
          '\n' +
          '      <v-btn icon>\n' +
          '        <v-icon>mdi-dots-vertical</v-icon>\n' +
          '      </v-btn>\n' +
          '    </v-toolbar>\n' +
          '    <v-list>\n' +
          '      <v-list-item\n' +
          '        v-for="item in items"\n' +
          '        :key="item.title"\n' +
          '        @click=""\n' +
          '      >\n' +
          '        <v-list-item-icon>\n' +
          '          <v-icon v-if="item.icon" color="pink">mdi-star</v-icon>\n' +
          '        </v-list-item-icon>\n' +
          '\n' +
          '        <v-list-item-content>\n' +
          '          <v-list-item-title v-text="item.title"></v-list-item-title>\n' +
          '        </v-list-item-content>\n' +
          '\n' +
          '        <v-list-item-avatar>\n' +
          '          <v-img :src="item.avatar"></v-img>\n' +
          '        </v-list-item-avatar>\n' +
          '      </v-list-item>\n' +
          '    </v-list>\n' +
          '  </v-card>\n' +
          '</template>'
      }
    }
  }
</script>
