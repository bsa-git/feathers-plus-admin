<template>
  <div>
    {{ code }}
  </div>
</template>

<script>
  export default {
    data() {
      return {
        code: '<script>\n' +
          '  import { validationMixin } from \'vuelidate\'\n' +
          '  import { required, maxLength, email } from \'vuelidate/lib/validators\'\n' +
          '\n' +
          '  export default {\n' +
          '    mixins: [validationMixin],\n' +
          '\n' +
          '    validations: {\n' +
          '      name: { required, maxLength: maxLength(10) },\n' +
          '      email: { required, email },\n' +
          '      select: { required },\n' +
          '      checkbox: {\n' +
          '        checked (val) {\n' +
          '          return val\n' +
          '        },\n' +
          '      },\n' +
          '    },\n' +
          '\n' +
          '    data: () => ({\n' +
          '      name: \'\',\n' +
          '      email: \'\',\n' +
          '      select: null,\n' +
          '      items: [\n' +
          '        \'Item 1\',\n' +
          '        \'Item 2\',\n' +
          '        \'Item 3\',\n' +
          '        \'Item 4\',\n' +
          '      ],\n' +
          '      checkbox: false,\n' +
          '    }),\n' +
          '\n' +
          '    computed: {\n' +
          '      checkboxErrors () {\n' +
          '        const errors = []\n' +
          '        if (!this.$v.checkbox.$dirty) return errors\n' +
          '        !this.$v.checkbox.checked && errors.push(\'You must agree to continue!\')\n' +
          '        return errors\n' +
          '      },\n' +
          '      selectErrors () {\n' +
          '        const errors = []\n' +
          '        if (!this.$v.select.$dirty) return errors\n' +
          '        !this.$v.select.required && errors.push(\'Item is required\')\n' +
          '        return errors\n' +
          '      },\n' +
          '      nameErrors () {\n' +
          '        const errors = []\n' +
          '        if (!this.$v.name.$dirty) return errors\n' +
          '        !this.$v.name.maxLength && errors.push(\'Name must be at most 10 characters long\')\n' +
          '        !this.$v.name.required && errors.push(\'Name is required.\')\n' +
          '        return errors\n' +
          '      },\n' +
          '      emailErrors () {\n' +
          '        const errors = []\n' +
          '        if (!this.$v.email.$dirty) return errors\n' +
          '        !this.$v.email.email && errors.push(\'Must be valid e-mail\')\n' +
          '        !this.$v.email.required && errors.push(\'E-mail is required\')\n' +
          '        return errors\n' +
          '      },\n' +
          '    },\n' +
          '\n' +
          '    methods: {\n' +
          '      submit () {\n' +
          '        this.$v.$touch()\n' +
          '      },\n' +
          '      clear () {\n' +
          '        this.$v.$reset()\n' +
          '        this.name = \'\'\n' +
          '        this.email = \'\'\n' +
          '        this.select = null\n' +
          '        this.checkbox = false\n' +
          '      },\n' +
          '    },\n' +
          '  }\n' +
          '<\/script>'
      }
    }
  }
</script>
