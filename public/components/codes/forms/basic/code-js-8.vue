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
          '  import { required, email, max } from \'vee-validate/dist/rules\'\n' +
          '  import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from \'vee-validate\'\n' +
          '\n' +
          '  setInteractionMode(\'eager\')\n' +
          '\n' +
          '  extend(\'required\', {\n' +
          '    ...required,\n' +
          '    message: \'{_field_} can not be empty\',\n' +
          '  })\n' +
          '\n' +
          '  extend(\'max\', {\n' +
          '    ...max,\n' +
          '    message: \'{_field_} may not be greater than {length} characters\',\n' +
          '  })\n' +
          '\n' +
          '  extend(\'email\', {\n' +
          '    ...email,\n' +
          '    message: \'Email must be valid\',\n' +
          '  })\n' +
          '\n' +
          '  export default {\n' +
          '    components: {\n' +
          '      ValidationProvider,\n' +
          '      ValidationObserver,\n' +
          '    },\n' +
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
          '      checkbox: null,\n' +
          '    }),\n' +
          '\n' +
          '    methods: {\n' +
          '      submit () {\n' +
          '        this.$refs.observer.validate()\n' +
          '      },\n' +
          '      clear () {\n' +
          '        this.name = \'\'\n' +
          '        this.email = \'\'\n' +
          '        this.select = null\n' +
          '        this.checkbox = null\n' +
          '        this.$refs.observer.reset()\n' +
          '      },\n' +
          '    },\n' +
          '  }\n' +
          '<\/script>'
      }
    }
  }
</script>
