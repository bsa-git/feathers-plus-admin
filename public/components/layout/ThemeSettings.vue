<template>
  <div id="themeSetting">
    <v-toolbar color="primary darken-1" dark>
      <v-toolbar-title>
        {{ $t('theme_settings.settings') }}
      </v-toolbar-title>
    </v-toolbar>
    <v-container>
      <v-subheader class="px-1 my-2">
        {{ $t('theme_settings.color_option') }}
      </v-subheader>
      <v-row>
        <v-col cols="6" class="color-option " v-for="(option,index) in colorOptions" :key="index">
          <!-- Color box -->
          <label class="color-option--label ">
            <input type="radio" name="color" v-bind:value="option.key" v-model="themeColor">
            <span class="color-option--item bg">
              <span class="overlay">
                <v-icon color="white">mdi-check</v-icon>
              </span>
              <span class="color-option--item--header sideNav" :class="option.value.sideNav"></span>
              <span class="color-option--item--header mainNav" :class="option.value.mainNav"></span>
              <span class="sideMenu" :class="option.value.sideMenu"></span>
            </span>
          </label>
        </v-col>
      </v-row>
      <div class="theme-options">
        <v-subheader class="px-1 my-2">
          {{ $t('theme_settings.sidebar_option') }}
        </v-subheader>
        <v-divider></v-divider>
        <div class="my-3">
          <v-btn-toggle v-model="sideBarOption">
            <v-btn value="dark">
              {{ $t('theme_settings.dark') }}
            </v-btn>
            <v-btn value="light">
              {{ $t('theme_settings.light') }}
            </v-btn>
          </v-btn-toggle>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>

  import {mapState, mapMutations} from 'vuex';

  export default {
    props: {
      colorOptions: Array
    },
    data() {
      return {
        themeColor: 'indigo',
        sideBarOption: 'light',
        changedColor: false,
        changedDark: false
      };
    },
    methods: {
      ...mapMutations({
        setThemePrimary: 'SET_THEME_PRIMARY',
        setThemeDark: 'SET_THEME_DARK'
      })
    },
    computed: {
      ...mapState(['theme']),
    },
    watch: {
      themeColor: {
        handler(val) {
          const primaryColor = this.$colors[val].base;
          if (this.changedColor) {
            this.$vuetify.theme.themes.dark.primary = primaryColor;
            this.$vuetify.theme.themes.light.primary = primaryColor;
            this.setThemePrimary(val);
          } else {
            this.changedColor = true;
            if (this.theme.primary !== val) {
              this.themeColor = this.theme.primary;
            }
          }
        },
        immediate: true
      },
      sideBarOption: {
        handler(val) {
          const isDark = (val === 'dark');
          if (this.changedDark) {
            this.$vuetify.theme.dark = isDark;
            this.setThemeDark(isDark);
          } else {
            this.changedDark = true;
            if (this.theme.dark !== isDark) {
              this.sideBarOption = this.theme.dark ? 'dark' : 'light';
            }
          }
        },
        immediate: true
      }
    },
  };
</script>
<style lang="sass" scoped>
  .color-option
    &--label
      position: relative
      display: block
      cursor: pointer
      & input[type="radio"]
        display: none
        & + span
          position: relative
          & > .overlay
            display: none
            position: absolute
            top: 0
            bottom: 0
            right: 0
            left: 0
            width: 100%
            height: 100%
            background-color: rgba(0, 0, 0, .3)
            text-align: center
            line-height: 30px
            color: #fff
        &:checked + span > .overlay
          display: block
      & .bg
        background-color: #f1f1f1
    &--item
      overflow: hidden
      display: block
      box-shadow: 0 0 2px rgba(0, 0, 0, .1)
      border: 1px solid lightgray
      &--header
        height: 10px
      & > span
        display: block
        float: left
        width: 50%
        height: 20px
</style>

