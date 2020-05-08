<template>
  <v-row
    :justify="justify"
    :align="align"
  >
    <v-col
      cols="12"
      :md="md"
    >
      <v-card
        :color="color? color : theme.dark ? 'secondary' : ''"
        :dark="theme.dark"
        :outlined="outlined"
        :loading="loading"
        :tile="tile"
      >
        <!-- Slot card system bar -->
        <slot name="system-bar"></slot>
        <!-- Slot card toolbar -->
        <slot name="tool-bar"></slot>
        <!-- Slot card app-bar -->
        <slot name="app-bar"></slot>
        <!-- Slot card img -->
        <slot name="card-img"></slot>
        <!-- Card title -->
        <v-card-title v-if="title" class="d-flex justify-center">{{ title }}</v-card-title>
        <!-- List slots -->
        <template  v-for="list in vlists">
          <slot :name="`list${list}`"></slot>
        </template>
        <v-list
          v-if="!vlists"
          :color="color? color : theme.dark ? 'secondary' : ''"
          :dark="theme.dark"
          :disabled="disabled"
          :shaped="shaped"
          :dense="dense"
          :flat="flat"
          :rounded="rounded"
          :two-line="twoLine"
          :three-line="threeLine"
          :subheader="subheader"
        >
          <!-- Slot list content -->
          <slot></slot>
        </v-list>
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
      color: {
        type: String,
        default: 'secondary'
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
      //--- V-LIST ---//
      disabled: {
        type: Boolean,
        default: false
      },
      shaped: {
        type: Boolean,
        default: false
      },
      dense: {
        type: Boolean,
        default: false
      },
      flat: {
        type: Boolean,
        default: false
      },
      rounded: {
        type: Boolean,
        default: false
      },
      subheader: {
        type: Boolean,
        default: false
      },
      twoLine: {
        type: Boolean,
        default: false
      },
      threeLine: {
        type: Boolean,
        default: false
      },
      //--- V-LIST-SLOTS ---//
      vlists: {
        type: Number,
        default: 0
      }
    },

    computed: {
      ...mapGetters({
        theme: 'getTheme',
      }),
    },
  };
</script>
