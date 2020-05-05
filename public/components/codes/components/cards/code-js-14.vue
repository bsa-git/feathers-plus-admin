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
          '      loading: false,\n' +
          '      selection: 1,\n' +
          '    }),\n' +
          '\n' +
          '    methods: {\n' +
          '      reserve () {\n' +
          '        this.loading = true\n' +
          '\n' +
          '        setTimeout(() => (this.loading = false), 2000)\n' +
          '      },\n' +
          '    },\n' +
          '  }\n' +
          '<\/script>'
      }
    }
  }
</script>
