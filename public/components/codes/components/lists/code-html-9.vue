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
          '    max-width="600"\n' +
          '    class="mx-auto"\n' +
          '  >\n' +
          '    <v-toolbar\n' +
          '      color="light-blue"\n' +
          '      dark\n' +
          '    >\n' +
          '      <v-app-bar-nav-icon></v-app-bar-nav-icon>\n' +
          '\n' +
          '      <v-toolbar-title>My files</v-toolbar-title>\n' +
          '\n' +
          '      <v-spacer></v-spacer>\n' +
          '\n' +
          '      <v-btn icon>\n' +
          '        <v-icon>mdi-magnify</v-icon>\n' +
          '      </v-btn>\n' +
          '\n' +
          '      <v-btn icon>\n' +
          '        <v-icon>mdi-view-module</v-icon>\n' +
          '      </v-btn>\n' +
          '    </v-toolbar>\n' +
          '\n' +
          '    <v-list two-line subheader>\n' +
          '      <v-subheader inset>Folders</v-subheader>\n' +
          '\n' +
          '      <v-list-item\n' +
          '        v-for="item in items"\n' +
          '        :key="item.title"\n' +
          '        @click=""\n' +
          '      >\n' +
          '        <v-list-item-avatar>\n' +
          '          <v-icon\n' +
          '            :class="[item.iconClass]"\n' +
          '            v-text="item.icon"\n' +
          '          ></v-icon>\n' +
          '        </v-list-item-avatar>\n' +
          '\n' +
          '        <v-list-item-content>\n' +
          '          <v-list-item-title v-text="item.title"></v-list-item-title>\n' +
          '          <v-list-item-subtitle v-text="item.subtitle"></v-list-item-subtitle>\n' +
          '        </v-list-item-content>\n' +
          '\n' +
          '        <v-list-item-action>\n' +
          '          <v-btn icon>\n' +
          '            <v-icon color="grey lighten-1">mdi-information</v-icon>\n' +
          '          </v-btn>\n' +
          '        </v-list-item-action>\n' +
          '      </v-list-item>\n' +
          '\n' +
          '      <v-divider inset></v-divider>\n' +
          '\n' +
          '      <v-subheader inset>Files</v-subheader>\n' +
          '\n' +
          '      <v-list-item\n' +
          '        v-for="item in items2"\n' +
          '        :key="item.title"\n' +
          '        @click=""\n' +
          '      >\n' +
          '        <v-list-item-avatar>\n' +
          '          <v-icon\n' +
          '            :class="[item.iconClass]"\n' +
          '            v-text="item.icon"\n' +
          '          ></v-icon>\n' +
          '        </v-list-item-avatar>\n' +
          '\n' +
          '        <v-list-item-content>\n' +
          '          <v-list-item-title v-text="item.title"></v-list-item-title>\n' +
          '          <v-list-item-subtitle v-text="item.subtitle"></v-list-item-subtitle>\n' +
          '        </v-list-item-content>\n' +
          '\n' +
          '        <v-list-item-action>\n' +
          '          <v-btn icon>\n' +
          '            <v-icon color="grey lighten-1">mdi-information</v-icon>\n' +
          '          </v-btn>\n' +
          '        </v-list-item-action>\n' +
          '      </v-list-item>\n' +
          '    </v-list>\n' +
          '  </v-card>\n' +
          '</template>'
      }
    }
  }
</script>
