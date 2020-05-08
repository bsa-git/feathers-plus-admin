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
          '      selected: [2],\n' +
          '      items: [\n' +
          '        {\n' +
          '          action: \'15 min\',\n' +
          '          headline: \'Brunch this weekend?\',\n' +
          '          title: \'Ali Connors\',\n' +
          '          subtitle: "I\'ll be in your neighborhood doing errands this weekend. Do you want to hang out?",\n' +
          '        },\n' +
          '        {\n' +
          '          action: \'2 hr\',\n' +
          '          headline: \'Summer BBQ\',\n' +
          '          title: \'me, Scrott, Jennifer\',\n' +
          '          subtitle: "Wish I could come, but I\'m out of town this weekend.",\n' +
          '        },\n' +
          '        {\n' +
          '          action: \'6 hr\',\n' +
          '          headline: \'Oui oui\',\n' +
          '          title: \'Sandra Adams\',\n' +
          '          subtitle: \'Do you have Paris recommendations? Have you ever been?\',\n' +
          '        },\n' +
          '        {\n' +
          '          action: \'12 hr\',\n' +
          '          headline: \'Birthday gift\',\n' +
          '          title: \'Trevor Hansen\',\n' +
          '          subtitle: \'Have any ideas about what we should get Heidi for her birthday?\',\n' +
          '        },\n' +
          '        {\n' +
          '          action: \'18hr\',\n' +
          '          headline: \'Recipe to try\',\n' +
          '          title: \'Britta Holt\',\n' +
          '          subtitle: \'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.\',\n' +
          '        },\n' +
          '      ],\n' +
          '    }),\n' +
          '  }\n' +
          '<\/script>'
      }
    }
  }
</script>
