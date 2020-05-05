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
          '    max-width="344"\n' +
          '    class="mx-auto"\n' +
          '  >\n' +
          '    <v-list-item>\n' +
          '      <v-list-item-avatar color="grey"></v-list-item-avatar>\n' +
          '      <v-list-item-content>\n' +
          '        <v-list-item-title class="headline">Our Changing Planet</v-list-item-title>\n' +
          '        <v-list-item-subtitle>by Kurt Wagner</v-list-item-subtitle>\n' +
          '      </v-list-item-content>\n' +
          '    </v-list-item>\n' +
          '\n' +
          '    <v-img\n' +
          '      src="https://cdn.vuetifyjs.com/images/cards/mountain.jpg"\n' +
          '      height="194"\n' +
          '    ></v-img>\n' +
          '\n' +
          '    <v-card-text>\n' +
          '      Visit ten places on our planet that are undergoing the biggest changes today.\n' +
          '    </v-card-text>\n' +
          '\n' +
          '    <v-card-actions>\n' +
          '      <v-btn\n' +
          '        text\n' +
          '        color="deep-purple accent-4"\n' +
          '      >\n' +
          '        Read\n' +
          '      </v-btn>\n' +
          '      <v-btn\n' +
          '        text\n' +
          '        color="deep-purple accent-4"\n' +
          '      >\n' +
          '        Bookmark\n' +
          '      </v-btn>\n' +
          '      <v-spacer></v-spacer>\n' +
          '      <v-btn icon>\n' +
          '        <v-icon>mdi-heart</v-icon>\n' +
          '      </v-btn>\n' +
          '      <v-btn icon>\n' +
          '        <v-icon>mdi-share-variant</v-icon>\n' +
          '      </v-btn>\n' +
          '    </v-card-actions>\n' +
          '  </v-card>\n' +
          '</template>'
      }
    }
  }
</script>
