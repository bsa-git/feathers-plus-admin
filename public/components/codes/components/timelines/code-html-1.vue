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
          '    <v-timeline-item>timeline item</v-timeline-item>\n' +
          '    <v-timeline-item class="text-right">timeline item</v-timeline-item>\n' +
          '    <v-timeline-item>timeline item</v-timeline-item>\n' +
          '  </v-timeline>\n' +
          '</template>'
      }
    }
  }
</script>
