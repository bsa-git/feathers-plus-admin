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
          '      item: 0,\n' +
          '      items: [\n' +
          '        { text: \'My Files\', icon: \'mdi-folder\' },\n' +
          '        { text: \'Shared with me\', icon: \'mdi-account-multiple\' },\n' +
          '        { text: \'Starred\', icon: \'mdi-star\' },\n' +
          '        { text: \'Recent\', icon: \'mdi-history\' },\n' +
          '        { text: \'Offline\', icon: \'mdi-check-circle\' },\n' +
          '        { text: \'Uploads\', icon: \'mdi-upload\' },\n' +
          '        { text: \'Backups\', icon: \'mdi-cloud-upload\' },\n' +
          '      ],\n' +
          '    }),\n' +
          '  }\n' +
          '<\/script>'
      }
    }
  }
</script>
