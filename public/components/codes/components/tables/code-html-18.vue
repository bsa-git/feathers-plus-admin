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
          '  <v-card>\n' +
          '    <v-card-title>\n' +
          '      <v-text-field\n' +
          '        v-model="search"\n' +
          '        append-icon="search"\n' +
          '        label="Search"\n' +
          '        single-line\n' +
          '        hide-details\n' +
          '      ></v-text-field>\n' +
          '    </v-card-title>\n' +
          '    <v-data-table\n' +
          '      :headers="headers"\n' +
          '      :items="desserts"\n' +
          '      :search="search"\n' +
          '    ></v-data-table>\n' +
          '  </v-card>\n' +
          '</template>'
      }
    }
  }
</script>
