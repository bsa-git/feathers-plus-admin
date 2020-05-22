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
          '          name: \'Applications :\',\n' +
          '          locked: true,\n' +
          '          children: [\n' +
          '            { id: 2, name: \'Calendar : app\' },\n' +
          '            { id: 3, name: \'Chrome : app\' },\n' +
          '            { id: 4, name: \'Webstorm : app\' },\n' +
          '          ],\n' +
          '        },\n' +
          '        {\n' +
          '          id: 5,\n' +
          '          name: \'Documents :\',\n' +
          '          children: [\n' +
          '            {\n' +
          '              id: 6,\n' +
          '              name: \'vuetify :\',\n' +
          '              children: [\n' +
          '                {\n' +
          '                  id: 7,\n' +
          '                  name: \'src :\',\n' +
          '                  locked: true,\n' +
          '                  children: [\n' +
          '                    { id: 8, name: \'index : ts\' },\n' +
          '                    { id: 9, name: \'bootstrap : ts\' },\n' +
          '                  ],\n' +
          '                },\n' +
          '              ],\n' +
          '            },\n' +
          '            {\n' +
          '              id: 10,\n' +
          '              name: \'material2 :\',\n' +
          '              children: [\n' +
          '                {\n' +
          '                  id: 11,\n' +
          '                  name: \'src :\',\n' +
          '                  children: [\n' +
          '                    { id: 12, name: \'v-btn : ts\' },\n' +
          '                    { id: 13, name: \'v-card : ts\' },\n' +
          '                    { id: 14, name: \'v-window : ts\' },\n' +
          '                  ],\n' +
          '                },\n' +
          '              ],\n' +
          '            },\n' +
          '          ],\n' +
          '        },\n' +
          '        {\n' +
          '          id: 15,\n' +
          '          name: \'Downloads :\',\n' +
          '          children: [\n' +
          '            { id: 16, name: \'October : pdf\', locked: true },\n' +
          '            { id: 17, name: \'November : pdf\', locked: true },\n' +
          '            { id: 18, name: \'Tutorial : html\', locked: true },\n' +
          '          ],\n' +
          '        },\n' +
          '        {\n' +
          '          id: 19,\n' +
          '          name: \'Videos :\',\n' +
          '          children: [\n' +
          '            {\n' +
          '              id: 20,\n' +
          '              name: \'Tutorials :\',\n' +
          '              children: [\n' +
          '                { id: 21, name: \'Basic layouts : mp4\' },\n' +
          '                { id: 22, name: \'Advanced techniques : mp4\' },\n' +
          '                { id: 23, name: \'All about app : dir\' },\n' +
          '              ],\n' +
          '            },\n' +
          '            { id: 24, name: \'Intro : mov\' },\n' +
          '            { id: 25, name: \'Conference introduction : avi\' },\n' +
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
