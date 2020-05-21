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
          '      :options.sync="options"\n' +
          '      :server-items-length="totalDesserts"\n' +
          '      :loading="loading"\n' +
          '      class="elevation-1"\n' +
          '    ></v-data-table>\n' +
          '  </div>\n' +
          '</template>'
      }
    }
  }
</script>
