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
          '  <v-card\n' +
          '    class="mx-auto"\n' +
          '    style="max-width: 500px;"\n' +
          '  >\n' +
          '    <v-system-bar\n' +
          '      color="deep-purple darken-4"\n' +
          '      dark\n' +
          '    >\n' +
          '      <v-spacer></v-spacer>\n' +
          '      <v-icon small>mdi-square</v-icon>\n' +
          '      <v-icon\n' +
          '        class="ml-1"\n' +
          '        small\n' +
          '      >mdi-circle</v-icon>\n' +
          '      <v-icon\n' +
          '        class="ml-1"\n' +
          '        small\n' +
          '      >mdi-triangle</v-icon>\n' +
          '    </v-system-bar>\n' +
          '    <v-toolbar\n' +
          '      color="deep-purple accent-4"\n' +
          '      cards\n' +
          '      dark\n' +
          '      flat\n' +
          '    >\n' +
          '      <v-btn icon>\n' +
          '        <v-icon>mdi-arrow-left</v-icon>\n' +
          '      </v-btn>\n' +
          '      <v-card-title class="title font-weight-regular">Sign up</v-card-title>\n' +
          '      <v-spacer></v-spacer>\n' +
          '      <v-btn icon>\n' +
          '        <v-icon>mdi-magnify</v-icon>\n' +
          '      </v-btn>\n' +
          '      <v-btn icon>\n' +
          '        <v-icon>mdi-dots-vertical</v-icon>\n' +
          '      </v-btn>\n' +
          '    </v-toolbar>\n' +
          '    <v-form\n' +
          '      ref="form"\n' +
          '      v-model="form"\n' +
          '      class="pa-4 pt-6"\n' +
          '    >\n' +
          '      <v-text-field\n' +
          '        v-model="password"\n' +
          '        :rules="[rules.password, rules.length(6)]"\n' +
          '        filled\n' +
          '        color="deep-purple"\n' +
          '        counter="6"\n' +
          '        label="Password"\n' +
          '        style="min-height: 96px"\n' +
          '        type="password"\n' +
          '      ></v-text-field>\n' +
          '      <v-text-field\n' +
          '        v-model="phone"\n' +
          '        filled\n' +
          '        color="deep-purple"\n' +
          '        label="Phone number"\n' +
          '      ></v-text-field>\n' +
          '      <v-text-field\n' +
          '        v-model="email"\n' +
          '        :rules="[rules.email]"\n' +
          '        filled\n' +
          '        color="deep-purple"\n' +
          '        label="Email address"\n' +
          '        type="email"\n' +
          '      ></v-text-field>\n' +
          '      <v-textarea\n' +
          '        v-model="bio"\n' +
          '        auto-grow\n' +
          '        filled\n' +
          '        color="deep-purple"\n' +
          '        label="Bio"\n' +
          '        rows="1"\n' +
          '      ></v-textarea>\n' +
          '      <v-checkbox\n' +
          '        v-model="agreement"\n' +
          '        :rules="[rules.required]"\n' +
          '        color="deep-purple"\n' +
          '      >\n' +
          '        <template v-slot:label>\n' +
          '          I agree to the&nbsp;\n' +
          '          <a href="#" @click.stop.prevent="dialog = true">Terms of Service</a>\n' +
          '          &nbsp;and&nbsp;\n' +
          '          <a href="#" @click.stop.prevent="dialog = true">Privacy Policy</a>*\n' +
          '        </template>\n' +
          '      </v-checkbox>\n' +
          '    </v-form>\n' +
          '    <v-divider></v-divider>\n' +
          '    <v-card-actions>\n' +
          '      <v-btn\n' +
          '        text\n' +
          '        @click="$refs.form.reset()"\n' +
          '      >\n' +
          '        Clear\n' +
          '      </v-btn>\n' +
          '      <v-spacer></v-spacer>\n' +
          '      <v-btn\n' +
          '        :disabled="!form"\n' +
          '        :loading="isLoading"\n' +
          '        class="white--text"\n' +
          '        color="deep-purple accent-4"\n' +
          '        depressed\n' +
          '      >Submit</v-btn>\n' +
          '    </v-card-actions>\n' +
          '    <v-dialog\n' +
          '      v-model="dialog"\n' +
          '      absolute\n' +
          '      max-width="400"\n' +
          '      persistent\n' +
          '    >\n' +
          '      <v-card>\n' +
          '        <v-card-title class="headline grey lighten-3">Legal</v-card-title>\n' +
          '        <v-card-text>\n' +
          '          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n' +
          '        </v-card-text>\n' +
          '        <v-divider></v-divider>\n' +
          '        <v-card-actions>\n' +
          '          <v-btn\n' +
          '            text\n' +
          '            @click="agreement = false, dialog = false"\n' +
          '          >\n' +
          '            No\n' +
          '          </v-btn>\n' +
          '          <v-spacer></v-spacer>\n' +
          '          <v-btn\n' +
          '            class="white--text"\n' +
          '            color="deep-purple accent-4"\n' +
          '            @click="agreement = true, dialog = false"\n' +
          '          >\n' +
          '            Yes\n' +
          '          </v-btn>\n' +
          '        </v-card-actions>\n' +
          '      </v-card>\n' +
          '    </v-dialog>\n' +
          '  </v-card>\n' +
          '</template>'
      }
    }
  }
</script>
