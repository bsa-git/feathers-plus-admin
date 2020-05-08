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
          '        { header: \'Today\' },\n' +
          '        {\n' +
          '          avatar: \'https://cdn.vuetifyjs.com/images/lists/1.jpg\',\n' +
          '          title: \'Brunch this weekend?\',\n' +
          '          subtitle: "<span class=\'text--primary\'>Ali Connors</span> &mdash; I\'ll be in your neighborhood doing errands this weekend. Do you want to hang out?",\n' +
          '        },\n' +
          '        { divider: true, inset: true },\n' +
          '        {\n' +
          '          avatar: \'https://cdn.vuetifyjs.com/images/lists/2.jpg\',\n' +
          '          title: \'Summer BBQ <span class="grey--text text--lighten-1">4</span>\',\n' +
          '          subtitle: "<span class=\'text--primary\'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I\'m out of town this weekend.",\n' +
          '        },\n' +
          '        { divider: true, inset: true },\n' +
          '        {\n' +
          '          avatar: \'https://cdn.vuetifyjs.com/images/lists/3.jpg\',\n' +
          '          title: \'Oui oui\',\n' +
          '          subtitle: "<span class=\'text--primary\'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?",\n' +
          '        },\n' +
          '        { divider: true, inset: true },\n' +
          '        {\n' +
          '          avatar: \'https://cdn.vuetifyjs.com/images/lists/4.jpg\',\n' +
          '          title: \'Birthday gift\',\n' +
          '          subtitle: "<span class=\'text--primary\'>Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?",\n' +
          '        },\n' +
          '        { divider: true, inset: true },\n' +
          '        {\n' +
          '          avatar: \'https://cdn.vuetifyjs.com/images/lists/5.jpg\',\n' +
          '          title: \'Recipe to try\',\n' +
          '          subtitle: "<span class=\'text--primary\'>Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.",\n' +
          '        },\n' +
          '      ],\n' +
          '    }),\n' +
          '  }\n' +
          '<\/script>'
      }
    }
  }
</script>
