<template>
  <v-row
    :justify="justify"
    :align="align"
  >
    <template  v-for="n in vcols">
      <v-col
        class="mx-3"
        cols="auto"
        :md="md"
      >
        <v-row justify="center">
          <slot :name="`col${n}`"></slot>
        </v-row>
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
        default: undefined
      },
      vcols: {
        type: Number,
        default: 2
      }
    },
  };
</script>
