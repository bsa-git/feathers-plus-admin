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
          '    item-key="name"\n' +
          '    class="elevation-1"\n' +
          '    :footer-props="{\n' +
          '      showFirstLastPage: true,\n' +
          '      firstIcon: \'mdi-arrow-collapse-left\',\n' +
          '      lastIcon: \'mdi-arrow-collapse-right\',\n' +
          '      prevIcon: \'mdi-minus\',\n' +
          '      nextIcon: \'mdi-plus\'\n' +
          '    }"\n' +
          '  ></v-data-table>\n' +
          '</template>'
      }
    }
  }
</script>
