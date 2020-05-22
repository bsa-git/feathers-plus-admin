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
          '      selectionType: \'leaf\',\n' +
          '      selection: [],\n' +
          '      items: [\n' +
          '        {\n' +
          '          id: 1,\n' +
          '          name: \'Root\',\n' +
          '          children: [\n' +
          '            { id: 2, name: \'Child #1\' },\n' +
          '            { id: 3, name: \'Child #2\' },\n' +
          '            {\n' +
          '              id: 4,\n' +
          '              name: \'Child #3\',\n' +
          '              children: [\n' +
          '                { id: 5, name: \'Grandchild #1\' },\n' +
          '                { id: 6, name: \'Grandchild #2\' },\n' +
          '              ],\n' +
          '            },\n' +
          '          ],\n' +
          '        },\n' +
          '      ],\n' +
          '    }),\n' +
          '  }\n' +
          '<\/script>'
      }
    }
  }
</script>
