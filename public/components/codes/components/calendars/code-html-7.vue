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
          '      <v-sheet height="500">\n' +
          '        <v-calendar\n' +
          '          :now="today"\n' +
          '          :value="today"\n' +
          '          color="primary"\n' +
          '        >\n' +
          '          <template v-slot:day="{ present, past, date }">\n' +
          '            <v-row\n' +
          '              class="fill-height"\n' +
          '            >\n' +
          '              <template v-if="past && tracked[date]">\n' +
          '                <v-sheet\n' +
          '                  v-for="(percent, i) in tracked[date]"\n' +
          '                  :key="i"\n' +
          '                  :title="category[i]"\n' +
          '                  :color="colors[i]"\n' +
          '                  :width="`${percent}%`"\n' +
          '                  height="100%"\n' +
          '                  tile\n' +
          '                ></v-sheet>\n' +
          '              </template>\n' +
          '            </v-row>\n' +
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
