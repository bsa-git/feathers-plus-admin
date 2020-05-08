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
          '          {\n' +
          '            action: \'local_activity\',\n' +
          '            title: \'Attractions\',\n' +
          '            items: [\n' +
          '              { title: \'List Item\' },\n' +
          '            ],\n' +
          '          },\n' +
          '          {\n' +
          '            action: \'restaurant\',\n' +
          '            title: \'Dining\',\n' +
          '            active: true,\n' +
          '            items: [\n' +
          '              { title: \'Breakfast & brunch\' },\n' +
          '              { title: \'New American\' },\n' +
          '              { title: \'Sushi\' },\n' +
          '            ],\n' +
          '          },\n' +
          '          {\n' +
          '            action: \'school\',\n' +
          '            title: \'Education\',\n' +
          '            items: [\n' +
          '              { title: \'List Item\' },\n' +
          '            ],\n' +
          '          },\n' +
          '          {\n' +
          '            action: \'directions_run\',\n' +
          '            title: \'Family\',\n' +
          '            items: [\n' +
          '              { title: \'List Item\' },\n' +
          '            ],\n' +
          '          },\n' +
          '          {\n' +
          '            action: \'healing\',\n' +
          '            title: \'Health\',\n' +
          '            items: [\n' +
          '              { title: \'List Item\' },\n' +
          '            ],\n' +
          '          },\n' +
          '          {\n' +
          '            action: \'content_cut\',\n' +
          '            title: \'Office\',\n' +
          '            items: [\n' +
          '              { title: \'List Item\' },\n' +
          '            ],\n' +
          '          },\n' +
          '          {\n' +
          '            action: \'local_offer\',\n' +
          '            title: \'Promotions\',\n' +
          '            items: [\n' +
          '              { title: \'List Item\' },\n' +
          '            ],\n' +
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
