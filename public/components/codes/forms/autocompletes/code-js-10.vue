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
          '      isLoading: false,\n' +
          '      items: [],\n' +
          '      model: null,\n' +
          '      search: null,\n' +
          '      tab: null,\n' +
          '    }),\n' +
          '\n' +
          '    watch: {\n' +
          '      model (val) {\n' +
          '        if (val != null) this.tab = 0\n' +
          '        else this.tab = null\n' +
          '      },\n' +
          '      search (val) {\n' +
          '        // Items have already been loaded\n' +
          '        if (this.items.length > 0) return\n' +
          '\n' +
          '        this.isLoading = true\n' +
          '\n' +
          '        // Lazily load input items\n' +
          '        fetch(\'https://api.coingecko.com/api/v3/coins/list\')\n' +
          '          .then(res => res.clone().json())\n' +
          '          .then(res => {\n' +
          '            this.items = res\n' +
          '          })\n' +
          '          .catch(err => {\n' +
          '            console.log(err)\n' +
          '          })\n' +
          '          .finally(() => (this.isLoading = false))\n' +
          '      },\n' +
          '    },\n' +
          '  }\n' +
          '<\/script>'
      }
    }
  }
</script>
