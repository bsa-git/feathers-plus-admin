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
          '  >\n' +
          '    <v-card-text>\n' +
          '      <div>Word of the Day</div>\n' +
          '      <p class="display-1 text--primary">\n' +
          '        be•nev•o•lent\n' +
          '      </p>\n' +
          '      <p>adjective</p>\n' +
          '      <div class="text--primary">\n' +
          '        well meaning and kindly.<br>\n' +
          '        "a benevolent smile"\n' +
          '      </div>\n' +
          '    </v-card-text>\n' +
          '    <v-card-actions>\n' +
          '      <v-btn\n' +
          '        text\n' +
          '        color="deep-purple accent-4"\n' +
          '      >\n' +
          '        Learn More\n' +
          '      </v-btn>\n' +
          '    </v-card-actions>\n' +
          '  </v-card>\n' +
          '</template>'
      }
    }
  }
</script>
