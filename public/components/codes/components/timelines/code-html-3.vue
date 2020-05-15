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
          '  <v-timeline align-top :dense="$vuetify.breakpoint.smAndDown">\n' +
          '    <v-timeline-item\n' +
          '      v-for="(item, i) in items"\n' +
          '      :key="i"\n' +
          '      :color="item.color"\n' +
          '      :icon="item.icon"\n' +
          '      fill-dot\n' +
          '    >\n' +
          '      <v-card\n' +
          '        :color="item.color"\n' +
          '        dark\n' +
          '      >\n' +
          '        <v-card-title class="title">Lorem Ipsum Dolor</v-card-title>\n' +
          '        <v-card-text class="white text--primary">\n' +
          '          <p>Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.</p>\n' +
          '          <v-btn\n' +
          '            :color="item.color"\n' +
          '            class="mx-0"\n' +
          '            outlined\n' +
          '          >\n' +
          '            Button\n' +
          '          </v-btn>\n' +
          '        </v-card-text>\n' +
          '      </v-card>\n' +
          '    </v-timeline-item>\n' +
          '  </v-timeline>\n' +
          '</template>'
      }
    }
  }
</script>
