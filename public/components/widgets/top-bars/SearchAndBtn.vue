<template>
  <v-row class="align-baseline" justify="space-between">
    <v-col cols="12" md="6">
      <!-- Data Search -->
      <v-text-field
        v-model="searchItems"
        :label="searchLabel"
        append-outer-icon="fas fa-search"
        single-line
        hide-details
        clearable
      ></v-text-field>
    </v-col>
    <v-col cols="2" md="2">
      <!-- Activators -->
      <template v-if="btnText && btnIcon">
        <v-btn
          color="primary"
          class="white--text"
          :disabled="!!btnDisabled"
          @click="btnClick"
        >
          <v-icon class="mr-3" dark>{{ btnIcon }}</v-icon>
          {{ btnText }}
        </v-btn>
      </template>

      <template v-if="btnText && !btnIcon">
        <v-btn text color="primary" @click="btnClick" :disabled="!!btnDisabled">{{ btnText }}</v-btn>
      </template>

      <template v-if="btnIcon && !btnText">
        <v-btn fab small dark color="primary" @click="btnClick" :disabled="!!btnDisabled" :title="btnTooltip? btnTooltip : ''">
          <v-icon dark>{{ btnIcon }}</v-icon>
        </v-btn>
      </template>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    search: String,
    searchLabel: String,
    btnText: String,
    btnIcon: String,
    btnTooltip: String,
    btnDisabled: Boolean,
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
