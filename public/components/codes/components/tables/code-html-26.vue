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
          '  <div>\n' +
          '    <v-data-table\n' +
          '      :headers="headers"\n' +
          '      :items="desserts"\n' +
          '      item-key="name"\n' +
          '      class="elevation-1"\n' +
          '      :search="search"\n' +
          '      :custom-filter="filterOnlyCapsText"\n' +
          '    >\n' +
          '      <template v-slot:top>\n' +
          '        <v-text-field v-model="search" label="Search (UPPER CASE ONLY)" class="mx-4"></v-text-field>\n' +
          '      </template>\n' +
          '      <template v-slot:body.append>\n' +
          '        <tr>\n' +
          '          <td></td>\n' +
          '          <td>\n' +
          '            <v-text-field v-model="calories" type="number" label="Less than"></v-text-field>\n' +
          '          </td>\n' +
          '          <td colspan="4"></td>\n' +
          '        </tr>\n' +
          '      </template>\n' +
          '    </v-data-table>\n' +
          '  </div>\n' +
          '</template>'
      }
    }
  }
</script>
