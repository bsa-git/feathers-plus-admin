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
          '  <div>\n' +
          '    <v-sheet\n' +
          '      tile\n' +
          '      height="54"\n' +
          '      color="grey lighten-3"\n' +
          '      class="d-flex"\n' +
          '    >\n' +
          '      <v-btn\n' +
          '        icon\n' +
          '        class="ma-2"\n' +
          '        @click="$refs.calendar.prev()"\n' +
          '      >\n' +
          '        <v-icon>mdi-chevron-left</v-icon>\n' +
          '      </v-btn>\n' +
          '      <v-select\n' +
          '        v-model="type"\n' +
          '        :items="types"\n' +
          '        dense\n' +
          '        outlined\n' +
          '        hide-details\n' +
          '        class="ma-2"\n' +
          '        label="type"\n' +
          '      ></v-select>\n' +
          '      <v-select\n' +
          '        v-model="mode"\n' +
          '        :items="modes"\n' +
          '        dense\n' +
          '        outlined\n' +
          '        hide-details\n' +
          '        label="event-overlap-mode"\n' +
          '        class="ma-2"\n' +
          '      ></v-select>\n' +
          '      <v-select\n' +
          '        v-model="weekday"\n' +
          '        :items="weekdays"\n' +
          '        dense\n' +
          '        outlined\n' +
          '        hide-details\n' +
          '        label="weekdays"\n' +
          '        class="ma-2"\n' +
          '      ></v-select>\n' +
          '      <v-spacer></v-spacer>\n' +
          '      <v-btn\n' +
          '        icon\n' +
          '        class="ma-2"\n' +
          '        @click="$refs.calendar.next()"\n' +
          '      >\n' +
          '        <v-icon>mdi-chevron-right</v-icon>\n' +
          '      </v-btn>\n' +
          '    </v-sheet>\n' +
          '    <v-sheet height="600">\n' +
          '      <v-calendar\n' +
          '        ref="calendar"\n' +
          '        v-model="value"\n' +
          '        :weekdays="weekday"\n' +
          '        :type="type"\n' +
          '        :events="events"\n' +
          '        :event-overlap-mode="mode"\n' +
          '        :event-overlap-threshold="30"\n' +
          '        :event-color="getEventColor"\n' +
          '        @change="getEvents"\n' +
          '      ></v-calendar>\n' +
          '    </v-sheet>\n' +
          '  </div>\n' +
          '</template>'
      }
    }
  }
</script>
