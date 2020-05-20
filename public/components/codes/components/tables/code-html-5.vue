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
          '    item-key="name"\n' +
          '    group-by="category"\n' +
          '    class="elevation-1"\n' +
          '    show-group-by\n' +
          '  ></v-data-table>\n' +
          '</template>'
      }
    }
  }
</script>
