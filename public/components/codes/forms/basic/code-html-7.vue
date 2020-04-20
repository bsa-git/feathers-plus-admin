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
          '  <ValidationObserver ref="observer" v-slot="{ validate, reset }">\n' +
          '    <form>\n' +
          '      <ValidationProvider v-slot="{ errors }" name="Name" rules="required|max:10">\n' +
          '        <v-text-field\n' +
          '          v-model="name"\n' +
          '          :counter="10"\n' +
          '          :error-messages="errors"\n' +
          '          label="Name"\n' +
          '          required\n' +
          '        ></v-text-field>\n' +
          '      </ValidationProvider>\n' +
          '      <ValidationProvider v-slot="{ errors }" name="email" rules="required|email">\n' +
          '        <v-text-field\n' +
          '          v-model="email"\n' +
          '          :error-messages="errors"\n' +
          '          label="E-mail"\n' +
          '          required\n' +
          '        ></v-text-field>\n' +
          '      </ValidationProvider>\n' +
          '      <ValidationProvider v-slot="{ errors }" name="select" rules="required">\n' +
          '        <v-select\n' +
          '          v-model="select"\n' +
          '          :items="items"\n' +
          '          :error-messages="errors"\n' +
          '          label="Select"\n' +
          '          data-vv-name="select"\n' +
          '          required\n' +
          '        ></v-select>\n' +
          '      </ValidationProvider>\n' +
          '      <ValidationProvider v-slot="{ errors, valid }" rules="required" name="checkbox">\n' +
          '        <v-checkbox\n' +
          '          v-model="checkbox"\n' +
          '          :error-messages="errors"\n' +
          '          value="1"\n' +
          '          label="Option"\n' +
          '          type="checkbox"\n' +
          '          required\n' +
          '        ></v-checkbox>\n' +
          '      </ValidationProvider>\n' +
          '\n' +
          '      <v-btn class="mr-4" @click="submit">submit</v-btn>\n' +
          '      <v-btn @click="clear">clear</v-btn>\n' +
          '    </form>\n' +
          '  </ValidationObserver>\n' +
          '</template>'
      }
    }
  }
</script>
