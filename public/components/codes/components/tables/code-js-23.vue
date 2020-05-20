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
          '        desserts: [\n' +
          '          {\n' +
          '            name: \'Frozen Yogurt\',\n' +
          '            calories: 159,\n' +
          '            fat: 6.0,\n' +
          '            carbs: 24,\n' +
          '            protein: 4.0,\n' +
          '            iron: \'1%\',\n' +
          '            glutenfree: true,\n' +
          '          },\n' +
          '          {\n' +
          '            name: \'Ice cream sandwich\',\n' +
          '            calories: 237,\n' +
          '            fat: 9.0,\n' +
          '            carbs: 37,\n' +
          '            protein: 4.3,\n' +
          '            iron: \'1%\',\n' +
          '            glutenfree: false,\n' +
          '          },\n' +
          '          {\n' +
          '            name: \'Eclair\',\n' +
          '            calories: 262,\n' +
          '            fat: 16.0,\n' +
          '            carbs: 23,\n' +
          '            protein: 6.0,\n' +
          '            iron: \'7%\',\n' +
          '            glutenfree: false,\n' +
          '          },\n' +
          '          {\n' +
          '            name: \'Jelly bean\',\n' +
          '            calories: 375,\n' +
          '            fat: 0.0,\n' +
          '            carbs: 94,\n' +
          '            protein: 0.0,\n' +
          '            iron: \'0%\',\n' +
          '            glutenfree: true,\n' +
          '          },\n' +
          '          {\n' +
          '            name: \'Lollipop\',\n' +
          '            calories: 392,\n' +
          '            fat: 0.2,\n' +
          '            carbs: 98,\n' +
          '            protein: 0,\n' +
          '            iron: \'2%\',\n' +
          '            glutenfree: true,\n' +
          '          },\n' +
          '          {\n' +
          '            name: \'KitKat\',\n' +
          '            calories: 518,\n' +
          '            fat: 26.0,\n' +
          '            carbs: 65,\n' +
          '            protein: 7,\n' +
          '            iron: \'6%\',\n' +
          '            glutenfree: false,\n' +
          '          },\n' +
          '        ],\n' +
          '        headers: [\n' +
          '          {\n' +
          '            text: \'Dessert (100g serving)\',\n' +
          '            align: \'start\',\n' +
          '            sortable: false,\n' +
          '            value: \'name\',\n' +
          '          },\n' +
          '          { text: \'Calories\', value: \'calories\' },\n' +
          '          { text: \'Fat (g)\', value: \'fat\' },\n' +
          '          { text: \'Carbs (g)\', value: \'carbs\' },\n' +
          '          { text: \'Protein (g)\', value: \'protein\' },\n' +
          '          { text: \'Iron (%)\', value: \'iron\' },\n' +
          '          { text: \'Gluten-Free\', value: \'glutenfree\' },\n' +
          '        ],\n' +
          '      }\n' +
          '    },\n' +
          '  }\n' +
          '<\/script>'
      }
    }
  }
</script>
