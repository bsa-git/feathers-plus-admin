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
          '  <v-treeview\n' +
          '    selectable\n' +
          '    item-disabled="locked"\n' +
          '    :items="items"\n' +
          '  ></v-treeview>\n' +
          '</template>'
      }
    }
  }
</script>
