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
          '    class="elevation-1"\n' +
          '  >\n' +
          '    <template v-slot:header.name="{ header }">\n' +
          '      {{ header.text.toUpperCase() }}\n' +
          '    </template>\n' +
          '  </v-data-table>\n' +
          '</template>'
      }
    }
  }
</script>
