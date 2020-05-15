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
          '  <v-timeline :dense="$vuetify.breakpoint.smAndDown">\n' +
          '    <v-timeline-item\n' +
          '      color="purple lighten-2"\n' +
          '      fill-dot\n' +
          '      right\n' +
          '    >\n' +
          '      <v-card>\n' +
          '        <v-card-title class="purple lighten-2">\n' +
          '          <v-icon\n' +
          '            dark\n' +
          '            size="42"\n' +
          '            class="mr-4"\n' +
          '          >\n' +
          '            mdi-magnify\n' +
          '          </v-icon>\n' +
          '          <h2 class="display-1 white--text font-weight-light">Title 1</h2>\n' +
          '        </v-card-title>\n' +
          '        <v-container>\n' +
          '          <v-row>\n' +
          '            <v-col cols="12" md="10">\n' +
          '              Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit.\n' +
          '            </v-col>\n' +
          '            <v-col\n' +
          '              class="hidden-sm-and-down text-right"\n' +
          '              md="2"\n' +
          '            >\n' +
          '              <v-icon size="64">mdi-calendar-text</v-icon>\n' +
          '            </v-col>\n' +
          '          </v-row>\n' +
          '        </v-container>\n' +
          '      </v-card>\n' +
          '    </v-timeline-item>\n' +
          '\n' +
          '    <v-timeline-item\n' +
          '      color="amber lighten-1"\n' +
          '      fill-dot\n' +
          '      left\n' +
          '      small\n' +
          '    >\n' +
          '      <v-card>\n' +
          '        <v-card-title class="amber lighten-1 justify-end">\n' +
          '          <h2 class="display-1 mr-4 white--text font-weight-light">Title 2</h2>\n' +
          '          <v-icon\n' +
          '            dark\n' +
          '            size="42"\n' +
          '          >mdi-home-outline</v-icon>\n' +
          '        </v-card-title>\n' +
          '        <v-container>\n' +
          '          <v-row>\n' +
          '            <v-col cols="12" md="8">\n' +
          '              Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit.\n' +
          '            </v-col>\n' +
          '            <v-col cols="12" md="4">\n' +
          '              Lorem ipsum dolor sit amet, no nam oblique veritus.\n' +
          '            </v-col>\n' +
          '          </v-row>\n' +
          '        </v-container>\n' +
          '      </v-card>\n' +
          '    </v-timeline-item>\n' +
          '\n' +
          '    <v-timeline-item\n' +
          '      color="cyan lighten-1"\n' +
          '      fill-dot\n' +
          '      right\n' +
          '    >\n' +
          '      <v-card>\n' +
          '        <v-card-title class="cyan lighten-1">\n' +
          '          <v-icon\n' +
          '            class="mr-4"\n' +
          '            dark\n' +
          '            size="42"\n' +
          '          >\n' +
          '            mdi-email-outline\n' +
          '          </v-icon>\n' +
          '          <h2 class="display-1 white--text font-weight-light">Title 3</h2>\n' +
          '        </v-card-title>\n' +
          '        <v-container>\n' +
          '          <v-row>\n' +
          '            <v-col\n' +
          '              v-for="n in 3"\n' +
          '              :key="n"\n' +
          '              cols="12"\n' +
          '              md="4"\n' +
          '            >\n' +
          '              Lorem ipsum dolor sit amet, no nam oblique veritus no nam oblique.\n' +
          '            </v-col>\n' +
          '          </v-row>\n' +
          '        </v-container>\n' +
          '      </v-card>\n' +
          '    </v-timeline-item>\n' +
          '\n' +
          '    <v-timeline-item\n' +
          '      color="red lighten-1"\n' +
          '      fill-dot\n' +
          '      left\n' +
          '      small\n' +
          '    >\n' +
          '      <v-card>\n' +
          '        <v-card-title class="red lighten-1 justify-end">\n' +
          '          <h2 class="display-1 mr-4 white--text font-weight-light">Title 4</h2>\n' +
          '          <v-icon\n' +
          '            dark\n' +
          '            size="42"\n' +
          '          >\n' +
          '            mdi-account-multiple-outline\n' +
          '          </v-icon>\n' +
          '        </v-card-title>\n' +
          '        <v-container>\n' +
          '          <v-row>\n' +
          '            <v-col class="hidden-sm-and-down" md="2">\n' +
          '              <v-icon size="64">mdi-server-network</v-icon>\n' +
          '            </v-col>\n' +
          '            <v-col cols="12" md="10">\n' +
          '              Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus.\n' +
          '            </v-col>\n' +
          '          </v-row>\n' +
          '        </v-container>\n' +
          '      </v-card>\n' +
          '    </v-timeline-item>\n' +
          '\n' +
          '    <v-timeline-item\n' +
          '      color="green lighten-1"\n' +
          '      fill-dot\n' +
          '      right\n' +
          '    >\n' +
          '      <v-card>\n' +
          '        <v-card-title class="green lighten-1">\n' +
          '          <v-icon\n' +
          '            class="mr-4"\n' +
          '            dark\n' +
          '            size="42"\n' +
          '          >\n' +
          '            mdi-phone-in-talk\n' +
          '          </v-icon>\n' +
          '          <h2 class="display-1 white--text font-weight-light">Title 5</h2>\n' +
          '        </v-card-title>\n' +
          '        <v-container>\n' +
          '          <v-row>\n' +
          '            <v-col>\n' +
          '              Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.\n' +
          '            </v-col>\n' +
          '          </v-row>\n' +
          '        </v-container>\n' +
          '      </v-card>\n' +
          '    </v-timeline-item>\n' +
          '  </v-timeline>\n' +
          '</template>'
      }
    }
  }
</script>
