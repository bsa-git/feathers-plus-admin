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
          '    <v-stepper non-linear>\n' +
          '      <v-stepper-header>\n' +
          '        <v-stepper-step\n' +
          '          editable\n' +
          '          step="1"\n' +
          '        >\n' +
          '          Select campaign settings\n' +
          '        </v-stepper-step>\n' +
          '\n' +
          '        <v-divider></v-divider>\n' +
          '\n' +
          '        <v-stepper-step\n' +
          '          editable\n' +
          '          step="2"\n' +
          '        >\n' +
          '          Create an ad group\n' +
          '        </v-stepper-step>\n' +
          '\n' +
          '        <v-divider></v-divider>\n' +
          '\n' +
          '        <v-stepper-step\n' +
          '          step="3"\n' +
          '          editable\n' +
          '        >\n' +
          '          Create an ad\n' +
          '        </v-stepper-step>\n' +
          '      </v-stepper-header>\n' +
          '    </v-stepper>\n' +
          '\n' +
          '    <v-stepper\n' +
          '      class="mt-12"\n' +
          '      non-linear\n' +
          '    >\n' +
          '      <v-stepper-header>\n' +
          '        <v-stepper-step\n' +
          '          complete\n' +
          '          editable\n' +
          '          step="1"\n' +
          '        >\n' +
          '          Select campaign settings\n' +
          '        </v-stepper-step>\n' +
          '\n' +
          '        <v-divider></v-divider>\n' +
          '\n' +
          '        <v-stepper-step\n' +
          '          editable\n' +
          '          step="2"\n' +
          '        >\n' +
          '          Create an ad group\n' +
          '        </v-stepper-step>\n' +
          '\n' +
          '        <v-divider></v-divider>\n' +
          '\n' +
          '        <v-stepper-step\n' +
          '          complete\n' +
          '          editable\n' +
          '          step="3"\n' +
          '        >\n' +
          '          Create an ad\n' +
          '        </v-stepper-step>\n' +
          '      </v-stepper-header>\n' +
          '    </v-stepper>\n' +
          '\n' +
          '    <v-stepper\n' +
          '      class="mt-12"\n' +
          '      non-linear\n' +
          '      value="3"\n' +
          '    >\n' +
          '      <v-stepper-header>\n' +
          '        <v-stepper-step\n' +
          '          complete\n' +
          '          editable\n' +
          '          step="1"\n' +
          '        >\n' +
          '          Select campaign settings\n' +
          '        </v-stepper-step>\n' +
          '\n' +
          '        <v-divider></v-divider>\n' +
          '\n' +
          '        <v-stepper-step\n' +
          '          complete\n' +
          '          editable\n' +
          '          step="2"\n' +
          '        >\n' +
          '          Create an ad group\n' +
          '        </v-stepper-step>\n' +
          '\n' +
          '        <v-divider></v-divider>\n' +
          '\n' +
          '        <v-stepper-step\n' +
          '          complete\n' +
          '          editable\n' +
          '          step="3"\n' +
          '        >\n' +
          '          Create an ad\n' +
          '        </v-stepper-step>\n' +
          '      </v-stepper-header>\n' +
          '    </v-stepper>\n' +
          '  </div>\n' +
          '</template>'
      }
    }
  }
</script>
