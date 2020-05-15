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
          '        e1: 1,\n' +
          '        steps: 2,\n' +
          '      }\n' +
          '    },\n' +
          '\n' +
          '    watch: {\n' +
          '      steps (val) {\n' +
          '        if (this.e1 > val) {\n' +
          '          this.e1 = val\n' +
          '        }\n' +
          '      },\n' +
          '    },\n' +
          '\n' +
          '    methods: {\n' +
          '      nextStep (n) {\n' +
          '        if (n === this.steps) {\n' +
          '          this.e1 = 1\n' +
          '        } else {\n' +
          '          this.e1 = n + 1\n' +
          '        }\n' +
          '      },\n' +
          '    },\n' +
          '  }\n' +
          '<\/script>'
      }
    }
  }
</script>
