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
          '      admins: [\n' +
          '        [\'Management\', \'people_outline\'],\n' +
          '        [\'Settings\', \'settings\'],\n' +
          '      ],\n' +
          '      cruds: [\n' +
          '        [\'Create\', \'add\'],\n' +
          '        [\'Read\', \'insert_drive_file\'],\n' +
          '        [\'Update\', \'update\'],\n' +
          '        [\'Delete\', \'delete\'],\n' +
          '      ],\n' +
          '    }),\n' +
          '  }\n' +
          '<\/script>'
      }
    }
  }
</script>
