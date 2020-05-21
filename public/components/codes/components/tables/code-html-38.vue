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
          '    >\n' +
          '      <template v-slot:item.name="props">\n' +
          '        <v-edit-dialog\n' +
          '          :return-value.sync="props.item.name"\n' +
          '          @save="save"\n' +
          '          @cancel="cancel"\n' +
          '          @open="open"\n' +
          '          @close="close"\n' +
          '        > {{ props.item.name }}\n' +
          '          <template v-slot:input>\n' +
          '            <v-text-field\n' +
          '              v-model="props.item.name"\n' +
          '              :rules="[max25chars]"\n' +
          '              label="Edit"\n' +
          '              single-line\n' +
          '              counter\n' +
          '            ></v-text-field>\n' +
          '          </template>\n' +
          '        </v-edit-dialog>\n' +
          '      </template>\n' +
          '      <template v-slot:item.iron="props">\n' +
          '        <v-edit-dialog\n' +
          '          :return-value.sync="props.item.iron"\n' +
          '          large\n' +
          '          persistent\n' +
          '          @save="save"\n' +
          '          @cancel="cancel"\n' +
          '          @open="open"\n' +
          '          @close="close"\n' +
          '        >\n' +
          '          <div>{{ props.item.iron }}</div>\n' +
          '          <template v-slot:input>\n' +
          '            <div class="mt-4 title">Update Iron</div>\n' +
          '          </template>\n' +
          '          <template v-slot:input>\n' +
          '            <v-text-field\n' +
          '              v-model="props.item.iron"\n' +
          '              :rules="[max25chars]"\n' +
          '              label="Edit"\n' +
          '              single-line\n' +
          '              counter\n' +
          '              autofocus\n' +
          '            ></v-text-field>\n' +
          '          </template>\n' +
          '        </v-edit-dialog>\n' +
          '      </template>\n' +
          '    </v-data-table>\n' +
          '\n' +
          '    <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">\n' +
          '      {{ snackText }}\n' +
          '      <v-btn text @click="snack = false">Close</v-btn>\n' +
          '    </v-snackbar>\n' +
          '  </div>\n' +
          '</template>'
      }
    }
  }
</script>
