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
          '      <v-stepper-step\n' +
          '        complete\n' +
          '        editable\n' +
          '        step="1"\n' +
          '      >\n' +
          '        Select campaign settings\n' +
          '      </v-stepper-step>\n' +
          '\n' +
          '      <v-divider></v-divider>\n' +
          '\n' +
          '      <v-stepper-step\n' +
          '        complete\n' +
          '        step="2"\n' +
          '      >Create an ad group</v-stepper-step>\n' +
          '\n' +
          '      <v-divider></v-divider>\n' +
          '\n' +
          '      <v-stepper-step\n' +
          '        step="3"\n' +
          '        editable\n' +
          '      >\n' +
          '        Create an ad\n' +
          '      </v-stepper-step>\n' +
          '    </v-stepper-header>\n' +
          '  </v-stepper>\n' +
          '</template>'
      }
    }
  }
</script>
