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
        :loading="loading"
        :tile="tile"
        :elevation="elevation"
      >
        <!-- Slot card system bar -->
        <slot name="system-bar"></slot>
        <!-- Slot card toolbar -->
        <slot name="tool-bar"></slot>
        <!-- Slot card app-bar -->
        <slot name="app-bar"></slot>
        <!-- Slot card img -->
        <slot name="card-img"></slot>
        <!-- Slot card title -->
        <slot name="card-title"></slot>
        <!-- Card title -->
        <v-card-title v-if="title" class="d-flex justify-center">{{ title }}</v-card-title>
        <v-card-text>
          <v-treeview
            :dark="(dark === undefined)? theme.dark : dark"
            :items="items"
            :dense="dense"
            :selectable="selectable"
            :selected-color="selectedColor"
            :activatable="activatable"
            :color="itemColor"
            :shaped="shaped"
            :hoverable="hoverable"
            :rounded="rounded"
            :item-disabled="itemDisabled"
            :open-all="openAll"
          >
            <!-- Slot treeview -->
            <slot></slot>
          </v-treeview>
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
        default: 6
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
      loading: {
        type: Boolean,
        default: false
      },
      elevation: {
        type: Number,
        default: undefined
      },
      //--- V-TREE-VIEW ---//
      items: {
        type: Array,
        default: () => []
      },
      dense: {
        type: Boolean,
        default: false
      },
      selectable: {
        type: Boolean,
        default: false
      },
      selectedColor: {
        type: String,
        default: 'accent'
      },
      activatable: {
        type: Boolean,
        default: false
      },
      itemColor: {
        type: String,
        default: 'primary'
      },
      shaped: {
        type: Boolean,
        default: false
      },
      hoverable: {
        type: Boolean,
        default: false
      },
      rounded: {
        type: Boolean,
        default: false
      },
      itemDisabled: {
        type: String,
        default: ''
      },
      openAll: {
        type: Boolean,
        default: false
      },
    },
    computed: {
      ...mapGetters({
        theme: 'getTheme',
      }),
    },
  };
</script>
