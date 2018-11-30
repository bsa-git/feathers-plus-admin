<template>
  <v-content>
    <!-- Page Content -->
    <div id="page-content">
      <nuxt></nuxt>
    </div>
    <!-- App Footer -->
    <slot name="footer"></slot>
  </v-content>
</template>

<style lang="stylus" scoped>
  // min-height=window.height - header.height - footer.height
  #page-content
    min-height: calc(100vh - 64px - 80px);
</style>
