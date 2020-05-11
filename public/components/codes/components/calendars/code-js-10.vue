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
          '      focus: \'\',\n' +
          '      type: \'month\',\n' +
          '      typeToLabel: {\n' +
          '        month: \'Month\',\n' +
          '        week: \'Week\',\n' +
          '        day: \'Day\',\n' +
          '        \'4day\': \'4 Days\',\n' +
          '      },\n' +
          '      start: null,\n' +
          '      end: null,\n' +
          '      selectedEvent: {},\n' +
          '      selectedElement: null,\n' +
          '      selectedOpen: false,\n' +
          '      events: [],\n' +
          '      colors: [\'blue\', \'indigo\', \'deep-purple\', \'cyan\', \'green\', \'orange\', \'grey darken-1\'],\n' +
          '      names: [\'Meeting\', \'Holiday\', \'PTO\', \'Travel\', \'Event\', \'Birthday\', \'Conference\', \'Party\'],\n' +
          '    }),\n' +
          '    computed: {\n' +
          '      title () {\n' +
          '        const { start, end } = this\n' +
          '        if (!start || !end) {\n' +
          '          return \'\'\n' +
          '        }\n' +
          '\n' +
          '        const startMonth = this.monthFormatter(start)\n' +
          '        const endMonth = this.monthFormatter(end)\n' +
          '        const suffixMonth = startMonth === endMonth ? \'\' : endMonth\n' +
          '\n' +
          '        const startYear = start.year\n' +
          '        const endYear = end.year\n' +
          '        const suffixYear = startYear === endYear ? \'\' : endYear\n' +
          '\n' +
          '        const startDay = start.day + this.nth(start.day)\n' +
          '        const endDay = end.day + this.nth(end.day)\n' +
          '\n' +
          '        switch (this.type) {\n' +
          '          case \'month\':\n' +
          '            return `${startMonth} ${startYear}`\n' +
          '          case \'week\':\n' +
          '          case \'4day\':\n' +
          '            return `${startMonth} ${startDay} ${startYear} - ${suffixMonth} ${endDay} ${suffixYear}`\n' +
          '          case \'day\':\n' +
          '            return `${startMonth} ${startDay} ${startYear}`\n' +
          '        }\n' +
          '        return \'\'\n' +
          '      },\n' +
          '      monthFormatter () {\n' +
          '        return this.$refs.calendar.getFormatter({\n' +
          '          timeZone: \'UTC\', month: \'long\',\n' +
          '        })\n' +
          '      },\n' +
          '    },\n' +
          '    mounted () {\n' +
          '      this.$refs.calendar.checkChange()\n' +
          '    },\n' +
          '    methods: {\n' +
          '      viewDay ({ date }) {\n' +
          '        this.focus = date\n' +
          '        this.type = \'day\'\n' +
          '      },\n' +
          '      getEventColor (event) {\n' +
          '        return event.color\n' +
          '      },\n' +
          '      setToday () {\n' +
          '        this.focus = this.today\n' +
          '      },\n' +
          '      prev () {\n' +
          '        this.$refs.calendar.prev()\n' +
          '      },\n' +
          '      next () {\n' +
          '        this.$refs.calendar.next()\n' +
          '      },\n' +
          '      showEvent ({ nativeEvent, event }) {\n' +
          '        const open = () => {\n' +
          '          this.selectedEvent = event\n' +
          '          this.selectedElement = nativeEvent.target\n' +
          '          setTimeout(() => this.selectedOpen = true, 10)\n' +
          '        }\n' +
          '\n' +
          '        if (this.selectedOpen) {\n' +
          '          this.selectedOpen = false\n' +
          '          setTimeout(open, 10)\n' +
          '        } else {\n' +
          '          open()\n' +
          '        }\n' +
          '\n' +
          '        nativeEvent.stopPropagation()\n' +
          '      },\n' +
          '      updateRange ({ start, end }) {\n' +
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
          '        this.start = start\n' +
          '        this.end = end\n' +
          '        this.events = events\n' +
          '      },\n' +
          '      nth (d) {\n' +
          '        return d > 3 && d < 21\n' +
          '          ? \'th\'\n' +
          '          : [\'th\', \'st\', \'nd\', \'rd\', \'th\', \'th\', \'th\', \'th\', \'th\', \'th\'][d % 10]\n' +
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
