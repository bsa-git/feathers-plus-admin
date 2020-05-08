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
          '        { icon: \'folder\', iconClass: \'grey lighten-1 white--text\', title: \'Photos\', subtitle: \'Jan 9, 2014\' },\n' +
          '        { icon: \'folder\', iconClass: \'grey lighten-1 white--text\', title: \'Recipes\', subtitle: \'Jan 17, 2014\' },\n' +
          '        { icon: \'folder\', iconClass: \'grey lighten-1 white--text\', title: \'Work\', subtitle: \'Jan 28, 2014\' },\n' +
          '      ],\n' +
          '      items2: [\n' +
          '        { icon: \'assignment\', iconClass: \'blue white--text\', title: \'Vacation itinerary\', subtitle: \'Jan 20, 2014\' },\n' +
          '        { icon: \'call_to_action\', iconClass: \'amber white--text\', title: \'Kitchen remodel\', subtitle: \'Jan 10, 2014\' },\n' +
          '      ],\n' +
          '    }),\n' +
          '  }\n' +
          '<\/script>'
      }
    }
  }
</script>
