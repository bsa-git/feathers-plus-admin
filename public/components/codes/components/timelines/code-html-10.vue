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
          '  <v-timeline>\n' +
          '    <v-timeline-item\n' +
          '      v-for="(year, i) in years"\n' +
          '      :key="i"\n' +
          '      :color="year.color"\n' +
          '      small\n' +
          '    >\n' +
          '      <template v-slot:opposite>\n' +
          '        <span\n' +
          '          :class="`headline font-weight-bold ${year.color}--text`"\n' +
          '          v-text="year.year"\n' +
          '        ></span>\n' +
          '      </template>\n' +
          '      <div class="py-4">\n' +
          '        <h2 :class="`headline font-weight-light mb-4 ${year.color}--text`">Lorem ipsum</h2>\n' +
          '        <div>\n' +
          '          Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.\n' +
          '        </div>\n' +
          '      </div>\n' +
          '    </v-timeline-item>\n' +
          '  </v-timeline>\n' +
          '</template>'
      }
    }
  }
</script>
