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
          '  <form>\n' +
          '    <v-text-field\n' +
          '      v-model="name"\n' +
          '      :error-messages="nameErrors"\n' +
          '      :counter="10"\n' +
          '      label="Name"\n' +
          '      required\n' +
          '      @input="$v.name.$touch()"\n' +
          '      @blur="$v.name.$touch()"\n' +
          '    ></v-text-field>\n' +
          '    <v-text-field\n' +
          '      v-model="email"\n' +
          '      :error-messages="emailErrors"\n' +
          '      label="E-mail"\n' +
          '      required\n' +
          '      @input="$v.email.$touch()"\n' +
          '      @blur="$v.email.$touch()"\n' +
          '    ></v-text-field>\n' +
          '    <v-select\n' +
          '      v-model="select"\n' +
          '      :items="items"\n' +
          '      :error-messages="selectErrors"\n' +
          '      label="Item"\n' +
          '      required\n' +
          '      @change="$v.select.$touch()"\n' +
          '      @blur="$v.select.$touch()"\n' +
          '    ></v-select>\n' +
          '    <v-checkbox\n' +
          '      v-model="checkbox"\n' +
          '      :error-messages="checkboxErrors"\n' +
          '      label="Do you agree?"\n' +
          '      required\n' +
          '      @change="$v.checkbox.$touch()"\n' +
          '      @blur="$v.checkbox.$touch()"\n' +
          '    ></v-checkbox>\n' +
          '\n' +
          '    <v-btn class="mr-4" @click="submit">submit</v-btn>\n' +
          '    <v-btn @click="clear">clear</v-btn>\n' +
          '  </form>\n' +
          '</template>'
      }
    }
  }
</script>
