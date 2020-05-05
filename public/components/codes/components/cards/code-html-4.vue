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
          '    <v-img\n' +
          '      class="white--text align-end"\n' +
          '      height="200px"\n' +
          '      src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"\n' +
          '    >\n' +
          '      <v-card-title>Top 10 Australian beaches</v-card-title>\n' +
          '    </v-img>\n' +
          '\n' +
          '    <v-card-subtitle class="pb-0">Number 10</v-card-subtitle>\n' +
          '\n' +
          '    <v-card-text class="text--primary">\n' +
          '      <div>Whitehaven Beach</div>\n' +
          '\n' +
          '      <div>Whitsunday Island, Whitsunday Islands</div>\n' +
          '    </v-card-text>\n' +
          '\n' +
          '    <v-card-actions>\n' +
          '      <v-btn\n' +
          '        color="orange"\n' +
          '        text\n' +
          '      >\n' +
          '        Share\n' +
          '      </v-btn>\n' +
          '\n' +
          '      <v-btn\n' +
          '        color="orange"\n' +
          '        text\n' +
          '      >\n' +
          '        Explore\n' +
          '      </v-btn>\n' +
          '    </v-card-actions>\n' +
          '  </v-card>\n' +
          '</template>'
      }
    }
  }
</script>
