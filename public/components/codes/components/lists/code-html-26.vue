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
          '    width="256"\n' +
          '    tile\n' +
          '  >\n' +
          '    <v-navigation-drawer permanent>\n' +
          '      <v-system-bar></v-system-bar>\n' +
          '      <v-list>\n' +
          '        <v-list-item>\n' +
          '          <v-list-item-avatar>\n' +
          '            <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>\n' +
          '          </v-list-item-avatar>\n' +
          '        </v-list-item>\n' +
          '\n' +
          '        <v-list-item link>\n' +
          '          <v-list-item-content>\n' +
          '            <v-list-item-title class="title">John Leider</v-list-item-title>\n' +
          '            <v-list-item-subtitle>john@vuetifyjs.com</v-list-item-subtitle>\n' +
          '          </v-list-item-content>\n' +
          '\n' +
          '          <v-list-item-action>\n' +
          '            <v-icon>mdi-menu-down</v-icon>\n' +
          '          </v-list-item-action>\n' +
          '        </v-list-item>\n' +
          '      </v-list>\n' +
          '      <v-divider></v-divider>\n' +
          '      <v-list\n' +
          '        nav\n' +
          '        dense\n' +
          '      >\n' +
          '        <v-list-item-group v-model="item" color="primary">\n' +
          '          <v-list-item\n' +
          '            v-for="(item, i) in items"\n' +
          '            :key="i"\n' +
          '          >\n' +
          '            <v-list-item-icon>\n' +
          '              <v-icon v-text="item.icon"></v-icon>\n' +
          '            </v-list-item-icon>\n' +
          '\n' +
          '            <v-list-item-content>\n' +
          '              <v-list-item-title v-text="item.text"></v-list-item-title>\n' +
          '            </v-list-item-content>\n' +
          '          </v-list-item>\n' +
          '        </v-list-item-group>\n' +
          '      </v-list>\n' +
          '    </v-navigation-drawer>\n' +
          '  </v-card>\n' +
          '</template>'
      }
    }
  }
</script>
