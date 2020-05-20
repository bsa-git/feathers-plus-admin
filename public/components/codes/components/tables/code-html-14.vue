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
          '  <v-data-table dense :headers="headers" :items="desserts" item-key="name" class="elevation-1"></v-data-table>\n' +
          '</template>'
      }
    }
  }
</script>
