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
          '      breweries: [],\n' +
          '      isLoading: false,\n' +
          '      tree: [],\n' +
          '      types: [],\n' +
          '    }),\n' +
          '\n' +
          '    computed: {\n' +
          '      items () {\n' +
          '        const children = this.types.map(type => ({\n' +
          '          id: type,\n' +
          '          name: this.getName(type),\n' +
          '          children: this.getChildren(type),\n' +
          '        }))\n' +
          '\n' +
          '        return [{\n' +
          '          id: 1,\n' +
          '          name: \'All Breweries\',\n' +
          '          children,\n' +
          '        }]\n' +
          '      },\n' +
          '      shouldShowTree () {\n' +
          '        return this.breweries.length > 0 && !this.isLoading\n' +
          '      },\n' +
          '    },\n' +
          '\n' +
          '    watch: {\n' +
          '      breweries (val) {\n' +
          '        this.types = val.reduce((acc, cur) => {\n' +
          '          const type = cur.brewery_type\n' +
          '\n' +
          '          if (!acc.includes(type)) acc.push(type)\n' +
          '\n' +
          '          return acc\n' +
          '        }, []).sort()\n' +
          '      },\n' +
          '    },\n' +
          '\n' +
          '    methods: {\n' +
          '      fetch () {\n' +
          '        if (this.breweries.length) return\n' +
          '\n' +
          '        return fetch(\'https://api.openbrewerydb.org/breweries\')\n' +
          '          .then(res => res.json())\n' +
          '          .then(data => (this.breweries = data))\n' +
          '          .catch(err => console.log(err))\n' +
          '      },\n' +
          '      getChildren (type) {\n' +
          '        const breweries = []\n' +
          '\n' +
          '        for (const brewery of this.breweries) {\n' +
          '          if (brewery.brewery_type !== type) continue\n' +
          '\n' +
          '          breweries.push({\n' +
          '            ...brewery,\n' +
          '            name: this.getName(brewery.name),\n' +
          '          })\n' +
          '        }\n' +
          '\n' +
          '        return breweries.sort((a, b) => {\n' +
          '          return a.name > b.name ? 1 : -1\n' +
          '        })\n' +
          '      },\n' +
          '      getName (name) {\n' +
          '        return `${name.charAt(0).toUpperCase()}${name.slice(1)}`\n' +
          '      },\n' +
          '    },\n' +
          '  }\n' +
          '<\/script>'
      }
    }
  }
</script>
