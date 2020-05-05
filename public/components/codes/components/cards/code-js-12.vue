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
          '      twitText: \'Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases are type invalid as well.\',\n' +
          '      twitAvatar: \'https://avataaars.io\',\n' +
          '    }),\n' +
          '  }\n' +
          '<\/script>'
      }
    }
  }
</script>
