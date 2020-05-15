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
          '    max-width="600"\n' +
          '  >\n' +
          '    <v-card-title\n' +
          '      class="blue-grey white--text"\n' +
          '    >\n' +
          '      <span class="title">Logs</span>\n' +
          '      <v-spacer></v-spacer>\n' +
          '      <v-btn\n' +
          '        :outlined="interval == null"\n' +
          '        :color="interval == null ? \'white\' : \'primary\'"\n' +
          '        dark\n' +
          '        depressed\n' +
          '        @click="interval == null ? start() : stop()"\n' +
          '      >\n' +
          '        Realtime Logging\n' +
          '      </v-btn>\n' +
          '    </v-card-title>\n' +
          '    <v-card-text class="py-0">\n' +
          '      <v-timeline dense>\n' +
          '        <v-slide-x-reverse-transition\n' +
          '          group\n' +
          '          hide-on-leave\n' +
          '        >\n' +
          '          <v-timeline-item\n' +
          '            v-for="item in items"\n' +
          '            :key="item.id"\n' +
          '            :color="item.color"\n' +
          '            small\n' +
          '            fill-dot\n' +
          '          >\n' +
          '            <v-alert\n' +
          '              :value="true"\n' +
          '              :color="item.color"\n' +
          '              :icon="item.icon"\n' +
          '              class="white--text"\n' +
          '            >\n' +
          '              Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.\n' +
          '            </v-alert>\n' +
          '          </v-timeline-item>\n' +
          '        </v-slide-x-reverse-transition>\n' +
          '      </v-timeline>\n' +
          '    </v-card-text>\n' +
          '  </v-card>\n' +
          '</template>'
      }
    }
  }
</script>
