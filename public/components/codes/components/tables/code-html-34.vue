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
          '      :sort-by.sync="sortBy"\n' +
          '      :sort-desc.sync="sortDesc"\n' +
          '      class="elevation-1"\n' +
          '    ></v-data-table>\n' +
          '    <div class="text-center pt-2">\n' +
          '      <v-btn color="primary" class="mr-2" @click="toggleOrder">Toggle sort order</v-btn>\n' +
          '      <v-btn color="primary" @click="nextSort">Sort next column</v-btn>\n' +
          '    </div>\n' +
          '  </div>\n' +
          '</template>'
      }
    }
  }
</script>
