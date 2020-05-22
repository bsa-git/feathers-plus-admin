<template>
  <v-row
    :justify="justify"
    :align="align"
  >
    <slot></slot>
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
      }
    },
  };
</script>
