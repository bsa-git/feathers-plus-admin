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
          '  <v-stepper v-model="e1">\n' +
          '    <v-stepper-header>\n' +
          '      <v-stepper-step :complete="e1 > 1" step="1">Name of step 1</v-stepper-step>\n' +
          '\n' +
          '      <v-divider></v-divider>\n' +
          '\n' +
          '      <v-stepper-step :complete="e1 > 2" step="2">Name of step 2</v-stepper-step>\n' +
          '\n' +
          '      <v-divider></v-divider>\n' +
          '\n' +
          '      <v-stepper-step step="3">Name of step 3</v-stepper-step>\n' +
          '    </v-stepper-header>\n' +
          '\n' +
          '    <v-stepper-items>\n' +
          '      <v-stepper-content step="1">\n' +
          '        <v-card\n' +
          '          class="mb-12"\n' +
          '          color="grey lighten-1"\n' +
          '          height="200px"\n' +
          '        ></v-card>\n' +
          '\n' +
          '        <v-btn\n' +
          '          color="primary"\n' +
          '          @click="e1 = 2"\n' +
          '        >\n' +
          '          Continue\n' +
          '        </v-btn>\n' +
          '\n' +
          '        <v-btn text>Cancel</v-btn>\n' +
          '      </v-stepper-content>\n' +
          '\n' +
          '      <v-stepper-content step="2">\n' +
          '        <v-card\n' +
          '          class="mb-12"\n' +
          '          color="grey lighten-1"\n' +
          '          height="200px"\n' +
          '        ></v-card>\n' +
          '\n' +
          '        <v-btn\n' +
          '          color="primary"\n' +
          '          @click="e1 = 3"\n' +
          '        >\n' +
          '          Continue\n' +
          '        </v-btn>\n' +
          '\n' +
          '        <v-btn text>Cancel</v-btn>\n' +
          '      </v-stepper-content>\n' +
          '\n' +
          '      <v-stepper-content step="3">\n' +
          '        <v-card\n' +
          '          class="mb-12"\n' +
          '          color="grey lighten-1"\n' +
          '          height="200px"\n' +
          '        ></v-card>\n' +
          '\n' +
          '        <v-btn\n' +
          '          color="primary"\n' +
          '          @click="e1 = 1"\n' +
          '        >\n' +
          '          Continue\n' +
          '        </v-btn>\n' +
          '\n' +
          '        <v-btn text>Cancel</v-btn>\n' +
          '      </v-stepper-content>\n' +
          '    </v-stepper-items>\n' +
          '  </v-stepper>\n' +
          '</template>'
      }
    }
  }
</script>
