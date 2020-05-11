<template>
  <div>
    {{ code }}
  </div>
</template>

<script>
  export default {
    data() {
      return {
        code: '<script>\n' +
          '  export default {\n' +
          '    data: () => ({\n' +
          '      today: \'2019-01-08\',\n' +
          '      events: [\n' +
          '        {\n' +
          '          name: \'Weekly Meeting\',\n' +
          '          start: \'2019-01-07 09:00\',\n' +
          '          end: \'2019-01-07 10:00\',\n' +
          '        },\n' +
          '        {\n' +
          '          name: \'Thomas\' Birthday\',\n' +
      '          start: \'2019-01-10\',\n' +
      '        },\n' +
      '        {\n' +
      '          name: \'Mash Potatoes\',\n' +
      '          start: \'2019-01-09 12:30\',\n' +
      '          end: \'2019-01-09 15:30\',\n' +
      '        },\n' +
      '      ],\n' +
      '    }),\n' +
      '    mounted () {\n' +
      '      this.$refs.calendar.scrollToTime(\'08:00\')\n' +
      '    },\n' +
      '  }\n' +
      '<\/script>'
      }
    }
  }
</script>
