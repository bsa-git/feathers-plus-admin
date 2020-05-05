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
          '    <v-list-item two-line>\n' +
          '      <v-list-item-content>\n' +
          '        <v-list-item-title class="headline">San Francisco</v-list-item-title>\n' +
          '        <v-list-item-subtitle>Mon, 12:30 PM, Mostly sunny</v-list-item-subtitle>\n' +
          '      </v-list-item-content>\n' +
          '    </v-list-item>\n' +
          '\n' +
          '    <v-card-text>\n' +
          '      <v-row align="center">\n' +
          '        <v-col class="display-3" cols="6">\n' +
          '          23&deg;C\n' +
          '        </v-col>\n' +
          '        <v-col cols="6">\n' +
          '          <v-img\n' +
          '            src="https://cdn.vuetifyjs.com/images/cards/sun.png"\n' +
          '            alt="Sunny image"\n' +
          '            width="92"\n' +
          '          ></v-img>\n' +
          '        </v-col>\n' +
          '      </v-row>\n' +
          '    </v-card-text>\n' +
          '\n' +
          '    <v-list-item>\n' +
          '      <v-list-item-icon>\n' +
          '        <v-icon>mdi-send</v-icon>\n' +
          '      </v-list-item-icon>\n' +
          '      <v-list-item-subtitle>23 km/h</v-list-item-subtitle>\n' +
          '    </v-list-item>\n' +
          '\n' +
          '    <v-list-item>\n' +
          '      <v-list-item-icon>\n' +
          '        <v-icon>mdi-cloud-download</v-icon>\n' +
          '      </v-list-item-icon>\n' +
          '      <v-list-item-subtitle>48%</v-list-item-subtitle>\n' +
          '    </v-list-item>\n' +
          '\n' +
          '    <v-slider\n' +
          '      v-model="time"\n' +
          '      :max="6"\n' +
          '      :tick-labels="labels"\n' +
          '      class="mx-4"\n' +
          '      ticks\n' +
          '    ></v-slider>\n' +
          '\n' +
          '    <v-list class="transparent">\n' +
          '      <v-list-item\n' +
          '        v-for="item in forecast"\n' +
          '        :key="item.day"\n' +
          '      >\n' +
          '        <v-list-item-title>{{ item.day }}</v-list-item-title>\n' +
          '\n' +
          '        <v-list-item-icon>\n' +
          '          <v-icon>{{ item.icon }}</v-icon>\n' +
          '        </v-list-item-icon>\n' +
          '\n' +
          '        <v-list-item-subtitle class="text-right">\n' +
          '          {{ item.temp }}\n' +
          '        </v-list-item-subtitle>\n' +
          '      </v-list-item>\n' +
          '    </v-list>\n' +
          '\n' +
          '    <v-divider></v-divider>\n' +
          '\n' +
          '    <v-card-actions>\n' +
          '      <v-btn text>Full Report</v-btn>\n' +
          '    </v-card-actions>\n' +
          '  </v-card>\n' +
          '</template>'
      }
    }
  }
</script>
