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
          '        headers: [\n' +
          '          {\n' +
          '            text: \'Dessert (100g serving)\',\n' +
          '            align: \'start\',\n' +
          '            value: \'name\',\n' +
          '          },\n' +
          '          { text: \'Category\', value: \'category\' },\n' +
          '        ],\n' +
          '        desserts: [\n' +
          '          {\n' +
          '            name: \'Frozen Yogurt\',\n' +
          '            category: \'Ice cream\',\n' +
          '          },\n' +
          '          {\n' +
          '            name: \'Ice cream sandwich\',\n' +
          '            category: \'Ice cream\',\n' +
          '          },\n' +
          '          {\n' +
          '            name: \'Eclair\',\n' +
          '            category: \'Cookie\',\n' +
          '          },\n' +
          '          {\n' +
          '            name: \'Cupcake\',\n' +
          '            category: \'Pastry\',\n' +
          '          },\n' +
          '          {\n' +
          '            name: \'Gingerbread\',\n' +
          '            category: \'Cookie\',\n' +
          '          },\n' +
          '          {\n' +
          '            name: \'Jelly bean\',\n' +
          '            category: \'Candy\',\n' +
          '          },\n' +
          '          {\n' +
          '            name: \'Lollipop\',\n' +
          '            category: \'Candy\',\n' +
          '          },\n' +
          '          {\n' +
          '            name: \'Honeycomb\',\n' +
          '            category: \'Toffee\',\n' +
          '          },\n' +
          '          {\n' +
          '            name: \'Donut\',\n' +
          '            category: \'Pastry\',\n' +
          '          },\n' +
          '          {\n' +
          '            name: \'KitKat\',\n' +
          '            category: \'Candy\',\n' +
          '          },\n' +
          '        ],\n' +
          '      }\n' +
          '    },\n' +
          '  }\n' +
          '<\/script>'
      }
    }
  }
</script>
