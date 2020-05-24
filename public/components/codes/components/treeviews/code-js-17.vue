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
          '      open: [\'public\'],\n' +
          '      files: {\n' +
          '        html: \'mdi-language-html5\',\n' +
          '        js: \'mdi-nodejs\',\n' +
          '        json: \'mdi-json\',\n' +
          '        md: \'mdi-markdown\',\n' +
          '        pdf: \'mdi-file-pdf\',\n' +
          '        png: \'mdi-file-image\',\n' +
          '        txt: \'mdi-file-document-outline\',\n' +
          '        xls: \'mdi-file-excel\',\n' +
          '      },\n' +
          '      tree: [],\n' +
          '      items: [\n' +
          '        {\n' +
          '          name: \'.git\',\n' +
          '        },\n' +
          '        {\n' +
          '          name: \'node_modules\',\n' +
          '        },\n' +
          '        {\n' +
          '          name: \'public\',\n' +
          '          children: [\n' +
          '            {\n' +
          '              name: \'static\',\n' +
          '              children: [{\n' +
          '                name: \'logo.png\',\n' +
          '                file: \'png\',\n' +
          '              }],\n' +
          '            },\n' +
          '            {\n' +
          '              name: \'favicon.ico\',\n' +
          '              file: \'png\',\n' +
          '            },\n' +
          '            {\n' +
          '              name: \'index.html\',\n' +
          '              file: \'html\',\n' +
          '            },\n' +
          '          ],\n' +
          '        },\n' +
          '        {\n' +
          '          name: \'.gitignore\',\n' +
          '          file: \'txt\',\n' +
          '        },\n' +
          '        {\n' +
          '          name: \'babel.config.js\',\n' +
          '          file: \'js\',\n' +
          '        },\n' +
          '        {\n' +
          '          name: \'package.json\',\n' +
          '          file: \'json\',\n' +
          '        },\n' +
          '        {\n' +
          '          name: \'README.md\',\n' +
          '          file: \'md\',\n' +
          '        },\n' +
          '        {\n' +
          '          name: \'vue.config.js\',\n' +
          '          file: \'js\',\n' +
          '        },\n' +
          '        {\n' +
          '          name: \'yarn.lock\',\n' +
          '          file: \'txt\',\n' +
          '        },\n' +
          '      ],\n' +
          '    }),\n' +
          '  }\n' +
          '<\/script>'
      }
    }
  }
</script>
