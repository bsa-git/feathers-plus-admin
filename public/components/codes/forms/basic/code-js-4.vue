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
          '  export default {\n' +
          '    data: () => ({\n' +
          '      valid: true,\n' +
          '      name: \'\',\n' +
          '      nameRules: [\n' +
          '        v => !!v || \'Name is required\',\n' +
          '        v => (v && v.length <= 10) || \'Name must be less than 10 characters\',\n' +
          '      ],\n' +
          '      email: \'\',\n' +
          '      emailRules: [\n' +
          '        v => !!v || \'E-mail is required\',\n' +
          '        v => /.+@.+\..+/.test(v) || \'E-mail must be valid\',\n' +
          '      ],\n' +
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
          '    methods: {\n' +
          '      validate () {\n' +
          '        this.$refs.form.validate()\n' +
          '      },\n' +
          '      reset () {\n' +
          '        this.$refs.form.reset()\n' +
          '      },\n' +
          '      resetValidation () {\n' +
          '        this.$refs.form.resetValidation()\n' +
          '      },\n' +
          '    },\n' +
          '  }\n' +
          '<\/script>'
      }
    }
  }
</script>
