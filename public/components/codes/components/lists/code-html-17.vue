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
          '    max-width="475"\n' +
          '    class="mx-auto"\n' +
          '  >\n' +
          '    <v-toolbar\n' +
          '      color="teal"\n' +
          '      dark\n' +
          '    >\n' +
          '      <v-app-bar-nav-icon></v-app-bar-nav-icon>\n' +
          '\n' +
          '      <v-toolbar-title>Settings</v-toolbar-title>\n' +
          '    </v-toolbar>\n' +
          '\n' +
          '    <v-list two-line subheader>\n' +
          '      <v-subheader>General</v-subheader>\n' +
          '\n' +
          '      <v-list-item>\n' +
          '        <v-list-item-content>\n' +
          '          <v-list-item-title>Profile photo</v-list-item-title>\n' +
          '          <v-list-item-subtitle>Change your Google+ profile photo</v-list-item-subtitle>\n' +
          '        </v-list-item-content>\n' +
          '      </v-list-item>\n' +
          '\n' +
          '      <v-list-item>\n' +
          '        <v-list-item-content>\n' +
          '          <v-list-item-title>Show your status</v-list-item-title>\n' +
          '          <v-list-item-subtitle>Your status is visible to everyone</v-list-item-subtitle>\n' +
          '        </v-list-item-content>\n' +
          '      </v-list-item>\n' +
          '    </v-list>\n' +
          '\n' +
          '    <v-divider></v-divider>\n' +
          '\n' +
          '    <v-list\n' +
          '      subheader\n' +
          '      two-line\n' +
          '      flat\n' +
          '    >\n' +
          '      <v-subheader>Hangout notifications</v-subheader>\n' +
          '\n' +
          '      <v-list-item-group\n' +
          '        v-model="settings"\n' +
          '        multiple\n' +
          '      >\n' +
          '        <v-list-item>\n' +
          '          <template v-slot:default="{ active, toggle }">\n' +
          '            <v-list-item-action>\n' +
          '              <v-checkbox\n' +
          '                v-model="active"\n' +
          '                color="primary"\n' +
          '                @click="toggle"\n' +
          '              ></v-checkbox>\n' +
          '            </v-list-item-action>\n' +
          '\n' +
          '            <v-list-item-content>\n' +
          '              <v-list-item-title>Notifications</v-list-item-title>\n' +
          '              <v-list-item-subtitle>Allow notifications</v-list-item-subtitle>\n' +
          '            </v-list-item-content>\n' +
          '          </template>\n' +
          '        </v-list-item>\n' +
          '\n' +
          '        <v-list-item>\n' +
          '          <template v-slot:default="{ active, toggle }">\n' +
          '            <v-list-item-action>\n' +
          '              <v-checkbox\n' +
          '                v-model="active"\n' +
          '                color="primary"\n' +
          '                @click="toggle"\n' +
          '              ></v-checkbox>\n' +
          '            </v-list-item-action>\n' +
          '\n' +
          '            <v-list-item-content>\n' +
          '              <v-list-item-title>Sound</v-list-item-title>\n' +
          '              <v-list-item-subtitle>Hangouts message</v-list-item-subtitle>\n' +
          '            </v-list-item-content>\n' +
          '          </template>\n' +
          '        </v-list-item>\n' +
          '\n' +
          '        <v-list-item>\n' +
          '          <template v-slot:default="{ active, toggle }">\n' +
          '            <v-list-item-action>\n' +
          '              <v-checkbox\n' +
          '                v-model="active"\n' +
          '                color="primary"\n' +
          '                @click="toggle"\n' +
          '              ></v-checkbox>\n' +
          '            </v-list-item-action>\n' +
          '\n' +
          '            <v-list-item-content>\n' +
          '              <v-list-item-title>Video sounds</v-list-item-title>\n' +
          '              <v-list-item-subtitle>Hangouts video call</v-list-item-subtitle>\n' +
          '            </v-list-item-content>\n' +
          '          </template>\n' +
          '        </v-list-item>\n' +
          '\n' +
          '        <v-list-item>\n' +
          '          <template v-slot:default="{ active, toggle }">\n' +
          '            <v-list-item-action>\n' +
          '              <v-checkbox\n' +
          '                v-model="active"\n' +
          '                color="primary"\n' +
          '                @click="toggle"\n' +
          '              ></v-checkbox>\n' +
          '            </v-list-item-action>\n' +
          '\n' +
          '            <v-list-item-content>\n' +
          '              <v-list-item-title>Invites</v-list-item-title>\n' +
          '              <v-list-item-subtitle>Notify when receiving invites</v-list-item-subtitle>\n' +
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
