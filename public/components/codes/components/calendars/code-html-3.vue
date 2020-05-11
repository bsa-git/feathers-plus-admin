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
          '  <v-row>\n' +
          '    <v-col>\n' +
          '      <v-sheet height="400">\n' +
          '        <v-calendar\n' +
          '          ref="calendar"\n' +
          '          :now="today"\n' +
          '          :value="today"\n' +
          '          :events="events"\n' +
          '          color="primary"\n' +
          '          type="week"\n' +
          '        ></v-calendar>\n' +
          '      </v-sheet>\n' +
          '    </v-col>\n' +
          '  </v-row>\n' +
          '</template>'
      }
    }
  }
</script>
