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
          '  <v-data-table\n' +
          '    :headers="headers"\n' +
          '    :items="desserts"\n' +
          '    class="elevation-1"\n' +
          '  >\n' +
          '    <template v-slot:item.calories="{ item }">\n' +
          '      <v-chip :color="getColor(item.calories)" dark>{{ item.calories }}</v-chip>\n' +
          '    </template>\n' +
          '  </v-data-table>\n' +
          '</template>'
      }
    }
  }
</script>
