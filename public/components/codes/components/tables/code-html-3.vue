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
          '    v-model="selected"\n' +
          '    :headers="headers"\n' +
          '    :items="desserts"\n' +
          '    :single-select="singleSelect"\n' +
          '    item-key="name"\n' +
          '    show-select\n' +
          '    class="elevation-1"\n' +
          '  >\n' +
          '    <template v-slot:top>\n' +
          '      <v-switch v-model="singleSelect" label="Single select" class="pa-3"></v-switch>\n' +
          '    </template>\n' +
          '  </v-data-table>\n' +
          '</template>'
      }
    }
  }
</script>
