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
          '      cards: [\n' +
          '        { title: \'Pre-fab homes\', src: \'https://cdn.vuetifyjs.com/images/cards/house.jpg\', flex: 12 },\n' +
          '        { title: \'Favorite road trips\', src: \'https://cdn.vuetifyjs.com/images/cards/road.jpg\', flex: 6 },\n' +
          '        { title: \'Best airlines\', src: \'https://cdn.vuetifyjs.com/images/cards/plane.jpg\', flex: 6 },\n' +
          '      ],\n' +
          '    }),\n' +
          '  }\n' +
          '<\/script>'
      }
    }
  }
</script>
