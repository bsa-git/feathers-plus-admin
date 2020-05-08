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
          '    max-width="300"\n' +
          '    tile\n' +
          '  >\n' +
          '    <v-list shaped>\n' +
          '      <v-subheader>REPORTS</v-subheader>\n' +
          '      <v-list-item-group v-model="item" color="primary">\n' +
          '        <v-list-item\n' +
          '          v-for="(item, i) in items"\n' +
          '          :key="i"\n' +
          '        >\n' +
          '          <v-list-item-icon>\n' +
          '            <v-icon v-text="item.icon"></v-icon>\n' +
          '          </v-list-item-icon>\n' +
          '          <v-list-item-content>\n' +
          '            <v-list-item-title v-text="item.text"></v-list-item-title>\n' +
          '          </v-list-item-content>\n' +
          '        </v-list-item>\n' +
          '      </v-list-item-group>\n' +
          '    </v-list>\n' +
          '  </v-card>\n' +
          '</template>'
      }
    }
  }
</script>
