<template>
  <v-simple-table
    class="simple-table"
    :fixed-header="fixedHeader"
    :height="height"
    :dense="dense"
    :dark="dark"
  >
    <template v-slot:default>
      <thead>
      <tr>
        <th v-for="(thItem, index) in thead" :key="index" :class="`text-${thItem.align}`">{{ thItem.title }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(trItem, index) in tbody" :key="index">
        <template v-for="tdItem in thead">
          <td :class="`text-${tdItem.align}`" v-if="tdItem.type === 'icon'"><v-icon>{{trItem[tdItem.name]}}</v-icon></td>
          <td :class="`text-${tdItem.align}`" v-if="tdItem.type === 'html'" v-html="trItem[tdItem.name]"></td>
          <td :class="`text-${tdItem.align}`" v-if="tdItem.type === 'text'" v-text="trItem[tdItem.name]"></td>
        </template>
      </tr>
      </tbody>
      <tfoot>
        <tr>
          <template v-for="tdItem in tfoot">
            <td :colspan="tdItem.colspan" :class="`text-${tdItem.align}`" v-if="tdItem.type === 'html'" v-html="tdItem.text"></td>
            <td :colspan="tdItem.colspan" :class="`text-${tdItem.align}`" v-if="tdItem.type === 'text'" v-text="tdItem.name"></td>
          </template>
        </tr>
      </tfoot>
    </template>
  </v-simple-table>
</template>

<script>
  export default {
    props: {
      thead: Array,
      tfoot: Array,
      tbody: Array,
      fixedHeader: {
        type: Boolean,
        default: false
      },
      height: {
        type: String,
        default: '300px'
      },
      dense: {
        type: Boolean,
        default: false
      },
      dark: {
        type: Boolean,
        default: false
      },
    }
  };
</script>

<style scoped lang="sass">
  .simple-table
    border: 1px solid #cccccc
</style>
