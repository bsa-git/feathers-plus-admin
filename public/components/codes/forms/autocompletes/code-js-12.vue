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
          '        isEditing: false,\n' +
          '        model: null,\n' +
          '        states: [\n' +
          '          \'Alabama\', \'Alaska\', \'American Samoa\', \'Arizona\',\n' +
          '          \'Arkansas\', \'California\', \'Colorado\', \'Connecticut\',\n' +
          '          \'Delaware\', \'District of Columbia\', \'Federated States of Micronesia\',\n' +
          '          \'Florida\', \'Georgia\', \'Guam\', \'Hawaii\', \'Idaho\',\n' +
          '          \'Illinois\', \'Indiana\', \'Iowa\', \'Kansas\', \'Kentucky\',\n' +
          '          \'Louisiana\', \'Maine\', \'Marshall Islands\', \'Maryland\',\n' +
          '          \'Massachusetts\', \'Michigan\', \'Minnesota\', \'Mississippi\',\n' +
          '          \'Missouri\', \'Montana\', \'Nebraska\', \'Nevada\',\n' +
          '          \'New Hampshire\', \'New Jersey\', \'New Mexico\', \'New York\',\n' +
          '          \'North Carolina\', \'North Dakota\', \'Northern Mariana Islands\', \'Ohio\',\n' +
          '          \'Oklahoma\', \'Oregon\', \'Palau\', \'Pennsylvania\', \'Puerto Rico\',\n' +
          '          \'Rhode Island\', \'South Carolina\', \'South Dakota\', \'Tennessee\',\n' +
          '          \'Texas\', \'Utah\', \'Vermont\', \'Virgin Island\', \'Virginia\',\n' +
          '          \'Washington\', \'West Virginia\', \'Wisconsin\', \'Wyoming\',\n' +
          '        ],\n' +
          '      }\n' +
          '    },\n' +
          '  }\n' +
          '<\/script>'
      }
    }
  }
</script>
