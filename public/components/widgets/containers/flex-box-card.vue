<template>
  <v-row
    :justify="justify"
    :align="align"
  >
    <v-col
      cols="12"
      :md="md"
      :loading="loading"
    >
      <v-card
        :color="color? color : theme.dark ? 'secondary' : ''"
        :dark="this.theme.dark"
        :outlined="outlined"
        :loading="loading"
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
        <v-card-title class="d-flex justify-center">{{ title }}</v-card-title>
        <v-card-text>
          <!-- Slot card-text -->
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
      },
      loading: {
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
