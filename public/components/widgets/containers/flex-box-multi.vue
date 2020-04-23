<template>
  <v-row
    :justify="justify"
    :align="align"
  >
    <v-col
      :class="`d-flex justify-${j}`"
      cols="12"
      :md="md"
    >
      <slot></slot>
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
      j: {
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
      }
    },
  };
</script>
