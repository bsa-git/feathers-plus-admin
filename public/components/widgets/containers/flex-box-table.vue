<template>
  <v-row
    :justify="justify"
    :align="align"
  >
    <v-col
      cols="12"
      :md="md"
      :class="outlined && !theme.dark? 'card-border pa-0' : ''"
    >
      <v-card
        :class="classValue"
        :color="color? color : theme.dark ? 'secondary' : ''"
        :dark="(dark === undefined)? theme.dark : dark"
        :outlined="outlined"
        :tile="tile"
      >
        <!-- Slot card system-bar -->
        <slot name="system-bar"></slot>
        <!-- Slot card tool-bar -->
        <slot name="tool-bar"></slot>
        <!-- Slot card app-bar -->
        <slot name="app-bar"></slot>
        <!-- Slot card-img -->
        <slot name="card-img"></slot>
        <!-- Slot card-title -->
        <slot name="card-title"></slot>
        <!-- Card title -->
        <v-card-title v-if="title" class="d-flex justify-center">{{ title }}</v-card-title>
        <v-card-text>
          <v-data-table
            :class="color"
            :dark="(dark === undefined)? theme.dark : dark"
            v-model="model"
            :headers="headers"
            :items="items"
            :item-key="itemKey"
            :items-per-page="itemsPerPage"
            :search="search"
            :show-select="showSelect"
            :single-select="singleSelect"
            :group-by="groupBy"
            :show-group-by="showGroupBy"
            :sort-by="sortBy"
            :sort-desc="sortDesc"
            :multi-sort="multiSort"
            :hide-default-header="hideDefaultHeader"
            :hide-default-footer="hideDefaultFooter"
            :loading="loading"
            :loading-text="loadingText"
            :dense="dense"
            :footer-props="footerProps"
            :custom-filter="customFilter"
          >
            <!-- Slot v-data-table -->
            <slot></slot>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
  import {mapGetters} from 'vuex';

  export default {
    props: {
      //--- V-ROW ---//
      justify: {
        type: String,
        default: 'center'
      },
      align: {
        type: String,
        default: 'center'
      },
      //--- V-COL ---//
      md: {
        type: Number,
        default: 10
      },
      //--- V-CARD ---//
      title: {
        type: String,
        default: ''
      },
      classValue: {
        type: String,
        default: undefined
      },
      color: {
        type: String,
        default: 'secondary'
      },
      dark: {
        type: Boolean,
        default: undefined
      },
      outlined: {
        type: Boolean,
        default: false
      },
      tile: {
        type: Boolean,
        default: false
      },
      //--- V-DATA-TABLE ---//
      model: {
        type: Array,
        default: () => []
      },
      headers: {
        type: Array,
        default: () => []
      },
      items: {
        type: Array,
        default: () => []
      },
      itemKey: {
        type: String,
        default: 'id'
      },
      itemsPerPage: {
        type: Number,
        default: 5
      },
      search: {
        type: String,
        default: undefined
      },
      showSelect: {
        type: Boolean,
        default: false
      },
      singleSelect: {
        type: Boolean,
        default: false
      },
      showGroupBy: {
        type: Boolean,
        default: false
      },
      groupBy: {
        type: String,
        default: undefined
      },
      sortBy: {
        type: Array,
        default: undefined
      },
      sortDesc: {
        type: Array,
        default: undefined
      },
      multiSort: {
        type: Boolean,
        default: false
      },
      hideDefaultHeader: {
        type: Boolean,
        default: false
      },
      hideDefaultFooter: {
        type: Boolean,
        default: false
      },
      loading: {
        type: Boolean,
        default: false
      },
      loadingText: {
        type: String,
        default: ''
      },
      dense: {
        type: Boolean,
        default: false
      },
      footerProps: {
        type: Object,
        default: undefined
      },
      customFilter: {
        type: Function,
        default: undefined
      },
    },
    computed: {
      ...mapGetters({
        theme: 'getTheme',
      }),
    },
  };
</script>
