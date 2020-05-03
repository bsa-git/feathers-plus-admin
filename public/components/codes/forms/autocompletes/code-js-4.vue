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
          '        hasSaved: false,\n' +
          '        isEditing: null,\n' +
          '        model: null,\n' +
          '        states: [\n' +
          '          { name: \'Florida\', abbr: \'FL\', id: 1 },\n' +
          '          { name: \'Georgia\', abbr: \'GA\', id: 2 },\n' +
          '          { name: \'Nebraska\', abbr: \'NE\', id: 3 },\n' +
          '          { name: \'California\', abbr: \'CA\', id: 4 },\n' +
          '          { name: \'New York\', abbr: \'NY\', id: 5 },\n' +
          '        ],\n' +
          '      }\n' +
          '    },\n' +
          '\n' +
          '    methods: {\n' +
          '      customFilter (item, queryText, itemText) {\n' +
          '        const textOne = item.name.toLowerCase()\n' +
          '        const textTwo = item.abbr.toLowerCase()\n' +
          '        const searchText = queryText.toLowerCase()\n' +
          '\n' +
          '        return textOne.indexOf(searchText) > -1 ||\n' +
          '          textTwo.indexOf(searchText) > -1\n' +
          '      },\n' +
          '      save () {\n' +
          '        this.isEditing = !this.isEditing\n' +
          '        this.hasSaved = true\n' +
          '      },\n' +
          '    },\n' +
          '  }\n' +
          '<\/script>'
      }
    }
  }
</script>
