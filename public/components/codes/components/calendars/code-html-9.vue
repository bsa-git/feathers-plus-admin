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
          '  <v-row class="fill-height">\n' +
          '    <v-col>\n' +
          '      <v-sheet height="64">\n' +
          '        <v-toolbar flat color="white">\n' +
          '          <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">\n' +
          '            Today\n' +
          '          </v-btn>\n' +
          '          <v-btn fab text small color="grey darken-2" @click="prev">\n' +
          '            <v-icon small>mdi-chevron-left</v-icon>\n' +
          '          </v-btn>\n' +
          '          <v-btn fab text small color="grey darken-2" @click="next">\n' +
          '            <v-icon small>mdi-chevron-right</v-icon>\n' +
          '          </v-btn>\n' +
          '          <v-toolbar-title>{{ title }}</v-toolbar-title>\n' +
          '          <v-spacer></v-spacer>\n' +
          '          <v-menu bottom right>\n' +
          '            <template v-slot:activator="{ on }">\n' +
          '              <v-btn\n' +
          '                outlined\n' +
          '                color="grey darken-2"\n' +
          '                v-on="on"\n' +
          '              >\n' +
          '                <span>{{ typeToLabel[type] }}</span>\n' +
          '                <v-icon right>mdi-menu-down</v-icon>\n' +
          '              </v-btn>\n' +
          '            </template>\n' +
          '            <v-list>\n' +
          '              <v-list-item @click="type = \'day\'">\n' +
          '                <v-list-item-title>Day</v-list-item-title>\n' +
          '              </v-list-item>\n' +
          '              <v-list-item @click="type = \'week\'">\n' +
          '                <v-list-item-title>Week</v-list-item-title>\n' +
          '              </v-list-item>\n' +
          '              <v-list-item @click="type = \'month\'">\n' +
          '                <v-list-item-title>Month</v-list-item-title>\n' +
          '              </v-list-item>\n' +
          '              <v-list-item @click="type = \'4day\'">\n' +
          '                <v-list-item-title>4 days</v-list-item-title>\n' +
          '              </v-list-item>\n' +
          '            </v-list>\n' +
          '          </v-menu>\n' +
          '        </v-toolbar>\n' +
          '      </v-sheet>\n' +
          '      <v-sheet height="600">\n' +
          '        <v-calendar\n' +
          '          ref="calendar"\n' +
          '          v-model="focus"\n' +
          '          color="primary"\n' +
          '          :events="events"\n' +
          '          :event-color="getEventColor"\n' +
          '          :now="today"\n' +
          '          :type="type"\n' +
          '          @click:event="showEvent"\n' +
          '          @click:more="viewDay"\n' +
          '          @click:date="viewDay"\n' +
          '          @change="updateRange"\n' +
          '        ></v-calendar>\n' +
          '        <v-menu\n' +
          '          v-model="selectedOpen"\n' +
          '          :close-on-content-click="false"\n' +
          '          :activator="selectedElement"\n' +
          '          offset-x\n' +
          '        >\n' +
          '          <v-card\n' +
          '            color="grey lighten-4"\n' +
          '            min-width="350px"\n' +
          '            flat\n' +
          '          >\n' +
          '            <v-toolbar\n' +
          '              :color="selectedEvent.color"\n' +
          '              dark\n' +
          '            >\n' +
          '              <v-btn icon>\n' +
          '                <v-icon>mdi-pencil</v-icon>\n' +
          '              </v-btn>\n' +
          '              <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>\n' +
          '              <v-spacer></v-spacer>\n' +
          '              <v-btn icon>\n' +
          '                <v-icon>mdi-heart</v-icon>\n' +
          '              </v-btn>\n' +
          '              <v-btn icon>\n' +
          '                <v-icon>mdi-dots-vertical</v-icon>\n' +
          '              </v-btn>\n' +
          '            </v-toolbar>\n' +
          '            <v-card-text>\n' +
          '              <span v-html="selectedEvent.details"></span>\n' +
          '            </v-card-text>\n' +
          '            <v-card-actions>\n' +
          '              <v-btn\n' +
          '                text\n' +
          '                color="secondary"\n' +
          '                @click="selectedOpen = false"\n' +
          '              >\n' +
          '                Cancel\n' +
          '              </v-btn>\n' +
          '            </v-card-actions>\n' +
          '          </v-card>\n' +
          '        </v-menu>\n' +
          '      </v-sheet>\n' +
          '    </v-col>\n' +
          '  </v-row>\n' +
          '</template>'
      }
    }
  }
</script>
