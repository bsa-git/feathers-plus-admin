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
          '      items: [\n' +
          '        {\n' +
          '          color: \'red lighten-2\',\n' +
          '          icon: \'mdi-star\',\n' +
          '        },\n' +
          '        {\n' +
          '          color: \'purple darken-1\',\n' +
          '          icon: \'mdi-book-variant\',\n' +
          '        },\n' +
          '        {\n' +
          '          color: \'green lighten-1\',\n' +
          '          icon: \'mdi-airballoon\',\n' +
          '        },\n' +
          '        {\n' +
          '          color: \'indigo\',\n' +
          '          icon: \'mdi-buffer\',\n' +
          '        },\n' +
          '      ],\n' +
          '    }),\n' +
          '  }\n' +
          '<\/script>'
      }
    }
  }
</script>
