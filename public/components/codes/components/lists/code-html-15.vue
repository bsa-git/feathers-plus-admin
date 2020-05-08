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
          '    width="300"\n' +
          '  >\n' +
          '    <v-list>\n' +
          '      <v-list-item>\n' +
          '        <v-list-item-icon>\n' +
          '          <v-icon>mdi-home</v-icon>\n' +
          '        </v-list-item-icon>\n' +
          '\n' +
          '        <v-list-item-title>Home</v-list-item-title>\n' +
          '      </v-list-item>\n' +
          '\n' +
          '      <v-list-group\n' +
          '        prepend-icon="account_circle"\n' +
          '        value="true"\n' +
          '      >\n' +
          '        <template v-slot:activator>\n' +
          '          <v-list-item-title>Users</v-list-item-title>\n' +
          '        </template>\n' +
          '\n' +
          '        <v-list-group\n' +
          '          no-action\n' +
          '          sub-group\n' +
          '          value="true"\n' +
          '        >\n' +
          '          <template v-slot:activator>\n' +
          '            <v-list-item-content>\n' +
          '              <v-list-item-title>Admin</v-list-item-title>\n' +
          '            </v-list-item-content>\n' +
          '          </template>\n' +
          '\n' +
          '          <v-list-item\n' +
          '            v-for="(admin, i) in admins"\n' +
          '            :key="i"\n' +
          '            link\n' +
          '          >\n' +
          '            <v-list-item-title v-text="admin[0]"></v-list-item-title>\n' +
          '            <v-list-item-icon>\n' +
          '              <v-icon v-text="admin[1]"></v-icon>\n' +
          '            </v-list-item-icon>\n' +
          '          </v-list-item>\n' +
          '        </v-list-group>\n' +
          '\n' +
          '        <v-list-group\n' +
          '          sub-group\n' +
          '          no-action\n' +
          '        >\n' +
          '          <template v-slot:activator>\n' +
          '            <v-list-item-content>\n' +
          '              <v-list-item-title>Actions</v-list-item-title>\n' +
          '            </v-list-item-content>\n' +
          '          </template>\n' +
          '          <v-list-item\n' +
          '            v-for="(crud, i) in cruds"\n' +
          '            :key="i"\n' +
          '            @click=""\n' +
          '          >\n' +
          '            <v-list-item-title v-text="crud[0]"></v-list-item-title>\n' +
          '            <v-list-item-action>\n' +
          '              <v-icon v-text="crud[1]"></v-icon>\n' +
          '            </v-list-item-action>\n' +
          '          </v-list-item>\n' +
          '        </v-list-group>\n' +
          '      </v-list-group>\n' +
          '    </v-list>\n' +
          '  </v-card>\n' +
          '</template>'
      }
    }
  }
</script>
