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
          '  <v-card\n' +
          '    color="blue-grey darken-1"\n' +
          '    dark\n' +
          '    :loading="isUpdating"\n' +
          '  >\n' +
          '    <template v-slot:progress>\n' +
          '      <v-progress-linear\n' +
          '        absolute\n' +
          '        color="green lighten-3"\n' +
          '        height="4"\n' +
          '        indeterminate\n' +
          '      ></v-progress-linear>\n' +
          '    </template>\n' +
          '    <v-img\n' +
          '      height="200"\n' +
          '      src="https://cdn.vuetifyjs.com/images/cards/dark-beach.jpg"\n' +
          '    >\n' +
          '      <v-row>\n' +
          '        <v-col\n' +
          '          class="text-right"\n' +
          '          cols="12"\n' +
          '        >\n' +
          '          <v-menu\n' +
          '            bottom\n' +
          '            left\n' +
          '            transition="slide-y-transition"\n' +
          '          >\n' +
          '            <template v-slot:activator="{ on }">\n' +
          '              <v-btn\n' +
          '                icon\n' +
          '                v-on="on"\n' +
          '              >\n' +
          '                <v-icon>mdi-dots-vertical</v-icon>\n' +
          '              </v-btn>\n' +
          '            </template>\n' +
          '            <v-list>\n' +
          '              <v-list-item @click="isUpdating = true">\n' +
          '                <v-list-item-action>\n' +
          '                  <v-icon>mdi-settings</v-icon>\n' +
          '                </v-list-item-action>\n' +
          '                <v-list-item-content>\n' +
          '                  <v-list-item-title>Update</v-list-item-title>\n' +
          '                </v-list-item-content>\n' +
          '              </v-list-item>\n' +
          '            </v-list>\n' +
          '          </v-menu>\n' +
          '        </v-col>\n' +
          '        <v-row\n' +
          '          class="pa-4"\n' +
          '          align="center"\n' +
          '          justify="center"\n' +
          '        >\n' +
          '          <v-col class="text-center">\n' +
          '            <h3 class="headline">{{ name }}</h3>\n' +
          '            <span class="grey--text text--lighten-1">{{ title }}</span>\n' +
          '          </v-col>\n' +
          '        </v-row>\n' +
          '      </v-row>\n' +
          '    </v-img>\n' +
          '    <v-form>\n' +
          '      <v-container>\n' +
          '        <v-row>\n' +
          '          <v-col\n' +
          '            cols="12"\n' +
          '            md="6"\n' +
          '          >\n' +
          '            <v-text-field\n' +
          '              v-model="name"\n' +
          '              :disabled="isUpdating"\n' +
          '              filled\n' +
          '              color="blue-grey lighten-2"\n' +
          '              label="Name"\n' +
          '            ></v-text-field>\n' +
          '          </v-col>\n' +
          '          <v-col\n' +
          '            cols="12"\n' +
          '            md="6"\n' +
          '          >\n' +
          '            <v-text-field\n' +
          '              v-model="title"\n' +
          '              :disabled="isUpdating"\n' +
          '              filled\n' +
          '              color="blue-grey lighten-2"\n' +
          '              label="Title"\n' +
          '            ></v-text-field>\n' +
          '          </v-col>\n' +
          '          <v-col cols="12">\n' +
          '            <v-autocomplete\n' +
          '              v-model="friends"\n' +
          '              :disabled="isUpdating"\n' +
          '              :items="people"\n' +
          '              filled\n' +
          '              chips\n' +
          '              color="blue-grey lighten-2"\n' +
          '              label="Select"\n' +
          '              item-text="name"\n' +
          '              item-value="name"\n' +
          '              multiple\n' +
          '            >\n' +
          '              <template v-slot:selection="data">\n' +
          '                <v-chip\n' +
          '                  v-bind="data.attrs"\n' +
          '                  :input-value="data.selected"\n' +
          '                  close\n' +
          '                  @click="data.select"\n' +
          '                  @click:close="remove(data.item)"\n' +
          '                >\n' +
          '                  <v-avatar left>\n' +
          '                    <v-img :src="data.item.avatar"></v-img>\n' +
          '                  </v-avatar>\n' +
          '                  {{ data.item.name }}\n' +
          '                </v-chip>\n' +
          '              </template>\n' +
          '              <template v-slot:item="data">\n' +
          '                <template v-if="typeof data.item !== \'object\'">\n' +
          '                  <v-list-item-content v-text="data.item"></v-list-item-content>\n' +
          '                </template>\n' +
          '                <template v-else>\n' +
          '                  <v-list-item-avatar>\n' +
          '                    <img :src="data.item.avatar">\n' +
          '                  </v-list-item-avatar>\n' +
          '                  <v-list-item-content>\n' +
          '                    <v-list-item-title v-html="data.item.name"></v-list-item-title>\n' +
          '                    <v-list-item-subtitle v-html="data.item.group"></v-list-item-subtitle>\n' +
          '                  </v-list-item-content>\n' +
          '                </template>\n' +
          '              </template>\n' +
          '            </v-autocomplete>\n' +
          '          </v-col>\n' +
          '        </v-row>\n' +
          '      </v-container>\n' +
          '    </v-form>\n' +
          '    <v-divider></v-divider>\n' +
          '    <v-card-actions>\n' +
          '      <v-switch\n' +
          '        v-model="autoUpdate"\n' +
          '        :disabled="isUpdating"\n' +
          '        class="mt-0"\n' +
          '        color="green lighten-2"\n' +
          '        hide-details\n' +
          '        label="Auto Update"\n' +
          '      ></v-switch>\n' +
          '      <v-spacer></v-spacer>\n' +
          '      <v-btn\n' +
          '        :disabled="autoUpdate"\n' +
          '        :loading="isUpdating"\n' +
          '        color="blue-grey darken-3"\n' +
          '        depressed\n' +
          '        @click="isUpdating = true"\n' +
          '      >\n' +
          '        <v-icon left>mdi-update</v-icon>\n' +
          '        Update Now\n' +
          '      </v-btn>\n' +
          '    </v-card-actions>\n' +
          '  </v-card>\n' +
          '</template>'
      }
    }
  }
</script>
