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
          '    <v-card\n' +
          '      dark\n' +
          '      flat\n' +
          '    >\n' +
          '      <v-btn\n' +
          '        absolute\n' +
          '        bottom\n' +
          '        color="pink"\n' +
          '        right\n' +
          '        fab\n' +
          '      >\n' +
          '        <v-icon>mdi-plus</v-icon>\n' +
          '      </v-btn>\n' +
          '      <v-card-title class="pa-2 purple lighten-3">\n' +
          '        <v-btn icon>\n' +
          '          <v-icon>mdi-menu</v-icon>\n' +
          '        </v-btn>\n' +
          '        <h3 class="title font-weight-light text-center grow">Timeline</h3>\n' +
          '        <v-avatar>\n' +
          '          <v-img src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight"></v-img>\n' +
          '        </v-avatar>\n' +
          '      </v-card-title>\n' +
          '      <v-img\n' +
          '        src="https://cdn.vuetifyjs.com/images/cards/forest.jpg"\n' +
          '        gradient="to top, rgba(0,0,0,.44), rgba(0,0,0,.44)"\n' +
          '      >\n' +
          '        <v-container class="fill-height">\n' +
          '          <v-row align="center">\n' +
          '            <strong class="display-4 font-weight-regular mr-6">8</strong>\n' +
          '            <v-row justify="end">\n' +
          '              <div class="headline font-weight-light">Monday</div>\n' +
          '              <div class="text-uppercase font-weight-light">February 2015</div>\n' +
          '            </v-row>\n' +
          '          </v-row>\n' +
          '        </v-container>\n' +
          '      </v-img>\n' +
          '    </v-card>\n' +
          '    <v-card-text class="py-0">\n' +
          '      <v-timeline\n' +
          '        align-top\n' +
          '        dense\n' +
          '      >\n' +
          '        <v-timeline-item\n' +
          '          color="pink"\n' +
          '          small\n' +
          '        >\n' +
          '          <v-row class="pt-1">\n' +
          '            <v-col cols="3">\n' +
          '              <strong>5pm</strong>\n' +
          '            </v-col>\n' +
          '            <v-col>\n' +
          '              <strong>New Icon</strong>\n' +
          '              <div class="caption">Mobile App</div>\n' +
          '            </v-col>\n' +
          '          </v-row>\n' +
          '        </v-timeline-item>\n' +
          '\n' +
          '        <v-timeline-item\n' +
          '          color="teal lighten-3"\n' +
          '          small\n' +
          '        >\n' +
          '          <v-row class="pt-1">\n' +
          '            <v-col cols="3">\n' +
          '              <strong>3-4pm</strong>\n' +
          '            </v-col>\n' +
          '            <v-col>\n' +
          '              <strong>Design Stand Up</strong>\n' +
          '              <div class="caption mb-2">Hangouts</div>\n' +
          '              <v-avatar>\n' +
          '                <v-img\n' +
          '                  :src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairFrida"\n' +
          '                ></v-img>\n' +
          '              </v-avatar>\n' +
          '              <v-avatar>\n' +
          '\n' +
          '                <v-img\n' +
          '                  :src="https://avataaars.io/?avatarStyle=Circle&topType=ShortHairFrizzle"\n' +
          '                ></v-img>\n' +
          '              </v-avatar>\n' +
          '              <v-avatar>\n' +
          '                <v-img\n' +
          '                  :src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairMiaWallace"\n' +
          '                ></v-img>\n' +
          '              </v-avatar>\n' +
          '            </v-col>\n' +
          '          </v-row>\n' +
          '        </v-timeline-item>\n' +
          '\n' +
          '        <v-timeline-item\n' +
          '          color="pink"\n' +
          '          small\n' +
          '        >\n' +
          '          <v-row class="pt-1">\n' +
          '            <v-col cols="3">\n' +
          '              <strong>12pm</strong>\n' +
          '            </v-col>\n' +
          '            <v-col>\n' +
          '              <strong>Lunch break</strong>\n' +
          '            </v-col>\n' +
          '          </v-row>\n' +
          '        </v-timeline-item>\n' +
          '\n' +
          '        <v-timeline-item\n' +
          '          color="teal lighten-3"\n' +
          '          small\n' +
          '        >\n' +
          '          <v-row class="pt-1">\n' +
          '            <v-col cols="3">\n' +
          '              <strong>9-11am</strong>\n' +
          '            </v-col>\n' +
          '            <v-col>\n' +
          '              <strong>Finish Home Screen</strong>\n' +
          '              <div class="caption">Web App</div>\n' +
          '            </v-col>\n' +
          '          </v-row>\n' +
          '        </v-timeline-item>\n' +
          '      </v-timeline>\n' +
          '    </v-card-text>\n' +
          '  </v-card>\n' +
          '</template>'
      }
    }
  }
</script>
