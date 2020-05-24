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
          '    <v-card-title class="indigo white--text headline">\n' +
          '      User Directory\n' +
          '    </v-card-title>\n' +
          '    <v-row\n' +
          '      class="pa-4"\n' +
          '      justify="space-between"\n' +
          '    >\n' +
          '      <v-col cols="5">\n' +
          '        <v-treeview\n' +
          '          :active.sync="active"\n' +
          '          :items="items"\n' +
          '          :load-children="fetchUsers"\n' +
          '          :open.sync="open"\n' +
          '          activatable\n' +
          '          color="warning"\n' +
          '          open-on-click\n' +
          '          transition\n' +
          '        >\n' +
          '          <template v-slot:prepend="{ item, active }">\n' +
          '            <v-icon v-if="!item.children">mdi-account</v-icon>\n' +
          '          </template>\n' +
          '        </v-treeview>\n' +
          '      </v-col>\n' +
          '\n' +
          '      <v-divider vertical></v-divider>\n' +
          '\n' +
          '      <v-col\n' +
          '        class="d-flex text-center"\n' +
          '      >\n' +
          '        <v-scroll-y-transition mode="out-in">\n' +
          '          <div\n' +
          '            v-if="!selected"\n' +
          '            class="title grey--text text--lighten-1 font-weight-light"\n' +
          '            style="align-self: center;"\n' +
          '          >\n' +
          '            Select a User\n' +
          '          </div>\n' +
          '          <v-card\n' +
          '            v-else\n' +
          '            :key="selected.id"\n' +
          '            class="pt-6 mx-auto"\n' +
          '            flat\n' +
          '            max-width="400"\n' +
          '          >\n' +
          '            <v-card-text>\n' +
          '              <v-avatar\n' +
          '                v-if="avatar"\n' +
          '                size="88"\n' +
          '              >\n' +
          '                <v-img\n' +
          '                  :src="`https://avataaars.io/${avatar}`"\n' +
          '                  class="mb-6"\n' +
          '                ></v-img>\n' +
          '              </v-avatar>\n' +
          '              <h3 class="headline mb-2">\n' +
          '                {{ selected.name }}\n' +
          '              </h3>\n' +
          '              <div class="blue--text mb-2">{{ selected.email }}</div>\n' +
          '              <div class="blue--text subheading font-weight-bold">{{ selected.username }}</div>\n' +
          '            </v-card-text>\n' +
          '            <v-divider></v-divider>\n' +
          '            <v-row\n' +
          '              class="text-left"\n' +
          '              tag="v-card-text"\n' +
          '            >\n' +
          '              <v-col class="text-right mr-4 mb-2" tag="strong" cols="5">Company:</v-col>\n' +
          '              <v-col>{{ selected.company.name }}</v-col>\n' +
          '              <v-col class="text-right mr-4 mb-2" tag="strong" cols="5">Website:</v-col>\n' +
          '              <v-col>\n' +
          '                <a :href="`//${selected.website}`" target="_blank">{{ selected.website }}</a>\n' +
          '              </v-col>\n' +
          '              <v-col class="text-right mr-4 mb-2" tag="strong" cols="5">Phone:</v-col>\n' +
          '              <v-col>{{ selected.phone }}</v-col>\n' +
          '            </v-row>\n' +
          '          </v-card>\n' +
          '        </v-scroll-y-transition>\n' +
          '      </v-col>\n' +
          '    </v-row>\n' +
          '  </v-card>\n' +
          '</template>'
      }
    }
  }
</script>
