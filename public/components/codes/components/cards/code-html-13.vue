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
          '    :loading="loading"\n' +
          '    class="mx-auto my-12"\n' +
          '    max-width="374"\n' +
          '  >\n' +
          '    <v-img\n' +
          '      height="250"\n' +
          '      src="https://cdn.vuetifyjs.com/images/cards/cooking.png"\n' +
          '    ></v-img>\n' +
          '\n' +
          '    <v-card-title>Cafe Badilico</v-card-title>\n' +
          '\n' +
          '    <v-card-text>\n' +
          '      <v-row\n' +
          '        align="center"\n' +
          '        class="mx-0"\n' +
          '      >\n' +
          '        <v-rating\n' +
          '          :value="4.5"\n' +
          '          color="amber"\n' +
          '          dense\n' +
          '          half-increments\n' +
          '          readonly\n' +
          '          size="14"\n' +
          '        ></v-rating>\n' +
          '\n' +
          '        <div class="grey--text ml-4">4.5 (413)</div>\n' +
          '      </v-row>\n' +
          '\n' +
          '      <div class="my-4 subtitle-1">\n' +
          '        $ • Italian, Cafe\n' +
          '      </div>\n' +
          '\n' +
          '      <div>Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.</div>\n' +
          '    </v-card-text>\n' +
          '\n' +
          '    <v-divider class="mx-4"></v-divider>\n' +
          '\n' +
          '    <v-card-title>Tonight\'s availability</v-card-title>\n' +
          '\n' +
          '    <v-card-text>\n' +
          '      <v-chip-group\n' +
          '        v-model="selection"\n' +
          '        active-class="deep-purple accent-4 white--text"\n' +
          '        column\n' +
          '      >\n' +
          '        <v-chip>5:30PM</v-chip>\n' +
          '\n' +
          '        <v-chip>7:30PM</v-chip>\n' +
          '\n' +
          '        <v-chip>8:00PM</v-chip>\n' +
          '\n' +
          '        <v-chip>9:00PM</v-chip>\n' +
          '      </v-chip-group>\n' +
          '    </v-card-text>\n' +
          '\n' +
          '    <v-card-actions>\n' +
          '      <v-btn\n' +
          '        color="deep-purple lighten-2"\n' +
          '        text\n' +
          '        @click="reserve"\n' +
          '      >\n' +
          '        Reserve\n' +
          '      </v-btn>\n' +
          '    </v-card-actions>\n' +
          '  </v-card>\n' +
          '</template>'
      }
    }
  }
</script>
