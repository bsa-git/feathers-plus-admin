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
          '    <v-stepper alt-labels>\n' +
          '      <v-stepper-header>\n' +
          '        <v-stepper-step step="1">Ad unit details</v-stepper-step>\n' +
          '\n' +
          '        <v-divider></v-divider>\n' +
          '\n' +
          '        <v-stepper-step step="2">Ad sizes</v-stepper-step>\n' +
          '\n' +
          '        <v-divider></v-divider>\n' +
          '\n' +
          '        <v-stepper-step step="3">Ad templates</v-stepper-step>\n' +
          '      </v-stepper-header>\n' +
          '    </v-stepper>\n' +
          '\n' +
          '    <v-stepper alt-labels class="mt-12">\n' +
          '      <v-stepper-header>\n' +
          '\n' +
          '        <v-stepper-step step="1">Ad unit details</v-stepper-step>\n' +
          '\n' +
          '        <v-divider></v-divider>\n' +
          '\n' +
          '        <v-stepper-step step="2">\n' +
          '          Ad sizes\n' +
          '          <small>Optional</small>\n' +
          '        </v-stepper-step>\n' +
          '\n' +
          '        <v-divider></v-divider>\n' +
          '\n' +
          '        <v-stepper-step step="3">Ad templates</v-stepper-step>\n' +
          '      </v-stepper-header>\n' +
          '    </v-stepper>\n' +
          '  </div>\n' +
          '</template>'
      }
    }
  }
</script>
