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
          '  <v-data-table item-key="name" class="elevation-1" loading loading-text="Loading... Please wait"></v-data-table>\n' +
          '</template>'
      }
    }
  }
</script>
