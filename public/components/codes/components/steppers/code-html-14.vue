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
          '  <v-stepper v-model="e13" vertical>\n' +
          '    <v-stepper-step step="1" complete>\n' +
          '      Name of step 1\n' +
          '    </v-stepper-step>\n' +
          '\n' +
          '    <v-stepper-content step="1">\n' +
          '      <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card>\n' +
          '      <v-btn color="primary" @click="e13 = 2">Continue</v-btn>\n' +
          '      <v-btn text>Cancel</v-btn>\n' +
          '    </v-stepper-content>\n' +
          '\n' +
          '    <v-stepper-step step="2" complete>Name of step 2</v-stepper-step>\n' +
          '\n' +
          '    <v-stepper-content step="2">\n' +
          '      <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card>\n' +
          '      <v-btn color="primary" @click="e13 = 3">Continue</v-btn>\n' +
          '      <v-btn text>Cancel</v-btn>\n' +
          '    </v-stepper-content>\n' +
          '\n' +
          '    <v-stepper-step :rules="[() => false]" step="3">\n' +
          '      Ad templates\n' +
          '      <small>Alert message</small>\n' +
          '    </v-stepper-step>\n' +
          '\n' +
          '    <v-stepper-content step="3">\n' +
          '      <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card>\n' +
          '      <v-btn color="primary" @click="e13 = 4">Continue</v-btn>\n' +
          '      <v-btn text>Cancel</v-btn>\n' +
          '    </v-stepper-content>\n' +
          '\n' +
          '    <v-stepper-step step="4">View setup instructions</v-stepper-step>\n' +
          '\n' +
          '    <v-stepper-content step="4">\n' +
          '      <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card>\n' +
          '      <v-btn color="primary" @click="e13 = 1">Continue</v-btn>\n' +
          '      <v-btn text>Cancel</v-btn>\n' +
          '    </v-stepper-content>\n' +
          '  </v-stepper>\n' +
          '</template>'
      }
    }
  }
</script>
