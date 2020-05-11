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
          '      type: \'month\',\n' +
          '      types: [\'month\', \'week\', \'day\', \'4day\'],\n' +
          '      mode: \'stack\',\n' +
          '      modes: [\'stack\', \'column\'],\n' +
          '      weekday: [0, 1, 2, 3, 4, 5, 6],\n' +
          '      weekdays: [\n' +
          '        { text: \'Sun - Sat\', value: [0, 1, 2, 3, 4, 5, 6] },\n' +
          '        { text: \'Mon - Sun\', value: [1, 2, 3, 4, 5, 6, 0] },\n' +
          '        { text: \'Mon - Fri\', value: [1, 2, 3, 4, 5] },\n' +
          '        { text: \'Mon, Wed, Fri\', value: [1, 3, 5] },\n' +
          '      ],\n' +
          '      value: \'\',\n' +
          '      events: [],\n' +
          '      colors: [\'blue\', \'indigo\', \'deep-purple\', \'cyan\', \'green\', \'orange\', \'grey darken-1\'],\n' +
          '      names: [\'Meeting\', \'Holiday\', \'PTO\', \'Travel\', \'Event\', \'Birthday\', \'Conference\', \'Party\'],\n' +
          '    }),\n' +
          '    methods: {\n' +
          '      getEvents ({ start, end }) {\n' +
          '        const events = []\n' +
          '\n' +
          '        const min = new Date(`${start.date}T00:00:00`)\n' +
          '        const max = new Date(`${end.date}T23:59:59`)\n' +
          '        const days = (max.getTime() - min.getTime()) / 86400000\n' +
          '        const eventCount = this.rnd(days, days + 20)\n' +
          '\n' +
          '        for (let i = 0; i < eventCount; i++) {\n' +
          '          const allDay = this.rnd(0, 3) === 0\n' +
          '          const firstTimestamp = this.rnd(min.getTime(), max.getTime())\n' +
          '          const first = new Date(firstTimestamp - (firstTimestamp % 900000))\n' +
          '          const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000\n' +
          '          const second = new Date(first.getTime() + secondTimestamp)\n' +
          '\n' +
          '          events.push({\n' +
          '            name: this.names[this.rnd(0, this.names.length - 1)],\n' +
          '            start: this.formatDate(first, !allDay),\n' +
          '            end: this.formatDate(second, !allDay),\n' +
          '            color: this.colors[this.rnd(0, this.colors.length - 1)],\n' +
          '          })\n' +
          '        }\n' +
          '\n' +
          '        this.events = events\n' +
          '      },\n' +
          '      getEventColor (event) {\n' +
          '        return event.color\n' +
          '      },\n' +
          '      rnd (a, b) {\n' +
          '        return Math.floor((b - a + 1) * Math.random()) + a\n' +
          '      },\n' +
          '      formatDate (a, withTime) {\n' +
          '        return withTime\n' +
          '          ? `${a.getFullYear()}-${a.getMonth() + 1}-${a.getDate()} ${a.getHours()}:${a.getMinutes()}`\n' +
          '          : `${a.getFullYear()}-${a.getMonth() + 1}-${a.getDate()}`\n' +
          '      },\n' +
          '    },\n' +
          '  }\n' +
          '<\/script>'
      }
    }
  }
</script>
