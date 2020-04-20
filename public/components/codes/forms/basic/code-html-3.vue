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
          '  <v-form\n' +
          '    ref="form"\n' +
          '    v-model="valid"\n' +
          '    lazy-validation\n' +
          '  >\n' +
          '    <v-text-field\n' +
          '      v-model="name"\n' +
          '      :counter="10"\n' +
          '      :rules="nameRules"\n' +
          '      label="Name"\n' +
          '      required\n' +
          '    ></v-text-field>\n' +
          '\n' +
          '    <v-text-field\n' +
          '      v-model="email"\n' +
          '      :rules="emailRules"\n' +
          '      label="E-mail"\n' +
          '      required\n' +
          '    ></v-text-field>\n' +
          '\n' +
          '    <v-select\n' +
          '      v-model="select"\n' +
          '      :items="items"\n' +
          '      :rules="[v => !!v || \'Item is required\']"\n' +
          '      label="Item"\n' +
          '      required\n' +
          '    ></v-select>\n' +
          '\n' +
          '    <v-checkbox\n' +
          '      v-model="checkbox"\n' +
          '      :rules="[v => !!v || \'You must agree to continue!\']"\n' +
          '      label="Do you agree?"\n' +
          '      required\n' +
          '    ></v-checkbox>\n' +
          '\n' +
          '    <v-btn\n' +
          '      :disabled="!valid"\n' +
          '      color="success"\n' +
          '      class="mr-4"\n' +
          '      @click="validate"\n' +
          '    >\n' +
          '      Validate\n' +
          '    </v-btn>\n' +
          '\n' +
          '    <v-btn\n' +
          '      color="error"\n' +
          '      class="mr-4"\n' +
          '      @click="reset"\n' +
          '    >\n' +
          '      Reset Form\n' +
          '    </v-btn>\n' +
          '\n' +
          '    <v-btn\n' +
          '      color="warning"\n' +
          '      @click="resetValidation"\n' +
          '    >\n' +
          '      Reset Validation\n' +
          '    </v-btn>\n' +
          '  </v-form>\n' +
          '</template>'
      }
    }
  }
</script>
