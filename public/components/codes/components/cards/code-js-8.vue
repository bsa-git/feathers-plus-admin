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
          '          color: \'#1F7087\',\n' +
          '          src: \'https://cdn.vuetifyjs.com/images/cards/foster.jpg\',\n' +
          '          title: \'Supermodel\',\n' +
          '          artist: \'Foster the People\',\n' +
          '        },\n' +
          '        {\n' +
          '          color: \'#952175\',\n' +
          '          src: \'https://cdn.vuetifyjs.com/images/cards/halcyon.png\',\n' +
          '          title: \'Halcyon Days\',\n' +
          '          artist: \'Ellie Goulding\',\n' +
          '        },\n' +
          '      ],\n' +
          '    }),\n' +
          '  }\n' +
          '<\/script>'
      }
    }
  }
</script>
