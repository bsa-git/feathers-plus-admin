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
          '      v-for="n in 4"\n' +
          '      :key="n"\n' +
          '      large\n' +
          '    >\n' +
          '      <template v-slot:icon>\n' +
          '        <v-avatar>\n' +
          '          <img src="http://i.pravatar.cc/64">\n' +
          '        </v-avatar>\n' +
          '      </template>\n' +
          '      <template v-slot:opposite>\n' +
          '        <span>Tus eu perfecto</span>\n' +
          '      </template>\n' +
          '      <v-card class="elevation-2">\n' +
          '        <v-card-title class="headline">Lorem ipsum</v-card-title>\n' +
          '        <v-card-text>Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.</v-card-text>\n' +
          '      </v-card>\n' +
          '    </v-timeline-item>\n' +
          '  </v-timeline>\n' +
          '</template>'
      }
    }
  }
</script>
