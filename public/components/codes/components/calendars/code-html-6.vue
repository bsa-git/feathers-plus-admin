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
          '  <v-row>\n' +
          '    <v-col>\n' +
          '      <v-sheet height="400">\n' +
          '        <v-calendar\n' +
          '          color="primary"\n' +
          '          type="day"\n' +
          '        >\n' +
          '          <template v-slot:day-header="{ present }">\n' +
          '            <template\n' +
          '              v-if="present"\n' +
          '              class="text-center"\n' +
          '            >\n' +
          '              Today\n' +
          '            </template>\n' +
          '          </template>\n' +
          '\n' +
          '          <template v-slot:interval="{ hour }">\n' +
          '            <div\n' +
          '              class="text-center"\n' +
          '            >\n' +
          '              {{ hour }} o\'clock\n' +
          '            </div>\n' +
          '          </template>\n' +
          '        </v-calendar>\n' +
          '      </v-sheet>\n' +
          '    </v-col>\n' +
          '  </v-row>\n' +
          '</template>'
      }
    }
  }
</script>
