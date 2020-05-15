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
          '  <v-stepper value="1">\n' +
          '    <v-stepper-header>\n' +
          '      <v-stepper-step step="1">Select campaign settings</v-stepper-step>\n' +
          '\n' +
          '      <v-divider></v-divider>\n' +
          '\n' +
          '      <v-stepper-step step="2">Create an ad group</v-stepper-step>\n' +
          '\n' +
          '      <v-divider></v-divider>\n' +
          '\n' +
          '      <v-stepper-step step="3">Create an ad</v-stepper-step>\n' +
          '    </v-stepper-header>\n' +
          '  </v-stepper>\n' +
          '</template>'
      }
    }
  }
</script>
