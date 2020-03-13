<template>
  <v-row>
    <v-col cols="12" md="6">
      <v-text-field
        v-model="searchItems"
        append-outer-icon="fas fa-search"
        :label="labelSearch"
        single-line
        hide-details
        clearable
      ></v-text-field>
    </v-col>
  </v-row>
</template>

<script>
  export default {
    props: {
      search: String,
      labelSearch: String,
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
