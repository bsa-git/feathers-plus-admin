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
          '    max-width="400"\n' +
          '    class="mx-auto"\n' +
          '  >\n' +
          '    <v-system-bar\n' +
          '      color="pink darken-2"\n' +
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
          '    <v-app-bar\n' +
          '      dark\n' +
          '      color="pink"\n' +
          '    >\n' +
          '      <v-app-bar-nav-icon></v-app-bar-nav-icon>\n' +
          '\n' +
          '      <v-toolbar-title>My Music</v-toolbar-title>\n' +
          '\n' +
          '      <v-spacer></v-spacer>\n' +
          '\n' +
          '      <v-btn icon>\n' +
          '        <v-icon>mdi-magnify</v-icon>\n' +
          '      </v-btn>\n' +
          '    </v-app-bar>\n' +
          '\n' +
          '    <v-container>\n' +
          '      <v-row dense>\n' +
          '        <v-col cols="12">\n' +
          '          <v-card\n' +
          '            color="#385F73"\n' +
          '            dark\n' +
          '          >\n' +
          '            <v-card-title class="headline">Unlimited music now</v-card-title>\n' +
          '\n' +
          '            <v-card-subtitle>Listen to your favorite artists and albums whenever and wherever, online and offline.</v-card-subtitle>\n' +
          '\n' +
          '            <v-card-actions>\n' +
          '              <v-btn text>Listen Now</v-btn>\n' +
          '            </v-card-actions>\n' +
          '          </v-card>\n' +
          '        </v-col>\n' +
          '\n' +
          '        <v-col\n' +
          '          v-for="(item, i) in items"\n' +
          '          :key="i"\n' +
          '          cols="12"\n' +
          '        >\n' +
          '          <v-card\n' +
          '            :color="item.color"\n' +
          '            dark\n' +
          '          >\n' +
          '            <div class="d-flex flex-no-wrap justify-space-between">\n' +
          '              <div>\n' +
          '                <v-card-title\n' +
          '                  class="headline"\n' +
          '                  v-text="item.title"\n' +
          '                ></v-card-title>\n' +
          '\n' +
          '                <v-card-subtitle v-text="item.artist"></v-card-subtitle>\n' +
          '              </div>\n' +
          '\n' +
          '              <v-avatar\n' +
          '                class="ma-3"\n' +
          '                size="125"\n' +
          '                tile\n' +
          '              >\n' +
          '                <v-img :src="item.src"></v-img>\n' +
          '              </v-avatar>\n' +
          '            </div>\n' +
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
