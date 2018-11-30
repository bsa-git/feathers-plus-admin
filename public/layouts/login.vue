<template>
  <v-app id="login" class="primary">
    <v-content>
      <v-container fluid fill-height>
        <nuxt></nuxt>
      </v-container>
    </v-content>
  </v-app>
</template>

<style scoped lang="css">
  #login {
    height: 50%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    z-index: 0;
  }
</style>
