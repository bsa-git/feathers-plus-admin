<template>
  <v-row
    :justify="justify"
    :align="align"
  >
    <v-col
      cols="12"
      :md="md1"
    >
      <slot name="slot1"></slot>
    </v-col>
    <v-col
      cols="12"
      :md="md2"
    >
      <slot name="slot2"></slot>
    </v-col>
  </v-row>
</template>

<script>
  export default {
    props: {
      justify: {
        type: String,
        default: 'center'
      },
      align: {
        type: String,
        default: 'center'
      },
      md1: {
        type: Number,
        default: 4
      },
      md2: {
        type: Number,
        default: 4
      }
    },
  };
</script>
