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
          '    max-width="400"\n' +
          '  >\n' +
          '    <v-toolbar\n' +
          '      color="purple"\n' +
          '      dark\n' +
          '    >\n' +
          '      <v-app-bar-nav-icon></v-app-bar-nav-icon>\n' +
          '\n' +
          '      <v-toolbar-title>Settings</v-toolbar-title>\n' +
          '\n' +
          '      <v-spacer></v-spacer>\n' +
          '\n' +
          '      <v-btn icon>\n' +
          '        <v-icon>mdi-magnify</v-icon>\n' +
          '      </v-btn>\n' +
          '    </v-toolbar>\n' +
          '\n' +
          '    <v-list\n' +
          '      subheader\n' +
          '      three-line\n' +
          '    >\n' +
          '      <v-subheader>User Controls</v-subheader>\n' +
          '\n' +
          '      <v-list-item>\n' +
          '        <v-list-item-content>\n' +
          '          <v-list-item-title>Content filtering</v-list-item-title>\n' +
          '          <v-list-item-subtitle>Set the content filtering level to restrict appts that can be downloaded</v-list-item-subtitle>\n' +
          '        </v-list-item-content>\n' +
          '      </v-list-item>\n' +
          '\n' +
          '      <v-list-item>\n' +
          '        <v-list-item-content>\n' +
          '          <v-list-item-title>Password</v-list-item-title>\n' +
          '          <v-list-item-subtitle>Require password for purchase or use password to restrict purchase</v-list-item-subtitle>\n' +
          '        </v-list-item-content>\n' +
          '      </v-list-item>\n' +
          '    </v-list>\n' +
          '\n' +
          '    <v-divider></v-divider>\n' +
          '\n' +
          '    <v-list\n' +
          '      flat\n' +
          '      subheader\n' +
          '      three-line\n' +
          '    >\n' +
          '      <v-subheader>General</v-subheader>\n' +
          '\n' +
          '      <v-list-item-group\n' +
          '        v-model="settings"\n' +
          '        multiple\n' +
          '        active-class=""\n' +
          '      >\n' +
          '        <v-list-item>\n' +
          '          <template v-slot:default="{ active }">\n' +
          '            <v-list-item-action>\n' +
          '              <v-checkbox v-model="active"></v-checkbox>\n' +
          '            </v-list-item-action>\n' +
          '\n' +
          '            <v-list-item-content>\n' +
          '              <v-list-item-title>Notifications</v-list-item-title>\n' +
          '              <v-list-item-subtitle>Notify me about updates to apps or games that I downloaded</v-list-item-subtitle>\n' +
          '            </v-list-item-content>\n' +
          '          </template>\n' +
          '        </v-list-item>\n' +
          '\n' +
          '        <v-list-item>\n' +
          '          <template v-slot:default="{ active }">\n' +
          '            <v-list-item-action>\n' +
          '              <v-checkbox v-model="active"></v-checkbox>\n' +
          '            </v-list-item-action>\n' +
          '\n' +
          '            <v-list-item-content>\n' +
          '              <v-list-item-title>Sound</v-list-item-title>\n' +
          '              <v-list-item-subtitle>Auto-update apps at any time. Data charges may apply</v-list-item-subtitle>\n' +
          '            </v-list-item-content>\n' +
          '          </template>\n' +
          '        </v-list-item>\n' +
          '\n' +
          '        <v-list-item>\n' +
          '          <template v-slot:default="{ active }">\n' +
          '            <v-list-item-action>\n' +
          '              <v-checkbox v-model="active"></v-checkbox>\n' +
          '            </v-list-item-action>\n' +
          '\n' +
          '            <v-list-item-content>\n' +
          '              <v-list-item-title>Auto-add widgets</v-list-item-title>\n' +
          '              <v-list-item-subtitle>Automatically add home screen widgets when downloads complete</v-list-item-subtitle>\n' +
          '            </v-list-item-content>\n' +
          '          </template>\n' +
          '        </v-list-item>\n' +
          '      </v-list-item-group>\n' +
          '    </v-list>\n' +
          '  </v-card>\n' +
          '</template>'
      }
    }
  }
</script>
