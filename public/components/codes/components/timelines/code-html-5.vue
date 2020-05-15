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
          '    <v-switch v-model="reverse" label="Toggle reverse"></v-switch>\n' +
          '    <v-timeline :reverse="reverse" :dense="$vuetify.breakpoint.smAndDown">\n' +
          '      <v-timeline-item\n' +
          '        v-for="n in 2"\n' +
          '        :key="n"\n' +
          '      >\n' +
          '        <span slot="opposite">Tus eu perfecto</span>\n' +
          '        <v-card class="elevation-2">\n' +
          '          <v-card-title class="headline">Lorem ipsum</v-card-title>\n' +
          '          <v-card-text>\n' +
          '            Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.\n' +
          '          </v-card-text>\n' +
          '        </v-card>\n' +
          '      </v-timeline-item>\n' +
          '    </v-timeline>\n' +
          '    <v-timeline :reverse="reverse" dense>\n' +
          '      <v-timeline-item\n' +
          '        v-for="n in 2"\n' +
          '        :key="n"\n' +
          '      >\n' +
          '        <span slot="opposite">Tus eu perfecto</span>\n' +
          '        <v-card class="elevation-2">\n' +
          '          <v-card-title class="headline">Lorem ipsum</v-card-title>\n' +
          '          <v-card-text>\n' +
          '            Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.\n' +
          '          </v-card-text>\n' +
          '        </v-card>\n' +
          '      </v-timeline-item>\n' +
          '    </v-timeline>\n' +
          '  </div>\n' +
          '</template>'
      }
    }
  }
</script>
