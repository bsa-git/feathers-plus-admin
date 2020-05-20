<template>
  <div>
    {{ code }}
  </div>
</template>

<script>
  export default {
    data() {
      return {
        code: '<template>\n' +
          '  <div>\n' +
          '    <v-data-table\n' +
          '      :headers="headers"\n' +
          '      :items="desserts"\n' +
          '      class="elevation-1"\n' +
          '    >\n' +
          '      <template v-slot:item.glutenfree="{ item }">\n' +
          '        <v-simple-checkbox v-model="item.glutenfree" disabled></v-simple-checkbox>\n' +
          '      </template>\n' +
          '    </v-data-table>\n' +
          '  </div>\n' +
          '</template>'
      }
    }
  }
</script>
