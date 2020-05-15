<template>
  <div>
    {{ code }}
  </div>
</template>

<script>
  export default {
    data() {
      return {
        code: '<template>\n' +
          '  <v-stepper alt-labels>\n' +
          '    <v-stepper-header>\n' +
          '      <v-stepper-step step="3" complete>Ad type</v-stepper-step>\n' +
          '\n' +
          '      <v-divider></v-divider>\n' +
          '\n' +
          '      <v-stepper-step step="4" complete>Ad style</v-stepper-step>\n' +
          '\n' +
          '      <v-divider></v-divider>\n' +
          '\n' +
          '      <v-stepper-step :rules="[() => false]" step="5">\n' +
          '        Custom channels\n' +
          '        <small>Alert message</small>\n' +
          '      </v-stepper-step>\n' +
          '\n' +
          '      <v-divider></v-divider>\n' +
          '\n' +
          '      <v-stepper-step step="6">Get code</v-stepper-step>\n' +
          '    </v-stepper-header>\n' +
          '  </v-stepper>\n' +
          '</template>'
      }
    }
  }
</script>
