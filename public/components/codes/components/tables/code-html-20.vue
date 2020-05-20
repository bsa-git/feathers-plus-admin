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
          '    <v-select v-model="enabled" :items="slots" label="Slot" clearable></v-select>\n' +
          '    <v-data-table\n' +
          '      :headers="headers"\n' +
          '      :items="items"\n' +
          '      :search="search"\n' +
          '      :hide-default-header="hideHeaders"\n' +
          '      :show-select="showSelect"\n' +
          '      :loading="isLoading"\n' +
          '      hide-default-footer\n' +
          '      item-key="name"\n' +
          '      class="elevation-1"\n' +
          '    >\n' +
          '      <template v-if="isEnabled(\'top\')" v-slot:top>\n' +
          '        <div>This is content above the actual table</div>\n' +
          '      </template>\n' +
          '\n' +
          '      <template v-if="isEnabled(\'header.data-table-select\')" v-slot:header.data-table-select="{ on, props }">\n' +
          '        <v-simple-checkbox color="purple" v-bind="props" v-on="on"></v-simple-checkbox>\n' +
          '      </template>\n' +
          '\n' +
          '      <template v-if="isEnabled(\'header\')" v-slot:header="{ props: { headers } }">\n' +
          '        <thead>\n' +
          '          <tr>\n' +
          '            <th :colspan="headers.length">\n' +
          '              This is a header\n' +
          '            </th>\n' +
          '          </tr>\n' +
          '        </thead>\n' +
          '      </template>\n' +
          '\n' +
          '      <template v-if="isEnabled(\'progress\')" v-slot:progress>\n' +
          '        <v-progress-linear color="purple" :height="10" indeterminate></v-progress-linear>\n' +
          '      </template>\n' +
          '\n' +
          '      <template v-if="isEnabled(\'item.data-table-select\')" v-slot:item.data-table-select="{ isSelected, select }">\n' +
          '        <v-simple-checkbox color="green" :value="isSelected" @input="select($event)"></v-simple-checkbox>\n' +
          '      </template>\n' +
          '\n' +
          '      <template v-if="isEnabled(\'item.<name>\')" v-slot:item.name="{ item }">\n' +
          '        {{ item.name.toUpperCase() }}\n' +
          '      </template>\n' +
          '\n' +
          '      <template v-if="isEnabled(\'body.prepend\')" v-slot:body.prepend="{ headers }">\n' +
          '        <tr>\n' +
          '          <td :colspan="headers.length">\n' +
          '            This is a prepended row\n' +
          '          </td>\n' +
          '        </tr>\n' +
          '      </template>\n' +
          '\n' +
          '      <template v-if="isEnabled(\'body\')" v-slot:body="{ items }">\n' +
          '        <tbody>\n' +
          '          <tr v-for="item in items" :key="item.name">\n' +
          '            <td>{{ item.name }}</td>\n' +
          '            <td>CONTENT</td>\n' +
          '            <td>CONTENT</td>\n' +
          '            <td>CONTENT</td>\n' +
          '            <td>CONTENT</td>\n' +
          '            <td>CONTENT</td>\n' +
          '          </tr>\n' +
          '        </tbody>\n' +
          '      </template>\n' +
          '\n' +
          '      <template v-if="isEnabled(\'no-data\')" v-slot:no-data>\n' +
          '        NO DATA HERE!\n' +
          '      </template>\n' +
          '\n' +
          '      <template v-if="isEnabled(\'no-results\')" v-slot:no-results>\n' +
          '        NO RESULTS HERE!\n' +
          '      </template>\n' +
          '\n' +
          '      <template v-if="isEnabled(\'body.append\')" v-slot:body.append="{ headers }">\n' +
          '        <tr>\n' +
          '          <td :colspan="headers.length">\n' +
          '            This is an appended row\n' +
          '          </td>\n' +
          '        </tr>\n' +
          '      </template>\n' +
          '\n' +
          '      <template v-if="isEnabled(\'footer\')" v-slot:footer>\n' +
          '        <div>\n' +
          '          This is a footer\n' +
          '        </div>\n' +
          '      </template>\n' +
          '    </v-data-table>\n' +
          '  </div>\n' +
          '</template>'
      }
    }
  }
</script>
