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
          '  const COLORS = [\n' +
          '    \'info\',\n' +
          '    \'warning\',\n' +
          '    \'error\',\n' +
          '    \'success\',\n' +
          '  ]\n' +
          '  const ICONS = {\n' +
          '    info: \'mdi-information\',\n' +
          '    warning: \'mdi-alert\',\n' +
          '    error: \'mdi-alert-circle\',\n' +
          '    success: \'mdi-check-circle\',\n' +
          '  }\n' +
          '\n' +
          '  export default {\n' +
          '    data: () => ({\n' +
          '      interval: null,\n' +
          '      items: [\n' +
          '        {\n' +
          '          id: 1,\n' +
          '          color: \'info\',\n' +
          '          icon: ICONS[\'info\'],\n' +
          '        },\n' +
          '      ],\n' +
          '      nonce: 2,\n' +
          '    }),\n' +
          '\n' +
          '    beforeDestroy () {\n' +
          '      this.stop()\n' +
          '    },\n' +
          '\n' +
          '    methods: {\n' +
          '      addEvent () {\n' +
          '        let { color, icon } = this.genAlert()\n' +
          '\n' +
          '        const previousColor = this.items[0].color\n' +
          '\n' +
          '        while (previousColor === color) {\n' +
          '          color = this.genColor()\n' +
          '        }\n' +
          '\n' +
          '        this.items.unshift({\n' +
          '          id: this.nonce++,\n' +
          '          color,\n' +
          '          icon,\n' +
          '        })\n' +
          '\n' +
          '        if (this.nonce > 6) {\n' +
          '          this.items.pop()\n' +
          '        }\n' +
          '      },\n' +
          '      genAlert () {\n' +
          '        const color = this.genColor()\n' +
          '\n' +
          '        return {\n' +
          '          color,\n' +
          '          icon: this.genIcon(color),\n' +
          '        }\n' +
          '      },\n' +
          '      genColor () {\n' +
          '        return COLORS[Math.floor(Math.random() * 3)]\n' +
          '      },\n' +
          '      genIcon (color) {\n' +
          '        return ICONS[color]\n' +
          '      },\n' +
          '      start () {\n' +
          '        this.interval = setInterval(this.addEvent, 3000)\n' +
          '      },\n' +
          '      stop () {\n' +
          '        clearInterval(this.interval)\n' +
          '        this.interval = null\n' +
          '      },\n' +
          '    },\n' +
          '  }\n' +
          '<\/script>'
      }
    }
  }
</script>
