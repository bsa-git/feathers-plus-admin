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
          '    sort-by="calories"\n' +
          '    class="elevation-1"\n' +
          '  >\n' +
          '    <template v-slot:top>\n' +
          '      <v-toolbar flat color="white">\n' +
          '        <v-toolbar-title>My CRUD</v-toolbar-title>\n' +
          '        <v-divider\n' +
          '          class="mx-4"\n' +
          '          inset\n' +
          '          vertical\n' +
          '        ></v-divider>\n' +
          '        <v-spacer></v-spacer>\n' +
          '        <v-dialog v-model="dialog" max-width="500px">\n' +
          '          <template v-slot:activator="{ on }">\n' +
          '            <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>\n' +
          '          </template>\n' +
          '          <v-card>\n' +
          '            <v-card-title>\n' +
          '              <span class="headline">{{ formTitle }}</span>\n' +
          '            </v-card-title>\n' +
          '\n' +
          '            <v-card-text>\n' +
          '              <v-container>\n' +
          '                <v-row>\n' +
          '                  <v-col cols="12" sm="6" md="4">\n' +
          '                    <v-text-field v-model="editedItem.name" label="Dessert name"></v-text-field>\n' +
          '                  </v-col>\n' +
          '                  <v-col cols="12" sm="6" md="4">\n' +
          '                    <v-text-field v-model="editedItem.calories" label="Calories"></v-text-field>\n' +
          '                  </v-col>\n' +
          '                  <v-col cols="12" sm="6" md="4">\n' +
          '                    <v-text-field v-model="editedItem.fat" label="Fat (g)"></v-text-field>\n' +
          '                  </v-col>\n' +
          '                  <v-col cols="12" sm="6" md="4">\n' +
          '                    <v-text-field v-model="editedItem.carbs" label="Carbs (g)"></v-text-field>\n' +
          '                  </v-col>\n' +
          '                  <v-col cols="12" sm="6" md="4">\n' +
          '                    <v-text-field v-model="editedItem.protein" label="Protein (g)"></v-text-field>\n' +
          '                  </v-col>\n' +
          '                </v-row>\n' +
          '              </v-container>\n' +
          '            </v-card-text>\n' +
          '\n' +
          '            <v-card-actions>\n' +
          '              <v-spacer></v-spacer>\n' +
          '              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>\n' +
          '              <v-btn color="blue darken-1" text @click="save">Save</v-btn>\n' +
          '            </v-card-actions>\n' +
          '          </v-card>\n' +
          '        </v-dialog>\n' +
          '      </v-toolbar>\n' +
          '    </template>\n' +
          '    <template v-slot:item.actions="{ item }">\n' +
          '      <v-icon\n' +
          '        small\n' +
          '        class="mr-2"\n' +
          '        @click="editItem(item)"\n' +
          '      >\n' +
          '        mdi-pencil\n' +
          '      </v-icon>\n' +
          '      <v-icon\n' +
          '        small\n' +
          '        @click="deleteItem(item)"\n' +
          '      >\n' +
          '        mdi-delete\n' +
          '      </v-icon>\n' +
          '    </template>\n' +
          '    <template v-slot:no-data>\n' +
          '      <v-btn color="primary" @click="initialize">Reset</v-btn>\n' +
          '    </template>\n' +
          '  </v-data-table>\n' +
          '</template>'
      }
    }
  }
</script>
