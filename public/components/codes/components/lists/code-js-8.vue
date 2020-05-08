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
          '        items: [\n' +
          '          { icon: true, title: \'Jason Oner\', avatar: \'https://cdn.vuetifyjs.com/images/lists/1.jpg\' },\n' +
          '          { title: \'Travis Howard\', avatar: \'https://cdn.vuetifyjs.com/images/lists/2.jpg\' },\n' +
          '          { title: \'Ali Connors\', avatar: \'https://cdn.vuetifyjs.com/images/lists/3.jpg\' },\n' +
          '          { title: \'Cindy Baker\', avatar: \'https://cdn.vuetifyjs.com/images/lists/4.jpg\' },\n' +
          '        ],\n' +
          '      }\n' +
          '    },\n' +
          '  }\n' +
          '<\/script>'
      }
    }
  }
</script>
