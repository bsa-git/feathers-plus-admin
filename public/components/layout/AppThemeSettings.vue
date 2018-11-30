<template>
  <div>
    <!-- theme setting -->
    <v-btn small fab dark falt fixed top="top" right="right" class="setting-fab" color="red" @click="openThemeSettings">
      <v-icon>settings</v-icon>
    </v-btn>
    <v-navigation-drawer
      class="setting-drawer"
      temporary
      right
      v-model="rightDrawer"
      hide-overlay
      fixed
    >
      <slot></slot>
    </v-navigation-drawer>
  </div>
</template>

<script>
  export default {
    data: () => ({
      rightDrawer: false,
    }),
    methods: {
      openThemeSettings () {
        this.$vuetify.goTo(0);
        this.rightDrawer = (!this.rightDrawer);
      }
    }
  };
</script>

<style lang="stylus" scoped>
  .setting-fab
    top:50%!important;
    right:0;
    border-radius:0
</style>
