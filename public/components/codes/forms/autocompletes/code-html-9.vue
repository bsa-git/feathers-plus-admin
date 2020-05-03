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
          '  <v-toolbar color="orange accent-1">\n' +
          '    <v-app-bar-nav-icon class="hidden-sm-and-down"></v-app-bar-nav-icon>\n' +
          '    <v-toolbar-title class="title mr-6 hidden-sm-and-down">Cryptocurrency</v-toolbar-title>\n' +
          '    <v-autocomplete\n' +
          '      v-model="model"\n' +
          '      :items="items"\n' +
          '      :loading="isLoading"\n' +
          '      :search-input.sync="search"\n' +
          '      chips\n' +
          '      clearable\n' +
          '      hide-details\n' +
          '      hide-selected\n' +
          '      item-text="name"\n' +
          '      item-value="symbol"\n' +
          '      label="Search for a coin..."\n' +
          '      solo\n' +
          '    >\n' +
          '      <template v-slot:no-data>\n' +
          '        <v-list-item>\n' +
          '          <v-list-item-title>\n' +
          '            Search for your favorite\n' +
          '            <strong>Cryptocurrency</strong>\n' +
          '          </v-list-item-title>\n' +
          '        </v-list-item>\n' +
          '      </template>\n' +
          '      <template v-slot:selection="{ attr, on, item, selected }">\n' +
          '        <v-chip\n' +
          '          v-bind="attr"\n' +
          '          :input-value="selected"\n' +
          '          color="blue-grey"\n' +
          '          class="white--text"\n' +
          '          v-on="on"\n' +
          '        >\n' +
          '          <v-icon left>mdi-coin</v-icon>\n' +
          '          <span v-text="item.name"></span>\n' +
          '        </v-chip>\n' +
          '      </template>\n' +
          '      <template v-slot:item="{ item }">\n' +
          '        <v-list-item-avatar\n' +
          '          color="indigo"\n' +
          '          class="headline font-weight-light white--text"\n' +
          '        >\n' +
          '          {{ item.name.charAt(0) }}\n' +
          '        </v-list-item-avatar>\n' +
          '        <v-list-item-content>\n' +
          '          <v-list-item-title v-text="item.name"></v-list-item-title>\n' +
          '          <v-list-item-subtitle v-text="item.symbol"></v-list-item-subtitle>\n' +
          '        </v-list-item-content>\n' +
          '        <v-list-item-action>\n' +
          '          <v-icon>mdi-coin</v-icon>\n' +
          '        </v-list-item-action>\n' +
          '      </template>\n' +
          '    </v-autocomplete>\n' +
          '    <template v-slot:extension>\n' +
          '      <v-tabs\n' +
          '        v-model="tab"\n' +
          '        :hide-slider="!model"\n' +
          '        color="blue-grey"\n' +
          '        slider-color="blue-grey"\n' +
          '      >\n' +
          '        <v-tab :disabled="!model">News</v-tab>\n' +
          '        <v-tab :disabled="!model">Trading</v-tab>\n' +
          '        <v-tab :disabled="!model">Blog</v-tab>\n' +
          '      </v-tabs>\n' +
          '    </template>\n' +
          '  </v-toolbar>\n' +
          '</template>'
      }
    }
  }
</script>
