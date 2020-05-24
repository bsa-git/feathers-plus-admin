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
          '          id: 1,\n' +
          '          name: \'Vuetify Human Resources\',\n' +
          '          children: [\n' +
          '            {\n' +
          '              id: 2,\n' +
          '              name: \'Core team\',\n' +
          '              children: [\n' +
          '                {\n' +
          '                  id: 201,\n' +
          '                  name: \'John\',\n' +
          '                },\n' +
          '                {\n' +
          '                  id: 202,\n' +
          '                  name: \'Kael\',\n' +
          '                },\n' +
          '                {\n' +
          '                  id: 203,\n' +
          '                  name: \'Nekosaur\',\n' +
          '                },\n' +
          '                {\n' +
          '                  id: 204,\n' +
          '                  name: \'Jacek\',\n' +
          '                },\n' +
          '                {\n' +
          '                  id: 205,\n' +
          '                  name: \'Andrew\',\n' +
          '                },\n' +
          '              ],\n' +
          '            },\n' +
          '            {\n' +
          '              id: 3,\n' +
          '              name: \'Administrators\',\n' +
          '              children: [\n' +
          '                {\n' +
          '                  id: 301,\n' +
          '                  name: \'Ranee\',\n' +
          '                },\n' +
          '                {\n' +
          '                  id: 302,\n' +
          '                  name: \'Rachel\',\n' +
          '                },\n' +
          '              ],\n' +
          '            },\n' +
          '            {\n' +
          '              id: 4,\n' +
          '              name: \'Contributors\',\n' +
          '              children: [\n' +
          '                {\n' +
          '                  id: 401,\n' +
          '                  name: \'Phlow\',\n' +
          '                },\n' +
          '                {\n' +
          '                  id: 402,\n' +
          '                  name: \'Brandon\',\n' +
          '                },\n' +
          '                {\n' +
          '                  id: 403,\n' +
          '                  name: \'Sean\',\n' +
          '                },\n' +
          '              ],\n' +
          '            },\n' +
          '          ],\n' +
          '        },\n' +
          '      ],\n' +
          '      open: [1, 2],\n' +
          '      search: null,\n' +
          '      caseSensitive: false,\n' +
          '    }),\n' +
          '    computed: {\n' +
          '      filter () {\n' +
          '        return this.caseSensitive\n' +
          '          ? (item, search, textKey) => item[textKey].indexOf(search) > -1\n' +
          '          : undefined\n' +
          '      },\n' +
          '    },\n' +
          '  }\n' +
          '<\/script>'
      }
    }
  }
</script>
