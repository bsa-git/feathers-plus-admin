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
          '    <v-card class="mb-4">\n' +
          '      <v-card-text>\n' +
          '        <v-select\n' +
          '          v-model="steps"\n' +
          '          :items="[2, 3, 4, 5, 6]"\n' +
          '          label="# of steps"\n' +
          '        ></v-select>\n' +
          '      </v-card-text>\n' +
          '    </v-card>\n' +
          '    <v-stepper v-model="e1">\n' +
          '      <v-stepper-header>\n' +
          '        <template v-for="n in steps">\n' +
          '          <v-stepper-step\n' +
          '            :key="`${n}-step`"\n' +
          '            :complete="e1 > n"\n' +
          '            :step="n"\n' +
          '            editable\n' +
          '          >\n' +
          '            Step {{ n }}\n' +
          '          </v-stepper-step>\n' +
          '\n' +
          '          <v-divider\n' +
          '            v-if="n !== steps"\n' +
          '            :key="n"\n' +
          '          ></v-divider>\n' +
          '        </template>\n' +
          '      </v-stepper-header>\n' +
          '\n' +
          '      <v-stepper-items>\n' +
          '        <v-stepper-content\n' +
          '          v-for="n in steps"\n' +
          '          :key="`${n}-content`"\n' +
          '          :step="n"\n' +
          '        >\n' +
          '          <v-card\n' +
          '            class="mb-12"\n' +
          '            color="grey lighten-1"\n' +
          '            height="200px"\n' +
          '          ></v-card>\n' +
          '\n' +
          '          <v-btn\n' +
          '            color="primary"\n' +
          '            @click="nextStep(n)"\n' +
          '          >\n' +
          '            Continue\n' +
          '          </v-btn>\n' +
          '\n' +
          '          <v-btn text>Cancel</v-btn>\n' +
          '        </v-stepper-content>\n' +
          '      </v-stepper-items>\n' +
          '    </v-stepper>\n' +
          '  </div>\n' +
          '</template>'
      }
    }
  }
</script>
