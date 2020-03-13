<template>
  <div>
    <v-btn small fab dark fixed class="setting-fab" color="red" @click="openThemeSettings">
      <v-icon>mdi-cog</v-icon>
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
      <app-theme-settings
        ref="appThemeSettings"
        :color-options="colorOptions"
      ></app-theme-settings>
    </v-navigation-drawer>
  </div>
</template>

<script>
  import themeColorOptions from '~/api/app/theme-color-options.json';
  import AppThemeSettings from '~/components/app/layout/AppThemeSettings';

  export default {
    components: {
      AppThemeSettings
    },
    data: () => ({
      rightDrawer: false,
      colorOptions: themeColorOptions,
    }),
    mounted: function () {
      this.$nextTick(function () {
//        console.log('$refs.appThemeSettings:', this.$refs.appThemeSettings);
      })
    },
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
