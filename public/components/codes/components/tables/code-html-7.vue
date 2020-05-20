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
          '    :sort-by="[\'calories\', \'fat\']"\n' +
          '    :sort-desc="[false, true]"\n' +
          '    multi-sort\n' +
          '    class="elevation-1"\n' +
          '  ></v-data-table>\n' +
          '</template>'
      }
    }
  }
</script>
