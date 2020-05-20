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
          '    hide-default-header\n' +
          '    hide-default-footer\n' +
          '    class="elevation-1"\n' +
          '  ></v-data-table>\n' +
          '</template>'
      }
    }
  }
</script>
