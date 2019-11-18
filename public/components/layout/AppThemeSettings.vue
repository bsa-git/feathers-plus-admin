<template>
  <div>
    <v-btn small fab dark fixed class="setting-fab" color="red" @click="openThemeSettings">
      <v-icon>mdi-settings</v-icon>
    </v-btn>
    <v-navigation-drawer
      temporary
      right
      v-model="rightDrawer"
      hide-overlay
      fixed
      :dark="$vuetify.theme.dark"
      app
    >
      <theme-settings
        :color-options="colorOptions"
      ></theme-settings>
    </v-navigation-drawer>
  </div>
</template>

<script>
  import themeColorOptions from '~/api/data/theme-color-options.json';
  import ThemeSettings from '~/components/layout/ThemeSettings';

  export default {
    components: {
      ThemeSettings
    },
    data: () => ({
      rightDrawer: false,
      colorOptions: themeColorOptions,
    }),
    methods: {
      openThemeSettings () {
        this.$vuetify.goTo(0);
        this.rightDrawer = (!this.rightDrawer);
      }
    }
  };
</script>

<style lang="sass" scoped>
  .setting-fab
    top: 50% !important
    right: 0
    border-radius: 0
</style>
