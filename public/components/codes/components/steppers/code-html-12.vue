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
          '  <v-stepper>\n' +
          '    <v-stepper-header>\n' +
          '      <v-stepper-step step="1">Ad unit details</v-stepper-step>\n' +
          '\n' +
          '      <v-divider></v-divider>\n' +
          '\n' +
          '      <v-stepper-step :rules="[() => false]" step="2">\n' +
          '        Ad templates\n' +
          '        <small>Alert message</small>\n' +
          '      </v-stepper-step>\n' +
          '\n' +
          '      <v-divider></v-divider>\n' +
          '\n' +
          '      <v-stepper-step step="3">Ad sizes</v-stepper-step>\n' +
          '    </v-stepper-header>\n' +
          '  </v-stepper>\n' +
          '</template>'
      }
    }
  }
</script>
