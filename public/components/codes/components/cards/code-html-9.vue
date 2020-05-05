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
          '    <v-img\n' +
          '      src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"\n' +
          '      height="200px"\n' +
          '    ></v-img>\n' +
          '\n' +
          '    <v-card-title>\n' +
          '      Top western road trips\n' +
          '    </v-card-title>\n' +
          '\n' +
          '    <v-card-subtitle>\n' +
          '      1,000 miles of wonder\n' +
          '    </v-card-subtitle>\n' +
          '\n' +
          '    <v-card-actions>\n' +
          '      <v-btn text>Share</v-btn>\n' +
          '\n' +
          '      <v-btn\n' +
          '        color="purple"\n' +
          '        text\n' +
          '      >\n' +
          '        Explore\n' +
          '      </v-btn>\n' +
          '\n' +
          '      <v-spacer></v-spacer>\n' +
          '\n' +
          '      <v-btn\n' +
          '        icon\n' +
          '        @click="show = !show"\n' +
          '      >\n' +
          '        <v-icon>{{ show ? \'mdi-chevron-up\' : \'mdi-chevron-down\' }}</v-icon>\n' +
          '      </v-btn>\n' +
          '    </v-card-actions>\n' +
          '\n' +
          '    <v-expand-transition>\n' +
          '      <div v-show="show">\n' +
          '        <v-divider></v-divider>\n' +
          '\n' +
          '        <v-card-text>\n' +
          '          I\'m a thing. But, like most politicians, he promised more than he could deliver. You won\'t have time for sleeping, soldier, not with all the bed making you\'ll be doing. Then we\'ll go with that data file! Hey, you add a one and two zeros to that or we walk! You\'re going to do his laundry? I\'ve got to find a way to escape.\n' +
          '        </v-card-text>\n' +
          '      </div>\n' +
          '    </v-expand-transition>\n' +
          '  </v-card>\n' +
          '</template>'
      }
    }
  }
</script>
