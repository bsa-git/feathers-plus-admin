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
          '  <div>\n' +
          '    <v-stepper>\n' +
          '      <v-stepper-header>\n' +
          '        <v-stepper-step step="1">Select campaign settings</v-stepper-step>\n' +
          '\n' +
          '        <v-divider></v-divider>\n' +
          '\n' +
          '        <v-stepper-step step="2">Create an ad group</v-stepper-step>\n' +
          '\n' +
          '        <v-divider></v-divider>\n' +
          '\n' +
          '        <v-stepper-step step="3">Create an ad</v-stepper-step>\n' +
          '      </v-stepper-header>\n' +
          '    </v-stepper>\n' +
          '\n' +
          '    <v-stepper value="2" class="mt-12">\n' +
          '      <v-stepper-header>\n' +
          '        <v-stepper-step step="1" complete>Select campaign settings</v-stepper-step>\n' +
          '\n' +
          '        <v-divider></v-divider>\n' +
          '\n' +
          '        <v-stepper-step step="2">Create an ad group</v-stepper-step>\n' +
          '\n' +
          '        <v-divider></v-divider>\n' +
          '\n' +
          '        <v-stepper-step step="3">Create an ad</v-stepper-step>\n' +
          '      </v-stepper-header>\n' +
          '    </v-stepper>\n' +
          '\n' +
          '    <v-stepper value="3" class="mt-12">\n' +
          '      <v-stepper-header>\n' +
          '        <v-stepper-step step="1" complete>Select campaign settings</v-stepper-step>\n' +
          '\n' +
          '        <v-divider></v-divider>\n' +
          '\n' +
          '        <v-stepper-step step="2" complete>Create an ad group</v-stepper-step>\n' +
          '\n' +
          '        <v-divider></v-divider>\n' +
          '\n' +
          '        <v-stepper-step step="3">Create an ad</v-stepper-step>\n' +
          '      </v-stepper-header>\n' +
          '    </v-stepper>\n' +
          '  </div>\n' +
          '</template>'
      }
    }
  }
</script>
