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
          '    data () {\n' +
          '      return {\n' +
          '        labels: [\'SU\', \'MO\', \'TU\', \'WED\', \'TH\', \'FR\', \'SA\'],\n' +
          '        time: 0,\n' +
          '        forecast: [\n' +
          '          { day: \'Tuesday\', icon: \'mdi-white-balance-sunny\', temp: \'24\xB0/12\xB0\' },\n' +
          '          { day: \'Wednesday\', icon: \'mdi-white-balance-sunny\', temp: \'22\xB0/14\xB0\' },\n' +
          '          { day: \'Thursday\', icon: \'mdi-cloud\', temp: \'25\xB0/15\xB0\' },\n' +
          '        ],\n' +
          '      }\n' +
          '    },\n' +
          '  }\n' +
          '<\/script>'
      }
    }
  }
</script>
