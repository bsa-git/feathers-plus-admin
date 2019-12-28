<template>
  <v-sheet class="d-flex align-baseline mb-5">
    <!-- Data Search -->
    <v-text-field
      v-model="searchItems"
      append-icon="fas fa-search"
      :label="searchLabel"
      single-line
      hide-details
    ></v-text-field>
    <v-spacer></v-spacer>
    <!-- Activator -->
    <template v-if="btnText && btnIcon">
      <v-btn
        color="primary"
        class="white--text"
        @click="btnClick"
      >
        <v-icon class="mr-3" dark>{{ btnIcon }}</v-icon>
        {{ btnText }}
      </v-btn>
    </template>

    <template v-if="btnText && !btnIcon">
      <v-btn text color="primary" @click="btnClick">{{ btnText }}</v-btn>
    </template>

    <template v-if="btnIcon && !btnText">
      <v-btn fab small dark color="primary" @click="btnClick" :title="btnTooltip? btnTooltip : ''">
        <v-icon dark>{{ btnIcon }}</v-icon>
      </v-btn>
    </template>

  </v-sheet>
</template>

<script>
export default {
  props: {
    search: String,
    searchLabel: String,
    btnText: String,
    btnIcon: String,
    btnTooltip: String,
    btnClick: Function,
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
