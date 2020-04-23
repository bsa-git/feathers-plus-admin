<template>
  <v-row
    :justify="justify"
    :align="align"
  >
    <template  v-for="col in vcols">
      <v-col
        cols="12"
        :md="md"
      >
        <slot :name="`slot${col}`"></slot>
      </v-col>
    </template>
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
      md: {
        type: Number,
        default: 4
      },
      vcols: {
        type: Number,
        default: 2
      }
    },
  };
</script>
