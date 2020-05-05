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
          '    color="#26c6da"\n' +
          '    dark\n' +
          '    max-width="400"\n' +
          '  >\n' +
          '    <v-card-title>\n' +
          '      <v-icon\n' +
          '        large\n' +
          '        left\n' +
          '      >\n' +
          '        mdi-twitter\n' +
          '      </v-icon>\n' +
          '      <span class="title font-weight-light">Twitter</span>\n' +
          '    </v-card-title>\n' +
          '\n' +
          '    <v-card-text class="headline font-weight-bold">\n' +
          '      {{ twitText }}\n' +
          '    </v-card-text>\n' +
          '\n' +
          '    <v-card-actions>\n' +
          '      <v-list-item class="grow">\n' +
          '        <v-list-item-avatar color="grey darken-3">\n' +
          '          <v-img\n' +
          '            class="elevation-6"\n' +
          '            :src="twitAvatar"\n' +
          '          ></v-img>\n' +
          '        </v-list-item-avatar>\n' +
          '\n' +
          '        <v-list-item-content>\n' +
          '          <v-list-item-title>Evan You</v-list-item-title>\n' +
          '        </v-list-item-content>\n' +
          '\n' +
          '        <v-row\n' +
          '          align="center"\n' +
          '          justify="end"\n' +
          '        >\n' +
          '          <v-icon class="mr-1">mdi-heart</v-icon>\n' +
          '          <span class="subheading mr-2">256</span>\n' +
          '          <span class="mr-1">·</span>\n' +
          '          <v-icon class="mr-1">mdi-share-variant</v-icon>\n' +
          '          <span class="subheading">45</span>\n' +
          '        </v-row>\n' +
          '      </v-list-item>\n' +
          '    </v-card-actions>\n' +
          '  </v-card>\n' +
          '</template>'
      }
    }
  }
</script>
