<template>
  <v-card>
    <!-- Widget toolbar -->
    <v-toolbar v-if="isHeader" color="primary" dark>
      <v-icon class="mr-3" v-if="headerIcon">{{ headerIcon }}</v-icon>
      <v-app-bar-nav-icon v-else></v-app-bar-nav-icon>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <slot name="widget-header-action"></slot>
    </v-toolbar>
    <!-- Widget content -->
    <slot name="widget-content"></slot>
  </v-card>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
      },
      isHeader: {
        type: Boolean,
        default: true
      },
      headerIcon: {
        type: String,
        default: ''
      }
    },

    data() {
      return {};
    },
    computed: {},
  };
</script>
