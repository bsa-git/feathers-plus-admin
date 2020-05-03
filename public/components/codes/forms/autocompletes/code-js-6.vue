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
          '      const srcs = {\n' +
          '        1: \'https://cdn.vuetifyjs.com/images/lists/1.jpg\',\n' +
          '        2: \'https://cdn.vuetifyjs.com/images/lists/2.jpg\',\n' +
          '        3: \'https://cdn.vuetifyjs.com/images/lists/3.jpg\',\n' +
          '        4: \'https://cdn.vuetifyjs.com/images/lists/4.jpg\',\n' +
          '        5: \'https://cdn.vuetifyjs.com/images/lists/5.jpg\',\n' +
          '      }\n' +
          '\n' +
          '      return {\n' +
          '        autoUpdate: true,\n' +
          '        friends: [\'Sandra Adams\', \'Britta Holt\'],\n' +
          '        isUpdating: false,\n' +
          '        name: \'Midnight Crew\',\n' +
          '        people: [\n' +
          '          { header: \'Group 1\' },\n' +
          '          { name: \'Sandra Adams\', group: \'Group 1\', avatar: srcs[1] },\n' +
          '          { name: \'Ali Connors\', group: \'Group 1\', avatar: srcs[2] },\n' +
          '          { name: \'Trevor Hansen\', group: \'Group 1\', avatar: srcs[3] },\n' +
          '          { name: \'Tucker Smith\', group: \'Group 1\', avatar: srcs[2] },\n' +
          '          { divider: true },\n' +
          '          { header: \'Group 2\' },\n' +
          '          { name: \'Britta Holt\', group: \'Group 2\', avatar: srcs[4] },\n' +
          '          { name: \'Jane Smith \', group: \'Group 2\', avatar: srcs[5] },\n' +
          '          { name: \'John Smith\', group: \'Group 2\', avatar: srcs[1] },\n' +
          '          { name: \'Sandra Williams\', group: \'Group 2\', avatar: srcs[3] },\n' +
          '        ],\n' +
          '        title: \'The summer breeze\',\n' +
          '      }\n' +
          '    },\n' +
          '\n' +
          '    watch: {\n' +
          '      isUpdating (val) {\n' +
          '        if (val) {\n' +
          '          setTimeout(() => (this.isUpdating = false), 3000)\n' +
          '        }\n' +
          '      },\n' +
          '    },\n' +
          '\n' +
          '    methods: {\n' +
          '      remove (item) {\n' +
          '        const index = this.friends.indexOf(item.name)\n' +
          '        if (index >= 0) this.friends.splice(index, 1)\n' +
          '      },\n' +
          '    },\n' +
          '  }\n' +
          '<\/script>'
      }
    }
  }
</script>
