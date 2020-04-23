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
          '      agreement: false,\n' +
          '      bio: \'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts\',\n' +
          '      dialog: false,\n' +
          '      email: undefined,\n' +
          '      form: false,\n' +
          '      isLoading: false,\n' +
          '      password: undefined,\n' +
          '      phone: undefined,\n' +
          '      rules: {\n' +
          '        email: v => (v || \'\').match(/@/) || \'Please enter a valid email\',\n' +
          '        length: len => v => (v || \'\').length >= len || `Invalid character length, required ${len}`,\n' +
          '        password: v => (v || \'\').match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*(_|[^\\w])).+$/) ||\n' +
          '          \'Password must contain an upper case letter, a numeric character, and a special character\',\n' +
          '        required: v => !!v || \'This field is required\',\n' +
          '      },\n' +
          '    }),\n' +
          '  }\n' +
          '<\/script>'
      }
    }
  }
</script>
