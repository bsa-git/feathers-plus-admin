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
          '  <v-stepper v-model="e6" vertical>\n' +
          '    <v-stepper-step :complete="e6 > 1" step="1">\n' +
          '      Select an app\n' +
          '      <small>Summarize if needed</small>\n' +
          '    </v-stepper-step>\n' +
          '\n' +
          '    <v-stepper-content step="1">\n' +
          '      <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card>\n' +
          '      <v-btn color="primary" @click="e6 = 2">Continue</v-btn>\n' +
          '      <v-btn text>Cancel</v-btn>\n' +
          '    </v-stepper-content>\n' +
          '\n' +
          '    <v-stepper-step :complete="e6 > 2" step="2">Configure analytics for this app</v-stepper-step>\n' +
          '\n' +
          '    <v-stepper-content step="2">\n' +
          '      <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card>\n' +
          '      <v-btn color="primary" @click="e6 = 3">Continue</v-btn>\n' +
          '      <v-btn text>Cancel</v-btn>\n' +
          '    </v-stepper-content>\n' +
          '\n' +
          '    <v-stepper-step :complete="e6 > 3" step="3">Select an ad format and name ad unit</v-stepper-step>\n' +
          '\n' +
          '    <v-stepper-content step="3">\n' +
          '      <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card>\n' +
          '      <v-btn color="primary" @click="e6 = 4">Continue</v-btn>\n' +
          '      <v-btn text>Cancel</v-btn>\n' +
          '    </v-stepper-content>\n' +
          '\n' +
          '    <v-stepper-step step="4">View setup instructions</v-stepper-step>\n' +
          '    <v-stepper-content step="4">\n' +
          '      <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card>\n' +
          '      <v-btn color="primary" @click="e6 = 1">Continue</v-btn>\n' +
          '      <v-btn text>Cancel</v-btn>\n' +
          '    </v-stepper-content>\n' +
          '  </v-stepper>\n' +
          '</template>'
      }
    }
  }
</script>
