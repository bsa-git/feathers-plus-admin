<template>
  <v-row
    :justify="justify"
    :align="align"
  >
    <v-col
      cols="12"
      :md="md"
    >
      <v-sheet
        :color="color? color : theme.dark ? 'secondary' : ''"
        :dark="(dark === undefined)? theme.dark : dark"
        :tile="tile"
        :height="height"
        :class="classValue"
        :elevation="elevation"
      >
        <!-- Slot sheet -->
        <slot></slot>
      </v-sheet>
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
      //--- V-SHEET ---//
      color: {
        type: String,
        default: 'secondary'
      },
      dark: {
        type: Boolean,
        default: undefined
      },
      tile: {
        type: Boolean,
        default: false
      },
      height: {
        type: Number,
        default: undefined
      },
      classValue: {
        type: String,
        default: undefined
      },
      elevation: {
        type: Number,
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
