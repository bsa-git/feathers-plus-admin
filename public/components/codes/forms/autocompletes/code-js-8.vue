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
          '        loading: false,\n' +
          '        items: [],\n' +
          '        search: null,\n' +
          '        select: null,\n' +
          '        states: [\n' +
          '          \'Alabama\',\n' +
          '          \'Alaska\',\n' +
          '          \'American Samoa\',\n' +
          '          \'Arizona\',\n' +
          '          \'Arkansas\',\n' +
          '          \'California\',\n' +
          '          \'Colorado\',\n' +
          '          \'Connecticut\',\n' +
          '          \'Delaware\',\n' +
          '          \'District of Columbia\',\n' +
          '          \'Federated States of Micronesia\',\n' +
          '          \'Florida\',\n' +
          '          \'Georgia\',\n' +
          '          \'Guam\',\n' +
          '          \'Hawaii\',\n' +
          '          \'Idaho\',\n' +
          '          \'Illinois\',\n' +
          '          \'Indiana\',\n' +
          '          \'Iowa\',\n' +
          '          \'Kansas\',\n' +
          '          \'Kentucky\',\n' +
          '          \'Louisiana\',\n' +
          '          \'Maine\',\n' +
          '          \'Marshall Islands\',\n' +
          '          \'Maryland\',\n' +
          '          \'Massachusetts\',\n' +
          '          \'Michigan\',\n' +
          '          \'Minnesota\',\n' +
          '          \'Mississippi\',\n' +
          '          \'Missouri\',\n' +
          '          \'Montana\',\n' +
          '          \'Nebraska\',\n' +
          '          \'Nevada\',\n' +
          '          \'New Hampshire\',\n' +
          '          \'New Jersey\',\n' +
          '          \'New Mexico\',\n' +
          '          \'New York\',\n' +
          '          \'North Carolina\',\n' +
          '          \'North Dakota\',\n' +
          '          \'Northern Mariana Islands\',\n' +
          '          \'Ohio\',\n' +
          '          \'Oklahoma\',\n' +
          '          \'Oregon\',\n' +
          '          \'Palau\',\n' +
          '          \'Pennsylvania\',\n' +
          '          \'Puerto Rico\',\n' +
          '          \'Rhode Island\',\n' +
          '          \'South Carolina\',\n' +
          '          \'South Dakota\',\n' +
          '          \'Tennessee\',\n' +
          '          \'Texas\',\n' +
          '          \'Utah\',\n' +
          '          \'Vermont\',\n' +
          '          \'Virgin Island\',\n' +
          '          \'Virginia\',\n' +
          '          \'Washington\',\n' +
          '          \'West Virginia\',\n' +
          '          \'Wisconsin\',\n' +
          '          \'Wyoming\',\n' +
          '        ],\n' +
          '      }\n' +
          '    },\n' +
          '    watch: {\n' +
          '      search (val) {\n' +
          '        val && val !== this.select && this.querySelections(val)\n' +
          '      },\n' +
          '    },\n' +
          '    methods: {\n' +
          '      querySelections (v) {\n' +
          '        this.loading = true\n' +
          '        // Simulated ajax query\n' +
          '        setTimeout(() => {\n' +
          '          this.items = this.states.filter(e => {\n' +
          '            return (e || \'\').toLowerCase().indexOf((v || \'\').toLowerCase()) > -1\n' +
          '          })\n' +
          '          this.loading = false\n' +
          '        }, 500)\n' +
          '      },\n' +
          '    },\n' +
          '  }\n' +
          '<\/script>'
      }
    }
  }
</script>
