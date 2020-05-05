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
          '    <v-system-bar\n' +
          '      color="indigo darken-2"\n' +
          '      dark\n' +
          '    >\n' +
          '      <v-spacer></v-spacer>\n' +
          '\n' +
          '      <v-icon>mdi-window-minimize</v-icon>\n' +
          '\n' +
          '      <v-icon>mdi-window-maximize</v-icon>\n' +
          '\n' +
          '      <v-icon>mdi-close</v-icon>\n' +
          '    </v-system-bar>\n' +
          '\n' +
          '    <v-toolbar\n' +
          '      color="indigo"\n' +
          '      dark\n' +
          '    >\n' +
          '      <v-app-bar-nav-icon></v-app-bar-nav-icon>\n' +
          '\n' +
          '      <v-toolbar-title>Discover</v-toolbar-title>\n' +
          '\n' +
          '      <v-spacer></v-spacer>\n' +
          '\n' +
          '      <v-btn icon>\n' +
          '        <v-icon>mdi-magnify</v-icon>\n' +
          '      </v-btn>\n' +
          '    </v-toolbar>\n' +
          '\n' +
          '    <v-container fluid>\n' +
          '      <v-row dense>\n' +
          '        <v-col\n' +
          '          v-for="card in cards"\n' +
          '          :key="card.title"\n' +
          '          :cols="card.flex"\n' +
          '        >\n' +
          '          <v-card>\n' +
          '            <v-img\n' +
          '              :src="card.src"\n' +
          '              class="white--text align-end"\n' +
          '              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"\n' +
          '              height="200px"\n' +
          '            >\n' +
          '              <v-card-title v-text="card.title"></v-card-title>\n' +
          '            </v-img>\n' +
          '\n' +
          '            <v-card-actions>\n' +
          '              <v-spacer></v-spacer>\n' +
          '\n' +
          '              <v-btn icon>\n' +
          '                <v-icon>mdi-heart</v-icon>\n' +
          '              </v-btn>\n' +
          '\n' +
          '              <v-btn icon>\n' +
          '                <v-icon>mdi-bookmark</v-icon>\n' +
          '              </v-btn>\n' +
          '\n' +
          '              <v-btn icon>\n' +
          '                <v-icon>mdi-share-variant</v-icon>\n' +
          '              </v-btn>\n' +
          '            </v-card-actions>\n' +
          '          </v-card>\n' +
          '        </v-col>\n' +
          '      </v-row>\n' +
          '    </v-container>\n' +
          '  </v-card>\n' +
          '</template>'
      }
    }
  }
</script>
