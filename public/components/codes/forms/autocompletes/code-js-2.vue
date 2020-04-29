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
          '      descriptionLimit: 60,\n' +
          '      entries: [],\n' +
          '      isLoading: false,\n' +
          '      model: null,\n' +
          '      search: null,\n' +
          '    }),\n' +
          '\n' +
          '    computed: {\n' +
          '      fields () {\n' +
          '        if (!this.model) return []\n' +
          '\n' +
          '        return Object.keys(this.model).map(key => {\n' +
          '          return {\n' +
          '            key,\n' +
          '            value: this.model[key] || \'n/a\',\n' +
          '          }\n' +
          '        })\n' +
          '      },\n' +
          '      items () {\n' +
          '        return this.entries.map(entry => {\n' +
          '          const Description = entry.Description.length > this.descriptionLimit\n' +
          '            ? entry.Description.slice(0, this.descriptionLimit) + \'...\'\n' +
          '            : entry.Description\n' +
          '\n' +
          '          return Object.assign({}, entry, { Description })\n' +
          '        })\n' +
          '      },\n' +
          '    },\n' +
          '\n' +
          '    watch: {\n' +
          '      search (val) {\n' +
          '        // Items have already been loaded\n' +
          '        if (this.items.length > 0) return\n' +
          '\n' +
          '        // Items have already been requested\n' +
          '        if (this.isLoading) return\n' +
          '\n' +
          '        this.isLoading = true\n' +
          '\n' +
          '        // Lazily load input items\n' +
          '        fetch(\'https://api.publicapis.org/entries\')\n' +
          '          .then(res => res.json())\n' +
          '          .then(res => {\n' +
          '            const { count, entries } = res\n' +
          '            this.count = count\n' +
          '            this.entries = entries\n' +
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
