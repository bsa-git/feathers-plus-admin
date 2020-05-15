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
          '      years: [\n' +
          '        {\n' +
          '          color: \'cyan\',\n' +
          '          year: \'1960\',\n' +
          '        },\n' +
          '        {\n' +
          '          color: \'green\',\n' +
          '          year: \'1970\',\n' +
          '        },\n' +
          '        {\n' +
          '          color: \'pink\',\n' +
          '          year: \'1980\',\n' +
          '        },\n' +
          '        {\n' +
          '          color: \'amber\',\n' +
          '          year: \'1990\',\n' +
          '        },\n' +
          '        {\n' +
          '          color: \'orange\',\n' +
          '          year: \'2000\',\n' +
          '        },\n' +
          '      ],\n' +
          '    }),\n' +
          '  }\n' +
          '<\/script>'
      }
    }
  }
</script>
