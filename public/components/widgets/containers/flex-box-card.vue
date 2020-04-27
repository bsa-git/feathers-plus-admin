<template>
  <v-row
    :justify="justify"
    :align="align"
  >
    <v-col
      cols="12"
      :md="md"
    ><v-card
      :color="color"
      :dark="this.theme.dark"
      :outlined="outlined"
    >
      <v-card-title class="d-flex justify-center">{{ title }}</v-card-title>
      <v-card-text>
        <slot></slot>
      </v-card-text>
    </v-card>
    </v-col>
  </v-row>
</template>

<script>
  import {mapGetters} from 'vuex';
  export default {
    props: {
      title: {
        type: String,
        default: ''
      },
      justify: {
        type: String,
        default: 'center'
      },
      align: {
        type: String,
        default: 'center'
      },
      md: {
        type: Number,
        default: 6
      },
      color: {
        type: String,
        default: 'secondary'
      },
      outlined: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      ...mapGetters({
        theme: 'getTheme',
      }),
    },
  };
</script>
