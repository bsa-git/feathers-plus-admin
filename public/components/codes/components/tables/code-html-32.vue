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
          '      :page.sync="page"\n' +
          '      :items-per-page="itemsPerPage"\n' +
          '      hide-default-footer\n' +
          '      class="elevation-1"\n' +
          '      @page-count="pageCount = $event"\n' +
          '    ></v-data-table>\n' +
          '    <div class="text-center pt-2">\n' +
          '      <v-pagination v-model="page" :length="pageCount"></v-pagination>\n' +
          '      <v-text-field\n' +
          '        :value="itemsPerPage"\n' +
          '        label="Items per page"\n' +
          '        type="number"\n' +
          '        min="-1"\n' +
          '        max="15"\n' +
          '        @input="itemsPerPage = parseInt($event, 10)"\n' +
          '      ></v-text-field>\n' +
          '    </div>\n' +
          '  </div>\n' +
          '</template>'
      }
    }
  }
</script>
