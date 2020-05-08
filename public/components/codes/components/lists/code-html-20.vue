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
          '      color="pink"\n' +
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
          '        <v-icon>mdi-checkbox-marked-circle</v-icon>\n' +
          '      </v-btn>\n' +
          '    </v-toolbar>\n' +
          '\n' +
          '    <v-list two-line>\n' +
          '      <v-list-item-group\n' +
          '        v-model="selected"\n' +
          '        multiple\n' +
          '        active-class="pink--text"\n' +
          '      >\n' +
          '        <template v-for="(item, index) in items">\n' +
          '          <v-list-item :key="item.title">\n' +
          '            <template v-slot:default="{ active, toggle }">\n' +
          '              <v-list-item-content>\n' +
          '                <v-list-item-title v-text="item.title"></v-list-item-title>\n' +
          '                <v-list-item-subtitle class="text--primary" v-text="item.headline"></v-list-item-subtitle>\n' +
          '                <v-list-item-subtitle v-text="item.subtitle"></v-list-item-subtitle>\n' +
          '              </v-list-item-content>\n' +
          '\n' +
          '              <v-list-item-action>\n' +
          '                <v-list-item-action-text v-text="item.action"></v-list-item-action-text>\n' +
          '                <v-icon\n' +
          '                  v-if="!active"\n' +
          '                  color="grey lighten-1"\n' +
          '                >\n' +
          '                  star_border\n' +
          '                </v-icon>\n' +
          '\n' +
          '                <v-icon\n' +
          '                  v-else\n' +
          '                  color="yellow"\n' +
          '                >\n' +
          '                  star\n' +
          '                </v-icon>\n' +
          '              </v-list-item-action>\n' +
          '            </template>\n' +
          '          </v-list-item>\n' +
          '\n' +
          '          <v-divider\n' +
          '            v-if="index + 1 < items.length"\n' +
          '            :key="index"\n' +
          '          ></v-divider>\n' +
          '        </template>\n' +
          '      </v-list-item-group>\n' +
          '    </v-list>\n' +
          '  </v-card>\n' +
          '</template>'
      }
    }
  }
</script>
