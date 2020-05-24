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
          '    <v-toolbar\n' +
          '      color="primary"\n' +
          '      dark\n' +
          '      flat\n' +
          '    >\n' +
          '      <v-icon>mdi-silverware</v-icon>\n' +
          '      <v-toolbar-title>Local hotspots</v-toolbar-title>\n' +
          '    </v-toolbar>\n' +
          '\n' +
          '    <v-row>\n' +
          '      <v-col>\n' +
          '        <v-card-text>\n' +
          '          <v-treeview\n' +
          '            v-model="tree"\n' +
          '            :load-children="fetch"\n' +
          '            :items="items"\n' +
          '            selected-color="indigo"\n' +
          '            open-on-click\n' +
          '            selectable\n' +
          '            return-object\n' +
          '            expand-icon="mdi-chevron-down"\n' +
          '            on-icon="mdi-bookmark"\n' +
          '            off-icon="mdi-bookmark-outline"\n' +
          '            indeterminate-icon="mdi-bookmark-minus"\n' +
          '          >\n' +
          '          </v-treeview>\n' +
          '        </v-card-text>\n' +
          '      </v-col>\n' +
          '\n' +
          '      <v-divider vertical></v-divider>\n' +
          '\n' +
          '      <v-col\n' +
          '        cols="12"\n' +
          '        md="6"\n' +
          '      >\n' +
          '        <v-card-text>\n' +
          '          <div\n' +
          '            v-if="tree.length === 0"\n' +
          '            key="title"\n' +
          '            class="title font-weight-light grey--text pa-4 text-center"\n' +
          '          >\n' +
          '            Select your favorite breweries\n' +
          '          </div>\n' +
          '\n' +
          '          <v-scroll-x-transition\n' +
          '            group\n' +
          '            hide-on-leave\n' +
          '          >\n' +
          '            <v-chip\n' +
          '              v-for="(selection, i) in tree"\n' +
          '              :key="i"\n' +
          '              color="grey"\n' +
          '              dark\n' +
          '              small\n' +
          '              class="ma-1"\n' +
          '            >\n' +
          '              <v-icon left small>mdi-beer</v-icon>\n' +
          '              {{ selection.name }}\n' +
          '            </v-chip>\n' +
          '          </v-scroll-x-transition>\n' +
          '        </v-card-text>\n' +
          '      </v-col>\n' +
          '    </v-row>\n' +
          '\n' +
          '    <v-divider></v-divider>\n' +
          '\n' +
          '    <v-card-actions>\n' +
          '      <v-btn\n' +
          '        text\n' +
          '        @click="tree = []"\n' +
          '      >\n' +
          '        Reset\n' +
          '      </v-btn>\n' +
          '\n' +
          '      <v-spacer></v-spacer>\n' +
          '\n' +
          '      <v-btn\n' +
          '        class="white--text"\n' +
          '        color="green darken-1"\n' +
          '        depressed\n' +
          '      >\n' +
          '        Save\n' +
          '        <v-icon right>mdi-content-save</v-icon>\n' +
          '      </v-btn>\n' +
          '    </v-card-actions>\n' +
          '  </v-card>\n' +
          '</template>'
      }
    }
  }
</script>
