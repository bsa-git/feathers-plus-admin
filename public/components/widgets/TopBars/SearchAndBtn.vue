<template>
  <v-sheet class="d-flex align-baseline mb-5">
    <!-- User search from table -->
    <v-text-field
      v-model="searchItems"
      append-icon="fas fa-search"
      :label="labelSearch"
      single-line
      hide-details
    ></v-text-field>
    <v-spacer></v-spacer>
    <!-- Activator open save dialog  -->
    <v-btn text color="primary" @click="clickNewItem">{{ textNewItem }}</v-btn>
  </v-sheet>
</template>

<script>
export default {
  props: {
    search: String,
    labelSearch: String,
    clickNewItem: Function,
    textNewItem: String
  },
  computed: {
    searchItems: {
      // Getter:
      get: function () {
        return this.search
      },
      // Setter:
      set: function (newValue) {
        this.$emit('onSearch', newValue)
      }
    }
  },
};
</script>
