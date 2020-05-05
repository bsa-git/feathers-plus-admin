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
          '  <v-card class="d-inline-block mx-auto">\n' +
          '    <v-container>\n' +
          '      <v-row justify="space-between">\n' +
          '        <v-col cols="auto">\n' +
          '          <v-img\n' +
          '            height="200"\n' +
          '            width="200"\n' +
          '            src="https://cdn.vuetifyjs.com/images/cards/store.jpg"\n' +
          '          ></v-img>\n' +
          '        </v-col>\n' +
          '\n' +
          '        <v-col\n' +
          '          cols="auto"\n' +
          '          class="text-center pl-0"\n' +
          '        >\n' +
          '          <v-row\n' +
          '            class="flex-column ma-0 fill-height"\n' +
          '            justify="center"\n' +
          '          >\n' +
          '            <v-col class="px-0">\n' +
          '              <v-btn icon>\n' +
          '                <v-icon>mdi-heart</v-icon>\n' +
          '              </v-btn>\n' +
          '            </v-col>\n' +
          '\n' +
          '            <v-col class="px-0">\n' +
          '              <v-btn icon>\n' +
          '                <v-icon>mdi-bookmark</v-icon>\n' +
          '              </v-btn>\n' +
          '            </v-col>\n' +
          '\n' +
          '            <v-col class="px-0">\n' +
          '              <v-btn icon>\n' +
          '                <v-icon>mdi-share-variant</v-icon>\n' +
          '              </v-btn>\n' +
          '            </v-col>\n' +
          '          </v-row>\n' +
          '        </v-col>\n' +
          '      </v-row>\n' +
          '    </v-container>\n' +
          '  </v-card>\n' +
          '</template>'
      }
    }
  }
</script>
