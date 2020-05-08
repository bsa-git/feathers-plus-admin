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
          '      item: 1,\n' +
          '      items: [\n' +
          '        { text: \'Real-Time\', icon: \'mdi-clock\' },\n' +
          '        { text: \'Audience\', icon: \'mdi-account\' },\n' +
          '        { text: \'Conversions\', icon: \'mdi-flag\' },\n' +
          '      ],\n' +
          '    }),\n' +
          '  }\n' +
          '<\/script>'
      }
    }
  }
</script>
