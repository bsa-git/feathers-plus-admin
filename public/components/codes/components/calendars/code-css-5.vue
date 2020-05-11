<template>
  <div>
    {{ code }}
  </div>
</template>

<script>
  export default {
    data() {
      return {
        code: '<style scoped>\n' +
          '.my-event {\n' +
          '  overflow: hidden;\n' +
          '  text-overflow: ellipsis;\n' +
          '  white-space: nowrap;\n' +
          '  border-radius: 2px;\n' +
          '  background-color: #1867c0;\n' +
          '  color: #ffffff;\n' +
          '  border: 1px solid #1867c0;\n' +
          '  font-size: 12px;\n' +
          '  padding: 3px;\n' +
          '  cursor: pointer;\n' +
          '  margin-bottom: 1px;\n' +
          '  left: 4px;\n' +
          '  margin-right: 8px;\n' +
          '  position: relative;\n' +
          '}\n' +
          '\n' +
          '.my-event.with-time {\n' +
          '  position: absolute;\n' +
          '  right: 4px;\n' +
          '  margin-right: 0px;\n' +
          '}\n' +
          '</style>'
      }
    }
  }
</script>
