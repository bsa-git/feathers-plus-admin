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
          '    activatable\n' +
          '    :items="items"\n' +
          '  ></v-treeview>\n' +
          '</template>'
      }
    }
  }
</script>
