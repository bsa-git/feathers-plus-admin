<template>
  <div>
    {{ code }}
  </div>
</template>

<script>
  export default {
    data() {
      return {
        code: '<!-- App.vue -->\n' +
          '<v-app>\n' +
          '  <v-navigation-drawer app>\n' +
          '    <!-- -->\n' +
          '  </v-navigation-drawer>\n' +
          '\n' +
          '  <v-app-bar app>\n' +
          '    <!-- -->\n' +
          '  </v-app-bar>\n' +
          '\n' +
          '  <!-- Sizes your content based upon application components -->\n' +
          '  <v-content>\n' +
          '\n' +
          '    <!-- Provides the application the proper gutter -->\n' +
          '    <v-container fluid>\n' +
          '\n' +
          '      <!-- If using vue-router -->\n' +
          '      <router-view></router-view>\n' +
          '    </v-container>\n' +
          '  </v-content>\n' +
          '\n' +
          '  <v-footer app>\n' +
          '    <!-- -->\n' +
          '  </v-footer>\n' +
          '</v-app>'
      }
    }
  }
</script>
