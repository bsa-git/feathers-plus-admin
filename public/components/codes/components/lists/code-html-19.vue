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
          '    max-width="375"\n' +
          '    class="mx-auto"\n' +
          '  >\n' +
          '    <v-img\n' +
          '      src="https://cdn.vuetifyjs.com/images/lists/ali.png"\n' +
          '      height="300px"\n' +
          '      dark\n' +
          '    >\n' +
          '      <v-row class="fill-height">\n' +
          '        <v-card-title>\n' +
          '          <v-btn dark icon>\n' +
          '            <v-icon>mdi-chevron-left</v-icon>\n' +
          '          </v-btn>\n' +
          '\n' +
          '          <v-spacer></v-spacer>\n' +
          '\n' +
          '          <v-btn dark icon class="mr-4">\n' +
          '            <v-icon>mdi-pencil</v-icon>\n' +
          '          </v-btn>\n' +
          '\n' +
          '          <v-btn dark icon>\n' +
          '            <v-icon>mdi-dots-vertical</v-icon>\n' +
          '          </v-btn>\n' +
          '        </v-card-title>\n' +
          '\n' +
          '        <v-spacer></v-spacer>\n' +
          '\n' +
          '        <v-card-title class="white--text pl-12 pt-12">\n' +
          '          <div class="display-1 pl-12 pt-12">Ali Conners</div>\n' +
          '        </v-card-title>\n' +
          '      </v-row>\n' +
          '    </v-img>\n' +
          '\n' +
          '    <v-list two-line>\n' +
          '      <v-list-item @click="">\n' +
          '        <v-list-item-icon>\n' +
          '          <v-icon color="indigo">mdi-phone</v-icon>\n' +
          '        </v-list-item-icon>\n' +
          '\n' +
          '        <v-list-item-content>\n' +
          '          <v-list-item-title>(650) 555-1234</v-list-item-title>\n' +
          '          <v-list-item-subtitle>Mobile</v-list-item-subtitle>\n' +
          '        </v-list-item-content>\n' +
          '\n' +
          '        <v-list-item-icon>\n' +
          '          <v-icon>mdi-message-text</v-icon>\n' +
          '        </v-list-item-icon>\n' +
          '      </v-list-item>\n' +
          '\n' +
          '      <v-list-item @click="">\n' +
          '        <v-list-item-action></v-list-item-action>\n' +
          '\n' +
          '        <v-list-item-content>\n' +
          '          <v-list-item-title>(323) 555-6789</v-list-item-title>\n' +
          '          <v-list-item-subtitle>Work</v-list-item-subtitle>\n' +
          '        </v-list-item-content>\n' +
          '\n' +
          '        <v-list-item-icon>\n' +
          '          <v-icon>mdi-message-text</v-icon>\n' +
          '        </v-list-item-icon>\n' +
          '      </v-list-item>\n' +
          '\n' +
          '      <v-divider inset></v-divider>\n' +
          '\n' +
          '      <v-list-item @click="">\n' +
          '        <v-list-item-icon>\n' +
          '          <v-icon color="indigo">mdi-email</v-icon>\n' +
          '        </v-list-item-icon>\n' +
          '\n' +
          '        <v-list-item-content>\n' +
          '          <v-list-item-title>aliconnors@example.com</v-list-item-title>\n' +
          '          <v-list-item-subtitle>Personal</v-list-item-subtitle>\n' +
          '        </v-list-item-content>\n' +
          '      </v-list-item>\n' +
          '\n' +
          '      <v-list-item @click="">\n' +
          '        <v-list-item-action></v-list-item-action>\n' +
          '\n' +
          '        <v-list-item-content>\n' +
          '          <v-list-item-title>ali_connors@example.com</v-list-item-title>\n' +
          '          <v-list-item-subtitle>Work</v-list-item-subtitle>\n' +
          '        </v-list-item-content>\n' +
          '      </v-list-item>\n' +
          '\n' +
          '      <v-divider inset></v-divider>\n' +
          '\n' +
          '      <v-list-item @click="">\n' +
          '        <v-list-item-icon>\n' +
          '          <v-icon color="indigo">mdi-map-marker</v-icon>\n' +
          '        </v-list-item-icon>\n' +
          '\n' +
          '        <v-list-item-content>\n' +
          '          <v-list-item-title>1400 Main Street</v-list-item-title>\n' +
          '          <v-list-item-subtitle>Orlando, FL 79938</v-list-item-subtitle>\n' +
          '        </v-list-item-content>\n' +
          '      </v-list-item>\n' +
          '    </v-list>\n' +
          '  </v-card>\n' +
          '</template>'
      }
    }
  }
</script>
