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
          '    max-width="344"\n' +
          '    outlined\n' +
          '  >\n' +
          '    <v-list-item three-line>\n' +
          '      <v-list-item-content>\n' +
          '        <div class="overline mb-4">OVERLINE</div>\n' +
          '        <v-list-item-title class="headline mb-1">Headline 5</v-list-item-title>\n' +
          '        <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>\n' +
          '      </v-list-item-content>\n' +
          '\n' +
          '      <v-list-item-avatar\n' +
          '        tile\n' +
          '        size="80"\n' +
          '        color="grey"\n' +
          '      ></v-list-item-avatar>\n' +
          '    </v-list-item>\n' +
          '\n' +
          '    <v-card-actions>\n' +
          '      <v-btn text>Button</v-btn>\n' +
          '      <v-btn text>Button</v-btn>\n' +
          '    </v-card-actions>\n' +
          '  </v-card>\n' +
          '</template>'
      }
    }
  }
</script>
