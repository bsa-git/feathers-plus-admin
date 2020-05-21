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
          '      dialog: false,\n' +
          '      headers: [\n' +
          '        {\n' +
          '          text: \'Dessert (100g serving)\',\n' +
          '          align: \'start\',\n' +
          '          sortable: false,\n' +
          '          value: \'name\',\n' +
          '        },\n' +
          '        { text: \'Calories\', value: \'calories\' },\n' +
          '        { text: \'Fat (g)\', value: \'fat\' },\n' +
          '        { text: \'Carbs (g)\', value: \'carbs\' },\n' +
          '        { text: \'Protein (g)\', value: \'protein\' },\n' +
          '        { text: \'Actions\', value: \'actions\', sortable: false },\n' +
          '      ],\n' +
          '      desserts: [],\n' +
          '      editedIndex: -1,\n' +
          '      editedItem: {\n' +
          '        name: \'\',\n' +
          '        calories: 0,\n' +
          '        fat: 0,\n' +
          '        carbs: 0,\n' +
          '        protein: 0,\n' +
          '      },\n' +
          '      defaultItem: {\n' +
          '        name: \'\',\n' +
          '        calories: 0,\n' +
          '        fat: 0,\n' +
          '        carbs: 0,\n' +
          '        protein: 0,\n' +
          '      },\n' +
          '    }),\n' +
          '\n' +
          '    computed: {\n' +
          '      formTitle () {\n' +
          '        return this.editedIndex === -1 ? \'New Item\' : \'Edit Item\'\n' +
          '      },\n' +
          '    },\n' +
          '\n' +
          '    watch: {\n' +
          '      dialog (val) {\n' +
          '        val || this.close()\n' +
          '      },\n' +
          '    },\n' +
          '\n' +
          '    created () {\n' +
          '      this.initialize()\n' +
          '    },\n' +
          '\n' +
          '    methods: {\n' +
          '      initialize () {\n' +
          '        this.desserts = [\n' +
          '          {\n' +
          '            name: \'Frozen Yogurt\',\n' +
          '            calories: 159,\n' +
          '            fat: 6.0,\n' +
          '            carbs: 24,\n' +
          '            protein: 4.0,\n' +
          '          },\n' +
          '          {\n' +
          '            name: \'Ice cream sandwich\',\n' +
          '            calories: 237,\n' +
          '            fat: 9.0,\n' +
          '            carbs: 37,\n' +
          '            protein: 4.3,\n' +
          '          },\n' +
          '          {\n' +
          '            name: \'Eclair\',\n' +
          '            calories: 262,\n' +
          '            fat: 16.0,\n' +
          '            carbs: 23,\n' +
          '            protein: 6.0,\n' +
          '          },\n' +
          '          {\n' +
          '            name: \'Cupcake\',\n' +
          '            calories: 305,\n' +
          '            fat: 3.7,\n' +
          '            carbs: 67,\n' +
          '            protein: 4.3,\n' +
          '          },\n' +
          '          {\n' +
          '            name: \'Gingerbread\',\n' +
          '            calories: 356,\n' +
          '            fat: 16.0,\n' +
          '            carbs: 49,\n' +
          '            protein: 3.9,\n' +
          '          },\n' +
          '          {\n' +
          '            name: \'Jelly bean\',\n' +
          '            calories: 375,\n' +
          '            fat: 0.0,\n' +
          '            carbs: 94,\n' +
          '            protein: 0.0,\n' +
          '          },\n' +
          '          {\n' +
          '            name: \'Lollipop\',\n' +
          '            calories: 392,\n' +
          '            fat: 0.2,\n' +
          '            carbs: 98,\n' +
          '            protein: 0,\n' +
          '          },\n' +
          '          {\n' +
          '            name: \'Honeycomb\',\n' +
          '            calories: 408,\n' +
          '            fat: 3.2,\n' +
          '            carbs: 87,\n' +
          '            protein: 6.5,\n' +
          '          },\n' +
          '          {\n' +
          '            name: \'Donut\',\n' +
          '            calories: 452,\n' +
          '            fat: 25.0,\n' +
          '            carbs: 51,\n' +
          '            protein: 4.9,\n' +
          '          },\n' +
          '          {\n' +
          '            name: \'KitKat\',\n' +
          '            calories: 518,\n' +
          '            fat: 26.0,\n' +
          '            carbs: 65,\n' +
          '            protein: 7,\n' +
          '          },\n' +
          '        ]\n' +
          '      },\n' +
          '\n' +
          '      editItem (item) {\n' +
          '        this.editedIndex = this.desserts.indexOf(item)\n' +
          '        this.editedItem = Object.assign({}, item)\n' +
          '        this.dialog = true\n' +
          '      },\n' +
          '\n' +
          '      deleteItem (item) {\n' +
          '        const index = this.desserts.indexOf(item)\n' +
          '        confirm(\'Are you sure you want to delete this item?\') && this.desserts.splice(index, 1)\n' +
          '      },\n' +
          '\n' +
          '      close () {\n' +
          '        this.dialog = false\n' +
          '        this.$nextTick(() => {\n' +
          '          this.editedItem = Object.assign({}, this.defaultItem)\n' +
          '          this.editedIndex = -1\n' +
          '        })\n' +
          '      },\n' +
          '\n' +
          '      save () {\n' +
          '        if (this.editedIndex > -1) {\n' +
          '          Object.assign(this.desserts[this.editedIndex], this.editedItem)\n' +
          '        } else {\n' +
          '          this.desserts.push(this.editedItem)\n' +
          '        }\n' +
          '        this.close()\n' +
          '      },\n' +
          '    },\n' +
          '  }\n' +
          '<\/script>'
      }
    }
  }
</script>
