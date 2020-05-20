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
          '    :items-per-page="5"\n' +
          '    class="elevation-1"\n' +
          '  ></v-data-table>\n' +
          '</template>'
      }
    }
  }
</script>
